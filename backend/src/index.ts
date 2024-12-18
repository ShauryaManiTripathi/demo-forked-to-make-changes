import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import zod from "zod";
import jwt, { VerifyErrors } from "jsonwebtoken";
const beneficiarySignUpSchema = zod.object({
  name: zod.string(),
  aadharNumber: zod.string(),
  email: zod.string(),
  phoneNumber: zod.string(),
  password: zod.string(),
  bankAccountNumber: zod.string(),
  holderName: zod.string(),
  branchName: zod.string(),
  IFSCCode: zod.string(),
});

const beneficiaryLoginSchema = zod.object({
  name: zod.string(),
  aadharNumber: zod.string(),
  password: zod.string(),
});

const prescriptionSchema = zod.object({
  prescriptionImage: zod.string().url(),
  medicinesIssued: zod.array(
    zod.object({
      medicineName: zod.string().min(1),
      quantity: zod.number().positive(),
      period: zod.string().min(1),
    })
  ),
});

const reimburseMedicines = zod.object({
  medicineName: zod.string(),
  quantity: zod.number(),
  amount: zod.number(),
});
const reimburseBillSchema = zod.object({
  billNumber: zod.number(),
  billImage: zod.string(),
  prescriptionId: zod.string(),
  medicine: zod.array(reimburseMedicines),
});

// const prescriptionSchema = zod.object({
//   prescriptionImage: zod.string().url(),
//   medicinesIssued: zod.array(
//     zod.object({
//       medicineName: zod.string().min(1),
//       quantity: zod.number().positive(),
//       period: zod.string().min(1),
//     })
//   ),
// });

const app = express();
app.use(express.json());
app.use(cors());
app.listen(8080);

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: { id: string } | undefined;
    }
  }
}

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  jwt.verify(token, "secretkey", (err: VerifyErrors | null, user: any) => {
    if (err) {
      res.status(403).json({
        message: "Invalid token",
      });
      return;
    }
    req.user = user;
    next();
  });
};

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const body = beneficiarySignUpSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
      const user = await prisma.beneficiary.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
          phoneNumber: body.phoneNumber,
          aadharNumber: body.aadharNumber,
          bankAccountNumber: body.bankAccountNumber,
          holderName: body.holderName,
          branchName: body.branchName,
          IFSCCode: body.IFSCCode,
        },
      });
      res.status(201).json({
        message: "Beneficiary created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to create beneficiary",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Invalid data format",
    });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const body = beneficiaryLoginSchema.parse(req.body);

    try {
      const user = await prisma.beneficiary.findUniqueOrThrow({
        where: {
          aadharNumber: body.aadharNumber,
          name: body.name,
        },
      });

      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        user.password
      );

      if (!isPasswordCorrect) {
        res.status(401).json({
          message: "Authentication failed",
        });
        return;
      }

      const token = jwt.sign({ id: user.id }, "secretkey");

      res.status(200).json({
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({
        message: "Authentication failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Invalid format",
    });
  }
});

app.post(
  "/reimburse-bill",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const body = reimburseBillSchema.parse(req.body);
      const beneficiaryId = req.user;

      try {
        if (beneficiaryId) {
          const reimburseBill = await prisma.reimburseBill.create({
            data: {
              beneficiaryId: beneficiaryId.id,
              billImage: body.billImage,
              prescriptionId: body.prescriptionId,
              billNumber: body.billNumber,
              medicine: {
                createMany: {
                  data: body.medicine.map((medicine) => ({
                    medicineName: medicine.medicineName,
                    quantity: medicine.quantity,
                    amount: medicine.amount,
                  })),
                },
              },
            },
          });

          res.status(201).json({
            message: "reimburseBill added successfully",
          });
          return;
        } else {
          res.status(400).json({
            message: "beneficiaryId is missing",
          });

          return;
        }
      } catch (error) {
        console.error(error);
        res.status(400).json({
          message: "reimburse bill creation failed",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Invalid format",
      });
    }
  }
);

app.get(
  "/prescription",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const beneficiaryId = req.user;

      if (beneficiaryId) {
        const prescriptions = await prisma.prescription.findMany({
          where: {
            beneficiaryId: beneficiaryId.id,
          },
        });

        res.status(200).json({
          message: "prescriptions fetched successfully",
          prescriptions: prescriptions,
        });
        return;
      } else {
        res.status(400).json({
          message: "beneficiaryId is missing",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "prescription fetching failed",
      });
    }
  }
);

app.post(
  "/add-prescription/:beneficiaryId",
  async (req: Request, res: Response) => {
    try {
      const { beneficiaryId } = req.params;
      const body = prescriptionSchema.parse(req.body);

      try {
        const beneficiary = await prisma.beneficiary.findUnique({
          where: { id: beneficiaryId },
        });

        if (!beneficiary) {
          res.status(404).json({ message: "Beneficiary not found" });
          return;
        }
        const prescription = await prisma.prescription.create({
          data: {
            beneficiaryId: beneficiaryId, // Link the prescription to the beneficiary
            prescriptionImage: body.prescriptionImage, // Add prescription image
            // Use createMany to add multiple medicines at once
            medicinesIssued: {
              createMany: {
                data: body.medicinesIssued.map(
                  (medicine: {
                    medicineName: string;
                    quantity: number;
                    period: string;
                  }) => ({
                    medicineName: medicine.medicineName,
                    quantity: medicine.quantity,
                    period: medicine.period,
                  })
                ),
              },
            },
          },
        });

        res.status(200).json({
          message: "prescription added successfully",
          prescription: prescription,
        });
      } catch (error) {
        res.status(400).json({
          message: "prescription adding failed",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Invalid format",
      });
    }
  }
);

app.get(
  "/get-prescription/name/:name/aadhar/:aadhar/email/:email",
  async (req: Request, res: Response) => {
    try {
      const { name, aadhar, email } = req.params;

      if (name && aadhar && email) {
        const beneficiaryId = await prisma.beneficiary.findUnique({
          where: {
            name: name,
            aadharNumber: aadhar,
            email: email,
          },
          select: {
            id: true,
          },
        });

        if (!beneficiaryId) {
          res.status(404).json({
            message: "Beneficiary not found",
          });
          return;
        }
        const prescriptions = await prisma.prescription.findMany({
          where: {
            beneficiaryId: beneficiaryId.id,
          },
          select: {
            id: true,
            beneficiaryId: true,
            medicinesIssued: true,
            prescriptionImage: true,
            createdAt: true,
          },
        });
        console.log(prescriptions);
        res.status(200).json({
          message: "prescriptions fetched successfully",
          prescriptions: prescriptions,
        });
        return;
      } else {
        res.status(400).json({
          message: "beneficiaryId is missing",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "prescription fetching failed",
      });
    }
  }
);
app.get(
  "/get-user-details",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const beneficiaryId = req.user?.id;
      const userDetails = await prisma.beneficiary.findFirst({
        where: {
          id: beneficiaryId,
        },
        select: {
          name: true,
          email: true,
          phoneNumber: true,
        },
      });
      res.status(200).json({
        message: "User details fetched successfully",
        userDetails: userDetails,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "An error occurred while fetching user details",
      });
    }
  }
);
app.get(
  "/reimburse-bill",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const beneficiaryId = req.user;

      if (beneficiaryId) {
        const reimburseBills = await prisma.reimburseBill.findMany({
          where: {
            beneficiaryId: beneficiaryId.id,
          },
        });

        res.status(200).json({
          message: "reimburse bills fetched successfully",
          reimburseBills: reimburseBills,
        });
      } else {
        res.status(400).json({
          message: "beneficiaryId is missing",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "reimbursement bills fetching failed",
      });
    }
  }
);

app.get(
  "/reimburse-bill/:status",

  async (req: Request, res: Response) => {
    try {
      const status = req.params.status;

      const reimburseBills = await prisma.reimburseBill.findMany({
        where: {
          status: "Pending",
        },
      });

      res.status(200).json({
        message: "reimburse bills fetched successfully",
        reimburseBills: reimburseBills,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "reimbursement bills fetching failed",
      });
    }
  }
);

app.patch("/update/reimburse-bill/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const reimburseBill = await prisma.reimburseBill.update({
      where: {
        id: id,
      },
      data: {
        status: body.status,
      },
    });

    res.status(200).json({
      message: `Status updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "An error occurred while updating the status",
    });
  }
});
