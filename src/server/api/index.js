//activities, trip, budget, and clothing
const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require('../auth/utils');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<--------------------------GET ALL TRIPS------------------------>
//GET api/trip
apiRouter.get("/trip", requireUser, async (req, res, next) => {
    try {
        const allTrips = await prisma.trip.findMany();
        res.send(allTrips);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET SINGLE TRIP------------------------>
//GET api/trip/:id
apiRouter.get("/trip/:id", requireUser, async (req, res, next) => {
    try {
        const trip = await prisma.trip.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {meals: true}
        });
        res.send(trip)
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET ALL BUDGETS------------------------>
//GET api/budget
apiRouter.get("/budget", requireUser, async (req, res, next) => {
    try {
        const allBudgets = await prisma.budget.findMany();
        res.send(allBudgets);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET BUDGETS BY TRIP------------------------>
//GET api/budget/:trip
apiRouter.get("/budget/:trip", requireUser, async (req, res, next) => {
    try {
        const tripBudgets = await prisma.budget.findMany({
            where: {tripId: Number(req.params.id)},
            include: {trip: true}
        });
        res.send(tripBudgets);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET CLOTHING BY USER------------------------>
//GET api/clothing/:user
apiRouter.get("/clothing/:user", requireUser, async (req, res, next) => {
    try {
        const userClothing = await prisma.clothing.findMany({
            where: {userId: req.user.id},
            include: {user: true}
        });
        res.send(userClothing);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET ALL ACTIVITIES------------------------>
//GET api/activity
apiRouter.get("/activity", requireUser, async (req, res, next) => {
    try {
        const allActivities = await prisma.activities.findMany();
        res.send(allActivities);
    } catch (error) {
        next(error);
    }
});
//<--------------------------DELETE BUDGET------------------------>
//DELETE api/budget/:id
apiRouter.delete("/budget/:id", requireUser, async (req, res, next) => {
    try {
        const deletedBudget = await prisma.budget.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedBudget) {
            return res.status(404).send("Budget not found");
        }
        res.send(deletedBudget)
    } catch (error) {
        next(error);
    }
});
//<--------------------------DELETE CLOTHING------------------------>
//DELETE api/clothing/:id
apiRouter.delete("/clothing/:id", requireUser, async (req, res, next) => {
    try {
        const deletedClothing = await prisma.clothing.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedClothing) {
            return res.status(404).send("Clothing not found");
        }
        res.send(deletedClothing)
    } catch (error) {
        next(error);
    }
});
//<--------------------------DELETE ACTIVITY------------------------>
//DELETE api/activity/:id
apiRouter.delete("/activity/:id", requireUser, async (req, res, next) => {
    try {
        const deletedActivity = await prisma.activities.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedActivity) {
            return res.status(404).send("Activity not found");
        }
        res.send(deletedActivity)
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST NEW TRIP------------------------>
//POST api/trip
apiRouter.post("/trip", requireUser, async (req, res, next) => {
    try {
        const {startDate, endDate, campgroundId, gasTotal, gasSingle, fireNight, parking} = req.body;
        const newTrip = await prisma.trip.create({
            data: {
                startDate, 
                endDate, 
                campground: {connect: {id: campgroundId}}, 
                gasTotal, 
                gasSingle, 
                fireNight, 
                parking
            },
            include: {campground: true}
        });
        res.status(201).send(newTrip);
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST NEW BUDGET------------------------>
//POST api/budget
apiRouter.post("/budget", requireUser, async (req, res, next) => {
    try {
        const {name, tripId, total, individual} = req.body;
        const newBudget = await prisma.budget.create({
            data: {
                name, 
                trip: {connect: {id: tripId}}, 
                total, 
                individual
            },
            include: {trip: true}
        });
        res.status(201).send(newBudget);
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST NEW CLOTHING------------------------>
//POST api/clothing
apiRouter.post("/clothing", requireUser, async (req, res, next) => {
    try {
        const {name} = req.body;
        const newClothing = await prisma.clothing.create({
            data: {
                name,
                user: {connect: {id: req.user.id}}
            },
            include: {user: true}
        });
        res.status(201).send(newClothing);
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST NEW ACTIVITY------------------------>
//POST api/activity
apiRouter.post("/activity", requireUser, async (req, res, next) => {
    try {
        const {name} = req.body;
        const newActivity = await prisma.activities.create({
            data: {
                name
            }
        })
        res.status(201).send(newActivity);
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH TRIP------------------------>
//PATCH api/trip/:id/edit
apiRouter.patch("/trip/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {startDate, endDate, campgroundId, gasTotal, gasSingle, fireNight, parking} = req.body;
        const updatedTrip = await prisma.trip.update({
            where: {id: Number(req.params.id)},
            data: {
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                campground: campgroundId ? {connect: {id: campgroundId}} : undefined,
                gasTotal: gasTotal || undefined,
                gasSingle: gasSingle || undefined,
                fireNight: fireNight || undefined,
                parking: parking || undefined
            } 
        })
        if (!updatedTrip) {
            res.status(404).send({message: "Trip not found"});
        } else {
            res.send(updatedTrip);
        }
    } catch (error) {
        next(error);
    }
});
//PATCH api/trip/:id/:meal/add
apiRouter.patch("/trip/:id/:meal/add", requireUser, async (req, res, next) => {
    try {
        const updatedTrip = await prisma.trip.update({
            where: {id: Number(req.params.id)},
            data: {
                meals: {
                    connect: {id: Number(req.params.meal)},
                },
            },
            include: {meals: true}
        });
        if (!updatedTrip) {
            res.status(404).send({message: "Trip not found"});
        } else {
            res.send(updatedTrip);
        }
    } catch (error) {
        next(error);
    }
});
//PATCH api/trip/:id/:meal/remove
apiRouter.patch("/trip/:id/:meal/remove", requireUser, async (req, res, next) => {
    try {
        const updatedTrip = await prisma.trip.update({
            where: {id: Number(req.params.id)},
            data: {
                meals: {
                    disconnect: [{id: Number(req.params.meal)}],
                },
            },
            include: {meals: true}
        })
        if (!updatedTrip) {
            res.status(404).send({message: "Trip not found"});
        } else {
            res.send(updatedTrip);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------TRIP CURRENT TOGGLE------------------------>
//PATCH api/trip/:id/current
apiRouter.patch("/trip/:id/current", requireUser, async (req, res, next) => {
    try {
        const {current} = req.body;
        const currentToggle = await prisma.trip.update({
            where: {id: Number(req.params.id)},
            data: {current: current}
        });
        res.send(currentToggle);
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH BUDGET------------------------>
//PATCH api/budget/:id/edit
apiRouter.patch("/budget/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {tripId, total, individual} = req.body;
        const updatedBudget = await prisma.budget.update({
            where: {id: Number(req.params.id)},
            data: {
                trip: tripId ? {connect: {id: tripId}} : undefined,
                total: total || undefined,
                individual: individual || undefined
            }
        });
        if (!updatedBudget) {
            res.status(404).send({message: "Budget not found"});
        } else {
            res.send(updatedBudget);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH CLOTHING------------------------>
//PATCH api/clothing/:id/edit
apiRouter.patch("/clothing/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {name} = req.body;
        const updatedClothing = await prisma.clothing.update({
            where: {id: Number(req.params.id)},
            data: {
                name: name || undefined
            }
        });
        if (!updatedClothing) {
            res.status(404).send({message: "Clothing not found"});
        } else {
            res.send(updatedClothing);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------CLOTHING PACK TOGGLE------------------------>
//PATCH api/clothing/:id/packed
apiRouter.patch("/clothing/:id/packed", requireUser, async (req, res, next) => {
    try {
        const {packed} = req.body;
        const packedToggle = await prisma.clothing.update({
            where: {id: Number(req.params.id)},
            data: {packed: packed}
        });
        res.send(packedToggle);
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH ACTIVITY------------------------>
//PATCH api/activity/:id/edit
apiRouter.patch("/activity/:id/edit", requireUser, async (req, res, next) => {
    try {
        const {name} = req.body;
        const updatedActivity = await prisma.activities.update({
            where: {id: Number(req.params.id)},
            data: {
                name: name || undefined
            }
        });
        if (!updatedActivity) {
            res.status(404).send({message: "Activity not found"});
        } else {
            res.send(updatedActivity);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;