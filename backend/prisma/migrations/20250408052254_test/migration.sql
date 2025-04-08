-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bankAccountNumber" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "IFSCCode" TEXT NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "prescriptionImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,
    "minimumQuantityToMaintain" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authority" (
    "id" TEXT NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuedMedicines" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "IssuedMedicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReimburseBill" (
    "id" TEXT NOT NULL,
    "billNumber" INTEGER NOT NULL,
    "billImage" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "ReimburseBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReimburseMedicine" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "ReimburseMedicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispensary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Dispensary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_aadharNumber_key" ON "Beneficiary"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_medicineName_key" ON "Stock"("medicineName");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_aadharNumber_key" ON "Authority"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Dispensary_name_key" ON "Dispensary"("name");

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Beneficiary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuedMedicines" ADD CONSTRAINT "IssuedMedicines_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReimburseMedicine" ADD CONSTRAINT "ReimburseMedicine_billId_fkey" FOREIGN KEY ("billId") REFERENCES "ReimburseBill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispensary" ADD CONSTRAINT "Dispensary_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
