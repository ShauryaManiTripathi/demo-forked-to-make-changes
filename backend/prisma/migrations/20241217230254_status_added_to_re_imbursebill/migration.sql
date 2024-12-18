/*
  Warnings:

  - Added the required column `status` to the `ReimburseBill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "ReimburseBill" ADD COLUMN     "status" "Status" NOT NULL;
