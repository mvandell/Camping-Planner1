-- AlterTable
CREATE SEQUENCE activities_campgroundid_seq;
ALTER TABLE "Activities" ALTER COLUMN "campgroundId" SET DEFAULT nextval('activities_campgroundid_seq');
ALTER SEQUENCE activities_campgroundid_seq OWNED BY "Activities"."campgroundId";
