/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "device_truck_assignment" DROP CONSTRAINT "device_truck_assignment_assigned_by_fkey";

-- DropForeignKey
ALTER TABLE "device_truck_assignment" DROP CONSTRAINT "device_truck_assignment_removed_by_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user_admin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'admin',
    "last_login" TIMESTAMPTZ(6),
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "user_admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_admin_email_key" ON "user_admin"("email");

-- CreateIndex
CREATE INDEX "idx_user_admin_email" ON "user_admin"("email");

-- CreateIndex
CREATE INDEX "idx_user_admin_status" ON "user_admin"("status");

-- AddForeignKey
ALTER TABLE "device_truck_assignment" ADD CONSTRAINT "device_truck_assignment_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "user_admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "device_truck_assignment" ADD CONSTRAINT "device_truck_assignment_removed_by_fkey" FOREIGN KEY ("removed_by") REFERENCES "user_admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
