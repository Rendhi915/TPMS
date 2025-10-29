/*
  Warnings:

  - You are about to drop the column `altitude` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `altitude` on the `location_history` table. All the data in the column will be lost.
  - You are about to drop the column `tiprValue` on the `sensor_data` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_location_created_at";

-- AlterTable
ALTER TABLE "location" DROP COLUMN "altitude",
ADD COLUMN     "recorded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "location_history" DROP COLUMN "altitude";

-- AlterTable
ALTER TABLE "sensor_data" DROP COLUMN "tiprValue",
ADD COLUMN     "tirepValue" REAL;

-- CreateIndex
CREATE INDEX "idx_location_recorded_at" ON "location"("recorded_at");
