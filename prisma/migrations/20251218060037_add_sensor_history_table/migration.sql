-- CreateTable
CREATE TABLE "sensor_history" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "device_id" INTEGER NOT NULL,
    "truck_id" INTEGER NOT NULL,
    "tireNo" INTEGER NOT NULL,
    "sensorNo" INTEGER,
    "tempValue" REAL NOT NULL,
    "tirepValue" REAL NOT NULL,
    "exType" VARCHAR(50) NOT NULL DEFAULT 'normal',
    "bat" SMALLINT,
    "recorded_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_sensor_history_location_id" ON "sensor_history"("location_id");

-- CreateIndex
CREATE INDEX "idx_sensor_history_sensor_id" ON "sensor_history"("sensor_id");

-- CreateIndex
CREATE INDEX "idx_sensor_history_device_id" ON "sensor_history"("device_id");

-- CreateIndex
CREATE INDEX "idx_sensor_history_truck_id" ON "sensor_history"("truck_id");

-- CreateIndex
CREATE INDEX "idx_sensor_history_recorded_at" ON "sensor_history"("recorded_at");

-- CreateIndex
CREATE INDEX "idx_sensor_history_tireNo" ON "sensor_history"("tireNo");

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sensor_history" ADD CONSTRAINT "sensor_history_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
