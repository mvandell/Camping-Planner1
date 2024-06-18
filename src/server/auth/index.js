//user, equipment, and campgrounds
const express = require("express");
const authRouter = express.Router();

const {requireAdmin, requireUser} = require("./utils");

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//<--------------------------------GET ALL USERS FOR VALIDATING-------------------------------->
//GET /auth/users/validate
authRouter.get("/users/validate", async (req, res, next) => {
    try {
        const user = prisma.user
        const users = await user.findMany({
            select: {username: true}
        });

        delete user.password
        res.send(users);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET ACCOUNT------------------------>
//GET /auth/account
authRouter.get("/account", requireUser, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            include: {clothing: true, foods: true}
        });
        delete user.password;
        res.send(user);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET ALL CAMPGROUNDS------------------------>
//GET /auth/campground
authRouter.get("/campground", async (req, res, next) => {
    try {
        const allCampgrounds = await prisma.campgrounds.findMany();
        res.send(allCampgrounds);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET SINGLE CAMPGROUND------------------------>
//GET /auth/campground/:id
authRouter.get("/campground/:id", async (req, res, next) => {
    try {
        const campground = await prisma.campgrounds.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {activities: true}
        });
        res.send(campground);
    } catch (error) {
        next(error);
    }
});
//<--------------------------GET ALL EQUIPMENT------------------------>
//GET /auth/equipment
authRouter.get("/equipment", async (req, res, next) => {
    try {
        const allEquipment = await prisma.equipment.findMany();
        res.send(allEquipment);
    } catch (error) {
        next(error);
    }
});
//<--------------------------DELETE CAMPGROUND------------------------>
//ADMIN ONLY
//DELETE /auth/campground/:id
authRouter.delete("/campground/:id", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const deletedCampground = await prisma.campgrounds.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedCampground) {
            return res.status(404).send("Campground not found");
        }
        res.send(deletedCampground)
    } catch (error) {
        next(error)
    }
});
//<--------------------------DELETE EQUIPMENT------------------------>
//ADMIN ONLY
//DELETE /auth/equipment/:id
authRouter.delete("/equipment/:id", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const deletedEquipment = await prisma.equipment.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedEquipment) {
            return res.status(404).send("Equipment item not found");
        }
        res.send(deletedEquipment)
    } catch (error) {
        next(error)
    }
});
//<--------------------------DELETE TRIP------------------------>
//ADMIN ONLY
//DELETE /auth/trip/:id
authRouter.delete("/trip/:id", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const deletedTrip = await prisma.trip.delete({
            where: {id: Number(req.params.id)}
        });
        if (!deletedTrip) {
            return res.status(404).send("Trip not found");
        }
        res.send(deletedTrip)
    } catch (error) {
        next(error)
    }
});

//<--------------------------LOGIN------------------------>
//POST auth/login
authRouter.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
        });
        const validPassword = await bcrypt.compare(
            password, user?.password ?? ""
        );
        //Check user and password
        if (!user) {
            return res.status(401).send("There is no user with that username.");
        } else if (!validPassword) {
            return res.status(401).send("Incorrect password.");
        }
        //Create token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        res.send({token});
        console.log("Login successful!")
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST EQUIPMENT------------------------>
//ADMIN ONLY
//POST auth/equipment
authRouter.post("/equipment", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const {name, needed} = req.body;
        const newEquipment = await prisma.equipment.create({
            data: {
                name,
                needed
            }
        })
        res.status(201).send(newEquipment);
    } catch (error) {
        next(error);
    }
});
//<--------------------------POST CAMPGROUND------------------------>
//ADMIN ONLY
//POST auth/campground
authRouter.post("/campground", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const {park, price, firewood, distance, curvy, reserveFrame, website, generalArea, picture} = req.body;
        console.log(id)
        const newCampground = await prisma.campgrounds.create({
            data: {
                park, 
                price, 
                firewood, 
                distance, 
                curvy, 
                reserveFrame, 
                website, 
                generalArea,
                picture
            },
        });
        res.status(201).send(newCampground)
    } catch (error) {
        next(error);
    }
});

//<--------------------------PATCH USER------------------------>
//PATCH auth/account/edit
authRouter.patch("/account/edit", requireUser, async (req, res, next) => {
    try {
        const {username, password} = req.body;
        let hashedPassword = "";
        if (password !== null) {
            hashedPassword = await bcrypt.hash(password, SALT_COUNT);
            return hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: {id: req.user.id},
            data: {
                username: username || undefined,
                password: hashedPassword || undefined
            }
        });
        delete updatedUser.password, hashedPassword;
        res.send("User successfully updated")
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH CAMPGROUND------------------------>
//ADMIN ONLY
//PATCH auth/campground/:id/edit
authRouter.patch("/campground/:id/edit", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const {park, price, firewood, distance, curvy, reserveFrame, website, generalArea} = req.body;
        const updatedCampground = await prisma.campgrounds.update({
            where: {id: Number(req.params.id)},
            data: {
                park: park || undefined, 
                price: price || undefined, 
                firewood: firewood || undefined, 
                distance: distance || undefined, 
                curvy: curvy || undefined, 
                reserveFrame: reserveFrame || undefined, 
                website: website || undefined, 
                generalArea: generalArea || undefined,
                picture: picture || undefined
            }
        });
        if (!updatedCampground) {
            res.status(404).send({message: "Campground not found"});
        } else {
            res.send(updatedCampground);
        }
    } catch (error) {
        next(error);
    }
});
//PATCH auth/campground/:id/:activity/add
authRouter.patch("/campground/:id/:activity/add", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const updatedCampground = await prisma.campgrounds.update({
            where: {id: Number(req.params.id)},
            data: {
                activities: {
                    connect: {id: Number(req.params.activity)},
                },
            },
            include: {activities: true}
        });
        if (!updatedCampground) {
            res.status(404).send({message: "Campground not found"});
        } else {
            res.send(updatedCampground);
        }
    } catch (error) {
        next(error);
    }
});
//PATCH auth/campground/:id/:activity/remove
authRouter.patch("/campground/:id/:activity/remove", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const updatedCampground = await prisma.campgrounds.update({
            where: {id: Number(req.params.id)},
            data: {
                activities: {
                    disconnect: [{id: Number(req.params.activity)}],
                },
            },
            include: {activities: true}
        })
        if (!updatedCampground) {
            res.status(404).send({message: "Campground not found"});
        } else {
            res.send(updatedCampground);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------PATCH EQUIPMENT------------------------>
//ADMIN ONLY
//PATCH auth/equipment/:id/edit
authRouter.patch("/equipment/:id/edit", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const {name} = req.body;
        const updatedEquipment = await prisma.equipment.update({
            where: {id: Number(req.params.id)},
            data: {name: name || undefined}
        });
        if (!updatedEquipment) {
            res.status(404).send({message: "Equipment not found"});
        } else {
            res.send(updatedEquipment);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------EQUIPMENT PACK TOGGLE------------------------>
//PATCH auth/equipment/:id/pack
authRouter.patch("/equipment/:id/pack", requireUser, async (req, res, next) => {
    try {
        const {packed} = req.body;
        const packToggle = await prisma.equipment.update({
            where: {id:Number(req.params.id)},
            data: {packed: packed}
        });
        res.send(packToggle);
    } catch (error) {
        next(error);
    }
});
//<--------------------------EQUIPMENT NEED TOGGLE------------------------>
//PATCH auth/equipment/:id/need
authRouter.patch("/equipment/:id/need", requireUser, async (req, res, next) => {
    try {
        const {needed} = req.body;
        const needToggle = await prisma.equipment.update({
            where: {id: Number(req.params.id)},
            data: {needed: needed}
        });
        res.send(needToggle);
    } catch (error) {
        next(error);
    }
});

module.exports = authRouter;