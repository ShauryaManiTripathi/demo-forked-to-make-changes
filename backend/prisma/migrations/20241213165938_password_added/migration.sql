/*
  Warnings:

  - Added the required column `password` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Beneficiary" ADD COLUMN     "password" TEXT NOT NULL;
