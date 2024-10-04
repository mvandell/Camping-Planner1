-- AlterTable
ALTER TABLE "Activities" ALTER COLUMN "campgroundId" DROP DEFAULT;
DROP SEQUENCE "activities_campgroundid_seq";
