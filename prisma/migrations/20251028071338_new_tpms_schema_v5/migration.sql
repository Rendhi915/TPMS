/*
  Warnings:

  - You are about to drop the column `created_by` on the `device` table. All the data in the column will be lost.
  - You are about to drop the column `removed_at` on the `device` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `device` table. All the data in the column will be lost.
  - You are about to alter the column `sn` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `sim_number` on the `device` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `address` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `id_card_number` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `sensor` table. All the data in the column will be lost.
  - You are about to drop the column `installed_at` on the `sensor` table. All the data in the column will be lost.
  - You are about to drop the column `position_no` on the `sensor` table. All the data in the column will be lost.
  - You are about to drop the column `removed_at` on the `sensor` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `sensor` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `sensor` table. All the data in the column will be lost.
  - You are about to alter the column `sn` on the `sensor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `code` on the `truck` table. All the data in the column will be lost.
  - You are about to drop the column `fleet_group_id` on the `truck` table. All the data in the column will be lost.
  - You are about to drop the column `tire_config` on the `truck` table. All the data in the column will be lost.
  - You are about to alter the column `vin` on the `truck` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `truck` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `model` on the `truck` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `nama_vendor` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_telepon` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the `alert_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device_status_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device_truck_assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fleet_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gps_position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hub_temperature_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lock_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sensor_data_raw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sensor_processing_queue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tire_pressure_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `truck_status_event` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[plate]` on the table `truck` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tireNo` to the `sensor` table without a default value. This is not possible if the table is not empty.
  - Made the column `sn` on table `sensor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `truck` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name_vendor` to the `vendors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "alert_event" DROP CONSTRAINT "alert_event_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "device" DROP CONSTRAINT "device_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "device_status_event" DROP CONSTRAINT "device_status_event_device_id_fkey";

-- DropForeignKey
ALTER TABLE "device_status_event" DROP CONSTRAINT "device_status_event_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "device_truck_assignment" DROP CONSTRAINT "device_truck_assignment_device_id_fkey";

-- DropForeignKey
ALTER TABLE "device_truck_assignment" DROP CONSTRAINT "device_truck_assignment_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "gps_position" DROP CONSTRAINT "gps_position_device_id_fkey";

-- DropForeignKey
ALTER TABLE "gps_position" DROP CONSTRAINT "gps_position_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "hub_temperature_event" DROP CONSTRAINT "hub_temperature_event_device_id_fkey";

-- DropForeignKey
ALTER TABLE "hub_temperature_event" DROP CONSTRAINT "hub_temperature_event_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "lock_event" DROP CONSTRAINT "lock_event_device_id_fkey";

-- DropForeignKey
ALTER TABLE "lock_event" DROP CONSTRAINT "lock_event_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "sensor_data_raw" DROP CONSTRAINT "sensor_data_raw_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "sensor_processing_queue" DROP CONSTRAINT "sensor_processing_queue_raw_data_id_fkey";

-- DropForeignKey
ALTER TABLE "tire_pressure_event" DROP CONSTRAINT "tire_pressure_event_device_id_fkey";

-- DropForeignKey
ALTER TABLE "tire_pressure_event" DROP CONSTRAINT "tire_pressure_event_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "truck" DROP CONSTRAINT "truck_fleet_group_id_fkey";

-- DropForeignKey
ALTER TABLE "truck_status_event" DROP CONSTRAINT "truck_status_event_truck_id_fkey";

-- DropIndex
DROP INDEX "idx_device_sim_number";

-- DropIndex
DROP INDEX "idx_drivers_deleted_at";

-- DropIndex
DROP INDEX "idx_sensor_position_no";

-- DropIndex
DROP INDEX "idx_truck_code";

-- DropIndex
DROP INDEX "idx_truck_deleted_at";

-- DropIndex
DROP INDEX "idx_truck_fleet_group_id";

-- DropIndex
DROP INDEX "truck_code_key";

-- DropIndex
DROP INDEX "idx_vendors_deleted_at";

-- DropIndex
DROP INDEX "idx_vendors_nama";

-- AlterTable
ALTER TABLE "device" DROP COLUMN "created_by",
DROP COLUMN "removed_at",
DROP COLUMN "updated_by",
ADD COLUMN     "bat1" SMALLINT,
ADD COLUMN     "bat2" SMALLINT,
ADD COLUMN     "bat3" SMALLINT,
ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6),
ADD COLUMN     "lock" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'active',
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "sn" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "sim_number" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "address",
DROP COLUMN "id_card_number";

-- AlterTable
ALTER TABLE "sensor" DROP COLUMN "created_by",
DROP COLUMN "installed_at",
DROP COLUMN "position_no",
DROP COLUMN "removed_at",
DROP COLUMN "type",
DROP COLUMN "updated_by",
ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6),
ADD COLUMN     "sensorNo" INTEGER,
ADD COLUMN     "sensor_lock" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "simNumber" VARCHAR(50),
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'active',
ADD COLUMN     "tireNo" INTEGER NOT NULL,
ALTER COLUMN "sn" SET NOT NULL,
ALTER COLUMN "sn" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "truck" DROP COLUMN "code",
DROP COLUMN "fleet_group_id",
DROP COLUMN "tire_config",
ADD COLUMN     "driver_id" INTEGER,
ADD COLUMN     "image" VARCHAR(255),
ADD COLUMN     "plate" VARCHAR(50),
ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'active',
ADD COLUMN     "type" VARCHAR(100),
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "vin" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "model" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "nama_vendor",
DROP COLUMN "nomor_telepon",
ADD COLUMN     "name_vendor" VARCHAR(255) NOT NULL,
ADD COLUMN     "telephone" VARCHAR(50);

-- DropTable
DROP TABLE "alert_event";

-- DropTable
DROP TABLE "device_status_event";

-- DropTable
DROP TABLE "device_truck_assignment";

-- DropTable
DROP TABLE "fleet_group";

-- DropTable
DROP TABLE "gps_position";

-- DropTable
DROP TABLE "hub_temperature_event";

-- DropTable
DROP TABLE "lock_event";

-- DropTable
DROP TABLE "sensor_data_raw";

-- DropTable
DROP TABLE "sensor_processing_queue";

-- DropTable
DROP TABLE "tire_pressure_event";

-- DropTable
DROP TABLE "truck_status_event";

-- DropEnum
DROP TYPE "alert_type";

-- DropEnum
DROP TYPE "truck_status";

-- CreateTable
CREATE TABLE "sensor_data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sensor_id" UUID NOT NULL,
    "tempValue" REAL,
    "tiprValue" REAL,
    "exType" VARCHAR(50),
    "bat" SMALLINT,
    "recorded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "altitude" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "location_id" UUID NOT NULL,
    "device_id" UUID NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "altitude" REAL,
    "recorded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "severity" VARCHAR(20) NOT NULL DEFAULT 'warning',
    "threshold_min" REAL,
    "threshold_max" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "alert_id" UUID NOT NULL,
    "device_id" UUID,
    "sensor_id" UUID,
    "truck_id" UUID,
    "value" REAL,
    "message" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMPTZ(6),

    CONSTRAINT "alert_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_sensor_data_sensor_id" ON "sensor_data"("sensor_id");

-- CreateIndex
CREATE INDEX "idx_sensor_data_recorded_at" ON "sensor_data"("recorded_at");

-- CreateIndex
CREATE INDEX "idx_location_device_id" ON "location"("device_id");

-- CreateIndex
CREATE INDEX "idx_location_created_at" ON "location"("created_at");

-- CreateIndex
CREATE INDEX "idx_location_history_device" ON "location_history"("device_id");

-- CreateIndex
CREATE INDEX "idx_location_history_time" ON "location_history"("recorded_at");

-- CreateIndex
CREATE UNIQUE INDEX "alert_code_key" ON "alert"("code");

-- CreateIndex
CREATE INDEX "idx_alert_code" ON "alert"("code");

-- CreateIndex
CREATE INDEX "idx_alert_severity" ON "alert"("severity");

-- CreateIndex
CREATE INDEX "idx_alert_events_alert_id" ON "alert_events"("alert_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_device_id" ON "alert_events"("device_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_sensor_id" ON "alert_events"("sensor_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_truck_id" ON "alert_events"("truck_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_status" ON "alert_events"("status");

-- CreateIndex
CREATE INDEX "idx_sensor_tireNo" ON "sensor"("tireNo");

-- CreateIndex
CREATE UNIQUE INDEX "truck_plate_key" ON "truck"("plate");

-- CreateIndex
CREATE INDEX "idx_truck_plate" ON "truck"("plate");

-- CreateIndex
CREATE INDEX "idx_vendors_nama" ON "vendors"("name_vendor");

-- AddForeignKey
ALTER TABLE "truck" ADD CONSTRAINT "truck_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_history" ADD CONSTRAINT "location_history_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_history" ADD CONSTRAINT "location_history_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alert"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- RenameIndex
ALTER INDEX "idx_device_truck_id" RENAME TO "idx_device_truck";
