/*
  Warnings:

  - You are about to drop the `_ActivitiesToCampgrounds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActivitiesToCampgrounds" DROP CONSTRAINT "_ActivitiesToCampgrounds_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivitiesToCampgrounds" DROP CONSTRAINT "_ActivitiesToCampgrounds_B_fkey";

-- DropIndex
DROP INDEX "Activities_name_key";

-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "campgroundId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_ActivitiesToCampgrounds";

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_campgroundId_fkey" FOREIGN KEY ("campgroundId") REFERENCES "Campgrounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
