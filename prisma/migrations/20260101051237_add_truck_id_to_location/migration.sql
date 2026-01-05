-- AlterTable
ALTER TABLE "location" ADD COLUMN     "truck_id" INTEGER;

-- CreateIndex
CREATE INDEX "idx_location_truck_id" ON "location"("truck_id");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
