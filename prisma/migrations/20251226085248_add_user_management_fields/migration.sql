-- AlterTable
ALTER TABLE "user_admin" ADD COLUMN     "avatar" VARCHAR(500),
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "department" VARCHAR(100),
ADD COLUMN     "phone" VARCHAR(50),
ADD COLUMN     "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "idx_user_admin_role" ON "user_admin"("role");
