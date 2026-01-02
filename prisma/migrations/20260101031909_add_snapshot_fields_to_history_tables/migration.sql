-- DropForeignKey
ALTER TABLE "sensor_history" DROP CONSTRAINT "sensor_history_device_id_fkey";

-- DropForeignKey
ALTER TABLE "sensor_history" DROP CONSTRAINT "sensor_history_sensor_id_fkey";

-- DropForeignKey
ALTER TABLE "sensor_history" DROP CONSTRAINT "sensor_history_truck_id_fkey";

-- AlterTable
ALTER TABLE "alert_events" ADD COLUMN     "alert_code" VARCHAR(50),
ADD COLUMN     "alert_name" VARCHAR(255),
ADD COLUMN     "alert_severity" VARCHAR(20),
ADD COLUMN     "device_sn" VARCHAR(50),
ADD COLUMN     "driver_name" VARCHAR(255),
ADD COLUMN     "sensor_sn" VARCHAR(50),
ADD COLUMN     "sensor_tire_no" INTEGER,
ADD COLUMN     "truck_name" VARCHAR(255),
ADD COLUMN     "truck_plate" VARCHAR(50),
ADD COLUMN     "truck_vin" VARCHAR(50),
ADD COLUMN     "vendor_name" VARCHAR(255);

-- AlterTable
ALTER TABLE "sensor_history" ADD COLUMN     "device_bat1" SMALLINT,
ADD COLUMN     "device_bat2" SMALLINT,
ADD COLUMN     "device_bat3" SMALLINT,
ADD COLUMN     "device_sim_number" VARCHAR(50),
ADD COLUMN     "device_sn" VARCHAR(50),
ADD COLUMN     "device_status" VARCHAR(50),
ADD COLUMN     "driver_id" INTEGER,
ADD COLUMN     "driver_license" VARCHAR(50),
ADD COLUMN     "driver_name" VARCHAR(255),
ADD COLUMN     "driver_phone" VARCHAR(50),
ADD COLUMN     "sensor_sn" VARCHAR(50),
ADD COLUMN     "sensor_status" VARCHAR(20),
ADD COLUMN     "truck_model" VARCHAR(255),
ADD COLUMN     "truck_name" VARCHAR(255),
ADD COLUMN     "truck_plate" VARCHAR(50),
ADD COLUMN     "truck_status" VARCHAR(50),
ADD COLUMN     "truck_type" VARCHAR(100),
ADD COLUMN     "truck_vin" VARCHAR(50),
ADD COLUMN     "truck_year" INTEGER,
ADD COLUMN     "vendor_contact" VARCHAR(255),
ADD COLUMN     "vendor_id" INTEGER,
ADD COLUMN     "vendor_name" VARCHAR(255),
ALTER COLUMN "sensor_id" DROP NOT NULL,
ALTER COLUMN "device_id" DROP NOT NULL,
ALTER COLUMN "truck_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "idx_alert_events_truck_plate" ON "alert_events"("truck_plate");

-- CreateIndex
CREATE INDEX "idx_alert_events_created_at" ON "alert_events"("created_at");

-- CreateIndex
CREATE INDEX "idx_sensor_history_truck_plate" ON "sensor_history"("truck_plate");

-- CreateIndex
CREATE INDEX "idx_sensor_history_truck_vin" ON "sensor_history"("truck_vin");

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
