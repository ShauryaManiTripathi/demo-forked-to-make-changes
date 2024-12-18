-- CreateTable
CREATE TABLE "Dispensary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Dispensary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispensary_name_key" ON "Dispensary"("name");

-- AddForeignKey
ALTER TABLE "Dispensary" ADD CONSTRAINT "Dispensary_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
