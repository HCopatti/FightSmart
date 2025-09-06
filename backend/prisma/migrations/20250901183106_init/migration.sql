/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Academy` table. All the data in the column will be lost.
  - The `degree` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Academy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academyId` to the `TeacherProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Academy" DROP CONSTRAINT "Academy_teacherId_fkey";

-- DropIndex
DROP INDEX "public"."Academy_teacherId_key";

-- AlterTable
ALTER TABLE "public"."Academy" DROP COLUMN "teacherId";

-- AlterTable
ALTER TABLE "public"."Class" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."TeacherProfile" ADD COLUMN     "academyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "degree",
ADD COLUMN     "degree" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Academy_name_key" ON "public"."Academy"("name");

-- AddForeignKey
ALTER TABLE "public"."TeacherProfile" ADD CONSTRAINT "TeacherProfile_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "public"."Academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
