/*
  Warnings:

  - The primary key for the `alert` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `alert` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `alert_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `alert_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `device_id` column on the `alert_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sensor_id` column on the `alert_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `truck_id` column on the `alert_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `device` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `device` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `sensor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `sensor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `truck` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `truck` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `truck` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `truck` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `location_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sensor_data` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `alert_id` on the `alert_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `truck_id` on the `device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `device_id` on the `location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `device_id` on the `sensor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "alert_events" DROP CONSTRAINT "alert_events_alert_id_fkey";

-- DropForeignKey
ALTER TABLE "alert_events" DROP CONSTRAINT "alert_events_device_id_fkey";

-- DropForeignKey
ALTER TABLE "alert_events" DROP CONSTRAINT "alert_events_sensor_id_fkey";

-- DropForeignKey
ALTER TABLE "alert_events" DROP CONSTRAINT "alert_events_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "device" DROP CONSTRAINT "device_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_device_id_fkey";

-- DropForeignKey
ALTER TABLE "location_history" DROP CONSTRAINT "location_history_device_id_fkey";

-- DropForeignKey
ALTER TABLE "location_history" DROP CONSTRAINT "location_history_location_id_fkey";

-- DropForeignKey
ALTER TABLE "sensor" DROP CONSTRAINT "sensor_device_id_fkey";

-- DropForeignKey
ALTER TABLE "sensor_data" DROP CONSTRAINT "sensor_data_sensor_id_fkey";

-- AlterTable
ALTER TABLE "alert" DROP CONSTRAINT "alert_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "alert_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "alert_events" DROP CONSTRAINT "alert_events_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "alert_id",
ADD COLUMN     "alert_id" INTEGER NOT NULL,
DROP COLUMN "device_id",
ADD COLUMN     "device_id" INTEGER,
DROP COLUMN "sensor_id",
ADD COLUMN     "sensor_id" INTEGER,
DROP COLUMN "truck_id",
ADD COLUMN     "truck_id" INTEGER,
ADD CONSTRAINT "alert_events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "device" DROP CONSTRAINT "device_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "truck_id",
ADD COLUMN     "truck_id" INTEGER NOT NULL,
ADD CONSTRAINT "device_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "location" DROP CONSTRAINT "location_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "device_id",
ADD COLUMN     "device_id" INTEGER NOT NULL,
ADD CONSTRAINT "location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sensor" DROP CONSTRAINT "sensor_pkey",
ADD COLUMN     "bat" SMALLINT,
ADD COLUMN     "exType" VARCHAR(50),
ADD COLUMN     "tempValue" REAL,
ADD COLUMN     "tirepValue" REAL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "device_id",
ADD COLUMN     "device_id" INTEGER NOT NULL,
ADD CONSTRAINT "sensor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "truck" DROP CONSTRAINT "truck_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER,
ADD CONSTRAINT "truck_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_admin" DROP CONSTRAINT "user_admin_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_admin_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "location_history";

-- DropTable
DROP TABLE "sensor_data";

-- CreateIndex
CREATE INDEX "idx_alert_events_alert_id" ON "alert_events"("alert_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_device_id" ON "alert_events"("device_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_sensor_id" ON "alert_events"("sensor_id");

-- CreateIndex
CREATE INDEX "idx_alert_events_truck_id" ON "alert_events"("truck_id");

-- CreateIndex
CREATE INDEX "idx_device_truck" ON "device"("truck_id");

-- CreateIndex
CREATE INDEX "idx_location_device_id" ON "location"("device_id");

-- CreateIndex
CREATE INDEX "idx_sensor_device_id" ON "sensor"("device_id");

-- CreateIndex
CREATE INDEX "idx_sensor_updated_at" ON "sensor"("updated_at");

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alert"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_events" ADD CONSTRAINT "alert_events_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
