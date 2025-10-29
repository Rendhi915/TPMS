-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "truck_status" AS ENUM ('active', 'inactive', 'maintenance');

-- CreateEnum
CREATE TYPE "alert_type" AS ENUM ('LOW_TIRE', 'SPEEDING', 'IDLE', 'GEOFENCE_IN', 'GEOFENCE_OUT', 'FUEL_DROP', 'HIGH_TEMP', 'DEVICE_LOST');

-- CreateTable
CREATE TABLE "vendors" (
    "id" SERIAL NOT NULL,
    "nama_vendor" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "nomor_telepon" VARCHAR(50),
    "email" VARCHAR(255),
    "contact_person" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "email" VARCHAR(255),
    "address" TEXT,
    "license_number" VARCHAR(50) NOT NULL,
    "license_type" VARCHAR(20) NOT NULL,
    "license_expiry" DATE NOT NULL,
    "id_card_number" VARCHAR(50) NOT NULL,
    "vendor_id" INTEGER,
    "status" VARCHAR(20) NOT NULL DEFAULT 'aktif',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "truck" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(4),
    "vin" TEXT,
    "name" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "tire_config" TEXT,
    "fleet_group_id" UUID,
    "vendor_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fleet_group" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "site" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "fleet_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "truck_id" UUID NOT NULL,
    "sn" TEXT NOT NULL,
    "sim_number" TEXT,
    "installed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMPTZ(6),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID NOT NULL,
    "type" TEXT,
    "position_no" INTEGER NOT NULL,
    "sn" TEXT,
    "installed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMPTZ(6),
    "created_by" UUID,
    "updated_by" UUID,

    CONSTRAINT "sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps_position" (
    "id" BIGSERIAL NOT NULL,
    "device_id" UUID,
    "truck_id" UUID NOT NULL,
    "ts" TIMESTAMPTZ(6) NOT NULL,
    "pos" geography NOT NULL,
    "speed_kph" REAL,
    "heading_deg" REAL,
    "hdop" REAL,
    "source" TEXT,

    CONSTRAINT "gps_position_pkey" PRIMARY KEY ("id","ts")
);

-- CreateTable
CREATE TABLE "tire_pressure_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID NOT NULL,
    "truck_id" UUID NOT NULL,
    "tire_no" INTEGER NOT NULL,
    "pressure_kpa" REAL,
    "temp_celsius" REAL,
    "ex_type" TEXT,
    "battery_level" SMALLINT,
    "changed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,

    CONSTRAINT "tire_pressure_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_status_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID NOT NULL,
    "truck_id" UUID NOT NULL,
    "host_bat" SMALLINT,
    "repeater1_bat" SMALLINT,
    "repeater2_bat" SMALLINT,
    "lock_state" SMALLINT,
    "reported_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,

    CONSTRAINT "device_status_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_temperature_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID NOT NULL,
    "truck_id" UUID NOT NULL,
    "hub_no" INTEGER,
    "temp_celsius" REAL,
    "ex_type" TEXT,
    "battery_level" SMALLINT,
    "changed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,

    CONSTRAINT "hub_temperature_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lock_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID NOT NULL,
    "truck_id" UUID NOT NULL,
    "is_lock" SMALLINT,
    "reported_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,

    CONSTRAINT "lock_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "truck_status_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "truck_id" UUID NOT NULL,
    "status" "truck_status" NOT NULL,
    "note" TEXT,
    "changed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,

    CONSTRAINT "truck_status_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "truck_id" UUID NOT NULL,
    "type" "alert_type" NOT NULL,
    "severity" SMALLINT,
    "detail" JSONB,
    "occurred_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "created_by" UUID,

    CONSTRAINT "alert_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_truck_assignment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_id" UUID,
    "truck_id" UUID,
    "assigned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" UUID,
    "removed_at" TIMESTAMPTZ(6),
    "removed_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "device_truck_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor_data_raw" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "device_sn" TEXT NOT NULL,
    "cmd_type" TEXT NOT NULL,
    "truck_id" UUID,
    "tire_no" INTEGER,
    "raw_json" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "received_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMPTZ(6),

    CONSTRAINT "sensor_data_raw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor_processing_queue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "raw_data_id" UUID,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "max_attempts" INTEGER NOT NULL DEFAULT 3,
    "error_message" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMPTZ(6),

    CONSTRAINT "sensor_processing_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_vendors_nama" ON "vendors"("nama_vendor");

-- CreateIndex
CREATE INDEX "idx_vendors_deleted_at" ON "vendors"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_drivers_vendor_id" ON "drivers"("vendor_id");

-- CreateIndex
CREATE INDEX "idx_drivers_status" ON "drivers"("status");

-- CreateIndex
CREATE INDEX "idx_drivers_license_expiry" ON "drivers"("license_expiry");

-- CreateIndex
CREATE INDEX "idx_drivers_deleted_at" ON "drivers"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "truck_code_key" ON "truck"("code");

-- CreateIndex
CREATE UNIQUE INDEX "truck_vin_key" ON "truck"("vin");

-- CreateIndex
CREATE INDEX "idx_truck_code" ON "truck"("code");

-- CreateIndex
CREATE INDEX "idx_truck_vin" ON "truck"("vin");

-- CreateIndex
CREATE INDEX "idx_truck_vendor_id" ON "truck"("vendor_id");

-- CreateIndex
CREATE INDEX "idx_truck_fleet_group_id" ON "truck"("fleet_group_id");

-- CreateIndex
CREATE INDEX "idx_truck_deleted_at" ON "truck"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_fleet_group_deleted_at" ON "fleet_group"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "device_sn_key" ON "device"("sn");

-- CreateIndex
CREATE INDEX "idx_device_sim_number" ON "device"("sim_number");

-- CreateIndex
CREATE INDEX "idx_device_sn" ON "device"("sn");

-- CreateIndex
CREATE INDEX "idx_device_truck_id" ON "device"("truck_id");

-- CreateIndex
CREATE UNIQUE INDEX "sensor_sn_key" ON "sensor"("sn");

-- CreateIndex
CREATE INDEX "idx_sensor_sn" ON "sensor"("sn");

-- CreateIndex
CREATE INDEX "idx_sensor_device_id" ON "sensor"("device_id");

-- CreateIndex
CREATE INDEX "idx_sensor_position_no" ON "sensor"("position_no");

-- CreateIndex
CREATE INDEX "idx_gps_position_pos" ON "gps_position" USING GIST ("pos");

-- CreateIndex
CREATE INDEX "idx_gps_position_spatial" ON "gps_position" USING GIST ("pos");

-- CreateIndex
CREATE INDEX "idx_gps_position_truck_ts" ON "gps_position"("truck_id", "ts" DESC);

-- CreateIndex
CREATE INDEX "idx_tire_pressure_event_tire_no" ON "tire_pressure_event"("tire_no", "changed_at" DESC);

-- CreateIndex
CREATE INDEX "idx_tire_pressure_event_truck_id" ON "tire_pressure_event"("truck_id", "changed_at" DESC);

-- CreateIndex
CREATE INDEX "idx_tire_pressure_event_truck_ts" ON "tire_pressure_event"("truck_id", "changed_at" DESC);

-- CreateIndex
CREATE INDEX "idx_device_status_event_truck_id" ON "device_status_event"("truck_id", "reported_at" DESC);

-- CreateIndex
CREATE INDEX "idx_hub_temperature_event_truck_id" ON "hub_temperature_event"("truck_id", "changed_at" DESC);

-- CreateIndex
CREATE INDEX "idx_hub_temperature_event_truck_ts" ON "hub_temperature_event"("truck_id", "changed_at" DESC);

-- CreateIndex
CREATE INDEX "idx_lock_event_truck_id" ON "lock_event"("truck_id", "reported_at" DESC);

-- CreateIndex
CREATE INDEX "idx_truck_status_event_truck_ts" ON "truck_status_event"("truck_id", "changed_at" DESC);

-- CreateIndex
CREATE INDEX "idx_alert_event_truck_ts" ON "alert_event"("truck_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "idx_alert_event_acknowledged" ON "alert_event"("acknowledged");

-- CreateIndex
CREATE INDEX "idx_device_truck_assignment_device_id" ON "device_truck_assignment"("device_id", "assigned_at" DESC);

-- CreateIndex
CREATE INDEX "idx_device_truck_assignment_truck_id" ON "device_truck_assignment"("truck_id", "assigned_at" DESC);

-- CreateIndex
CREATE INDEX "idx_sensor_data_raw_cmd_type" ON "sensor_data_raw"("cmd_type", "received_at" DESC);

-- CreateIndex
CREATE INDEX "idx_sensor_data_raw_device_sn" ON "sensor_data_raw"("device_sn", "received_at" DESC);

-- CreateIndex
CREATE INDEX "idx_sensor_data_raw_processed" ON "sensor_data_raw"("processed", "received_at" DESC);

-- CreateIndex
CREATE INDEX "idx_sensor_processing_queue_priority" ON "sensor_processing_queue"("priority", "created_at");

-- CreateIndex
CREATE INDEX "idx_sensor_processing_queue_processed" ON "sensor_processing_queue"("processed_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_username" ON "users"("username");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "truck" ADD CONSTRAINT "truck_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "truck" ADD CONSTRAINT "truck_fleet_group_id_fkey" FOREIGN KEY ("fleet_group_id") REFERENCES "fleet_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gps_position" ADD CONSTRAINT "gps_position_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gps_position" ADD CONSTRAINT "gps_position_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tire_pressure_event" ADD CONSTRAINT "tire_pressure_event_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tire_pressure_event" ADD CONSTRAINT "tire_pressure_event_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_status_event" ADD CONSTRAINT "device_status_event_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_status_event" ADD CONSTRAINT "device_status_event_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_temperature_event" ADD CONSTRAINT "hub_temperature_event_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hub_temperature_event" ADD CONSTRAINT "hub_temperature_event_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lock_event" ADD CONSTRAINT "lock_event_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lock_event" ADD CONSTRAINT "lock_event_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "truck_status_event" ADD CONSTRAINT "truck_status_event_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alert_event" ADD CONSTRAINT "alert_event_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_truck_assignment" ADD CONSTRAINT "device_truck_assignment_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_truck_assignment" ADD CONSTRAINT "device_truck_assignment_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_truck_assignment" ADD CONSTRAINT "device_truck_assignment_removed_by_fkey" FOREIGN KEY ("removed_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_truck_assignment" ADD CONSTRAINT "device_truck_assignment_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_data_raw" ADD CONSTRAINT "sensor_data_raw_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_processing_queue" ADD CONSTRAINT "sensor_processing_queue_raw_data_id_fkey" FOREIGN KEY ("raw_data_id") REFERENCES "sensor_data_raw"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
