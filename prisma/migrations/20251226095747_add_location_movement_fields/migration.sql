-- AlterTable
ALTER TABLE "location" ADD COLUMN     "accuracy" REAL,
ADD COLUMN     "altitude" REAL,
ADD COLUMN     "heading" REAL DEFAULT 0,
ADD COLUMN     "speed" REAL DEFAULT 0;

-- CreateIndex
CREATE INDEX "idx_location_speed" ON "location"("speed");
