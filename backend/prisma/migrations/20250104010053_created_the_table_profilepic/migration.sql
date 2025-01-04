/*
  Warnings:

  - You are about to drop the column `profilePic` on the `UserDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDetail" DROP COLUMN "profilePic",
ADD COLUMN     "profilePicId" TEXT;

-- CreateTable
CREATE TABLE "ProfilePic" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilePic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_profilePicId_fkey" FOREIGN KEY ("profilePicId") REFERENCES "ProfilePic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
