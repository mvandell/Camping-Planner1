//meals and food
const express = require('express');
const foodRouter = express.Router();

const { requireUser } = require('../auth/utils');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<--------------------------GET ALL MEALS------------------------>
//GET api/food/meal
foodRouter.get("/meal", requireUser, async (req, res, next) => {
    try {
        const allMeals = await prisma.meals.findMany();
        res.send(allMeals);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET MEALS BY TRIP------------------------>
//GET api/food/meal/trip/:trip
foodRouter.get("/meal/trip/:trip", requireUser, async (req, res, next) => {
    try {
        const tripMeals = await prisma.meals.findMany({
            where: {tripId: Number(req.params.id)},
            include: {trip: true}
        });
        res.send(tripMeals);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET SINGLE MEAL------------------------>
//GET api/food/meal/:id
foodRouter.get("/meal/:id", requireUser, async (req, res, next) => {
    try {
        const meal = await prisma.meals.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {foods: {include: {user: {select: {username: true}}}}}
        });
        res.send(meal);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET ALL FOOD------------------------>
//GET api/food/food
foodRouter.get("/food", requireUser, async (req, res, next) => {
    try {
        const allFood = await prisma.food.findMany();
        res.send(allFood);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET FOOD BY USER------------------------>
//GET api/food/food/:user
foodRouter.get("/food/:user", requireUser, async (req, res, next) => {
    try {
        const userFood = await prisma.food.findMany({
            where: { userId: req.user.id },
            include: { user: true }
        });
        res.send(userFood);
    } catch (error) {
        next(error);
    }
});
//<--------------------------DELETE MEAL------------------------>
//DELETE api/food/meal/:id
foodRouter.delete("/meal/:id", requireUser, async (req, res, next) => {
    try {
        const deletedMeal = await prisma.meals.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedMeal) {
            return res.status(404).send("Meal not found");
        }
        res.send(deletedMeal)
    } catch (error) {
        next(error);
    }
});
//<--------------------------DELETE FOOD------------------------>
//DELETE api/food/food/:id
foodRouter.delete("/food/:id", requireUser, async (req, res, next) => {
    try {
        const deletedFood = await prisma.food.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedFood) {
            return res.status(404).send("Food not found");
        }
        res.send(deletedFood)
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST NEW MEAL------------------------>
//POST api/food/meal
foodRouter.post("/meal", requireUser, async (req, res, next) => {
    try {
        const {day, course, name} = req.body;
        const newMeal = await prisma.meals.create({
            data: {
                day,
                course,
                name
            }
        });
        res.status(201).send(newMeal);
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST NEW FOOD------------------------>
//POST api/food/food/:meal
foodRouter.post("/food/:meal", requireUser, async (req, res, next) => {
    try {
        const {name, cooler, userId} = req.body;
        const newFood = await prisma.food.create({
            data: {
                name,
                cooler,
                user: {connect: {id: userId}},
                meals: {connect: {id: Number(req.params.meal)}}
            },
            include: {user: true, meals: true}
        });
        res.status(201).send(newFood);
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH MEAL------------------------>
//PATCH api/food/meal/:id/edit
foodRouter.patch("/meal/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {day, course, name} = req.body;
        const updatedMeal = await prisma.meals.update({
            where: {id: Number(req.params.id)},
            data: {
                day: day || undefined,
                course: course || undefined,
                name: name || undefined
            }
        })
        if (!updatedMeal) {
            res.status(404).send({message: "Meal not found"});
        } else {
            res.send(updatedMeal);
        }
    } catch (error) {
        next(error);
    }
});
//PATCH api/food/meal/:id/:food/remove
foodRouter.patch("/meal/:id/:food/remove", requireUser, async (req, res, next) => {
    try {
        const updatedMeal = await prisma.meals.update({
            where: {id: Number(req.params.id)},
            data: {
                foods: {
                    disconnect: [{id: Number(req.params.food)}],
                },
            },
            include: {foods: true}
        })
        if (!updatedMeal) {
            res.status(404).send({message: "Meal not found"});
        } else {
            res.send(updatedMeal);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH FOOD------------------------>
//PATCH api/food/food/:id/edit
foodRouter.patch("/food/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {name} = req.body;
        const updatedFood = await prisma.food.update({
            where: {id: Number(req.params.id)},
            data: {
                name: name || undefined
            }
        })
        if (!updatedFood) {
            res.status(404).send({message: "Food not found"});
        } else {
            res.send(updatedFood);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------FOOD PURCHASE TOGGLE------------------------>
//PATCH api/food/food/:id/purchased
foodRouter.patch("/food/:id/purchased", requireUser, async (req, res, next) => {
    try {
        const {purchased} = req.body;
        const purchaseToggle = await prisma.food.update({
            where: {id: Number(req.params.id)},
            data: {purchased: purchased}
        });
        res.send(purchaseToggle)
    } catch (error) {
        next(error);
    }
});
//<--------------------------FOOD COOLER TOGGLE------------------------>
//PATCH api/food/food/:id/cooler
foodRouter.patch("/food/:id/cooler", requireUser, async (req, res, next) => {
    try {
        const {cooler} = req.body;
        const coolerToggle = await prisma.food.update({
            where: {id: Number(req.params.id)},
            data: {cooler: cooler}
        });
        res.send(coolerToggle)
    } catch (error) {
        next(error);
    }
});

module.exports = foodRouter;