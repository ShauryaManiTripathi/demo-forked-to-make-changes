"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const beneficiarySignUpSchema = zod_1.default.object({
    name: zod_1.default.string(),
    aadharNumber: zod_1.default.string(),
    email: zod_1.default.string(),
    phoneNumber: zod_1.default.string(),
    password: zod_1.default.string(),
    bankAccountNumber: zod_1.default.string(),
    holderName: zod_1.default.string(),
    branchName: zod_1.default.string(),
    IFSCCode: zod_1.default.string(),
});
const beneficiaryLoginSchema = zod_1.default.object({
    name: zod_1.default.string(),
    aadharNumber: zod_1.default.string(),
    password: zod_1.default.string(),
});
const prescriptionSchema = zod_1.default.object({
    prescriptionImage: zod_1.default.string().url(),
    medicinesIssued: zod_1.default.array(zod_1.default.object({
        medicineName: zod_1.default.string().min(1),
        quantity: zod_1.default.number().positive(),
        period: zod_1.default.string().min(1),
    })),
});
const reimburseMedicines = zod_1.default.object({
    medicineName: zod_1.default.string(),
    quantity: zod_1.default.number(),
    amount: zod_1.default.number(),
});
const reimburseBillSchema = zod_1.default.object({
    billNumber: zod_1.default.number(),
    billImage: zod_1.default.string(),
    prescriptionId: zod_1.default.string(),
    medicine: zod_1.default.array(reimburseMedicines),
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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(8080);
const prisma = new client_1.PrismaClient();
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, "secretkey", (err, user) => {
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
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = beneficiarySignUpSchema.parse(req.body);
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        try {
            const user = yield prisma.beneficiary.create({
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create beneficiary",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid data format",
        });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = beneficiaryLoginSchema.parse(req.body);
        try {
            const user = yield prisma.beneficiary.findUniqueOrThrow({
                where: {
                    aadharNumber: body.aadharNumber,
                    name: body.name,
                },
            });
            const isPasswordCorrect = yield bcrypt_1.default.compare(body.password, user.password);
            if (!isPasswordCorrect) {
                res.status(401).json({
                    message: "Authentication failed",
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "secretkey");
            res.status(200).json({
                token: token,
            });
        }
        catch (error) {
            console.error(error);
            res.status(401).json({
                message: "Authentication failed",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid format",
        });
    }
}));
app.post("/reimburse-bill", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = reimburseBillSchema.parse(req.body);
        const beneficiaryId = req.user;
        try {
            if (beneficiaryId) {
                const reimburseBill = yield prisma.reimburseBill.create({
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
            }
            else {
                res.status(400).json({
                    message: "beneficiaryId is missing",
                });
                return;
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).json({
                message: "reimburse bill creation failed",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid format",
        });
    }
}));
app.get("/prescription", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beneficiaryId = req.user;
        if (beneficiaryId) {
            const prescriptions = yield prisma.prescription.findMany({
                where: {
                    beneficiaryId: beneficiaryId.id,
                },
            });
            res.status(200).json({
                message: "prescriptions fetched successfully",
                prescriptions: prescriptions,
            });
            return;
        }
        else {
            res.status(400).json({
                message: "beneficiaryId is missing",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "prescription fetching failed",
        });
    }
}));
app.post("/add-prescription/:beneficiaryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { beneficiaryId } = req.params;
        const body = prescriptionSchema.parse(req.body);
        try {
            const beneficiary = yield prisma.beneficiary.findUnique({
                where: { id: beneficiaryId },
            });
            if (!beneficiary) {
                res.status(404).json({ message: "Beneficiary not found" });
                return;
            }
            const prescription = yield prisma.prescription.create({
                data: {
                    beneficiaryId: beneficiaryId, // Link the prescription to the beneficiary
                    prescriptionImage: body.prescriptionImage, // Add prescription image
                    // Use createMany to add multiple medicines at once
                    medicinesIssued: {
                        createMany: {
                            data: body.medicinesIssued.map((medicine) => ({
                                medicineName: medicine.medicineName,
                                quantity: medicine.quantity,
                                period: medicine.period,
                            })),
                        },
                    },
                },
            });
            res.status(200).json({
                message: "prescription added successfully",
                prescription: prescription,
            });
        }
        catch (error) {
            res.status(400).json({
                message: "prescription adding failed",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Invalid format",
        });
    }
}));
app.get("/get-prescription/name/:name/aadhar/:aadhar/email/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, aadhar, email } = req.params;
        if (name && aadhar && email) {
            const beneficiaryId = yield prisma.beneficiary.findUnique({
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
            const prescriptions = yield prisma.prescription.findMany({
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
        }
        else {
            res.status(400).json({
                message: "beneficiaryId is missing",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "prescription fetching failed",
        });
    }
}));
app.get("/get-user-details", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const beneficiaryId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userDetails = yield prisma.beneficiary.findFirst({
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
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "An error occurred while fetching user details",
        });
    }
}));
app.get("/reimburse-bill", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beneficiaryId = req.user;
        if (beneficiaryId) {
            const reimburseBills = yield prisma.reimburseBill.findMany({
                where: {
                    beneficiaryId: beneficiaryId.id,
                },
            });
            res.status(200).json({
                message: "reimburse bills fetched successfully",
                reimburseBills: reimburseBills,
            });
        }
        else {
            res.status(400).json({
                message: "beneficiaryId is missing",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "reimbursement bills fetching failed",
        });
    }
}));
app.get("/reimburse-bill/:status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        const reimburseBills = yield prisma.reimburseBill.findMany({
            where: {
                status: "Pending",
            },
        });
        res.status(200).json({
            message: "reimburse bills fetched successfully",
            reimburseBills: reimburseBills,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "reimbursement bills fetching failed",
        });
    }
}));
app.patch("/update/reimburse-bill/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const body = req.body;
        const reimburseBill = yield prisma.reimburseBill.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: "An error occurred while updating the status",
        });
    }
}));
