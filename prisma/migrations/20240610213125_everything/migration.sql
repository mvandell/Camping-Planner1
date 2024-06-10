-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "campgroundId" INTEGER NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT true,
    "gasTotal" INTEGER NOT NULL,
    "gasSingle" INTEGER NOT NULL,
    "fireNight" INTEGER NOT NULL,
    "parking" INTEGER NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tripId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "individual" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meals" (
    "id" SERIAL NOT NULL,
    "day" INTEGER,
    "course" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "cooler" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clothing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "packed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Clothing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campgrounds" (
    "id" SERIAL NOT NULL,
    "park" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "firewood" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "curvy" TEXT NOT NULL,
    "reserveFrame" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "generalArea" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Campgrounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "packed" BOOLEAN NOT NULL DEFAULT false,
    "needed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MealsToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FoodToMeals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivitiesToCampgrounds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Campgrounds_park_key" ON "Campgrounds"("park");

-- CreateIndex
CREATE UNIQUE INDEX "Activities_name_key" ON "Activities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MealsToTrip_AB_unique" ON "_MealsToTrip"("A", "B");

-- CreateIndex
CREATE INDEX "_MealsToTrip_B_index" ON "_MealsToTrip"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToMeals_AB_unique" ON "_FoodToMeals"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToMeals_B_index" ON "_FoodToMeals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToCampgrounds_AB_unique" ON "_ActivitiesToCampgrounds"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToCampgrounds_B_index" ON "_ActivitiesToCampgrounds"("B");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_campgroundId_fkey" FOREIGN KEY ("campgroundId") REFERENCES "Campgrounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealsToTrip" ADD CONSTRAINT "_MealsToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "Meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealsToTrip" ADD CONSTRAINT "_MealsToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToMeals" ADD CONSTRAINT "_FoodToMeals_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToMeals" ADD CONSTRAINT "_FoodToMeals_B_fkey" FOREIGN KEY ("B") REFERENCES "Meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToCampgrounds" ADD CONSTRAINT "_ActivitiesToCampgrounds_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToCampgrounds" ADD CONSTRAINT "_ActivitiesToCampgrounds_B_fkey" FOREIGN KEY ("B") REFERENCES "Campgrounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
