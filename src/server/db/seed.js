const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const equipments = require("./equipment.js");

async function seed() {
    console.log("Seeding the database");
    await prisma.food.deleteMany();
    await prisma.meals.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.trip.deleteMany();
    await prisma.activities.deleteMany();
    await prisma.campgrounds.deleteMany();
    await prisma.clothing.deleteMany();
    await prisma.user.deleteMany();
    await prisma.equipment.deleteMany();

    try {
        //<------------------------EQUIPMENT----------------------------->
        for (let i = 0; i < equipments.equipment.length; i++) {
            await prisma.equipment.create({
                data: {
                    name: equipments.equipment[i],
                }
            })
        }
        //<--------------------------USERS------------------------------->
        const marisa = await prisma.user.create({
            data: {
                username: 'saphira',
                password: bcrypt.hashSync("Le@fe0n", SALT_COUNT),
                isAdmin: true,
            }
        })
        const ana = await prisma.user.create({
            data: {
                username: 'maya',
                password: bcrypt.hashSync("Um6reon!", SALT_COUNT)
            }
        })
        const aloisa = await prisma.user.create({
            data: {
                username: 'aloiivera',
                password: bcrypt.hashSync("Gl@ce0n", SALT_COUNT)
            }
        })
        //---------------------------CLOTHING---------------------------->
        const allUsers = ["saphira", "maya", "aloiivera"];
        for (let i = 0; i < allUsers.length; i++) {
            for (let j = 0; j < equipments.clothing.length; j++) {
                await prisma.clothing.create({
                    data: {
                        name: equipments.clothing[j],
                        user: {connect: {username: allUsers[i]}}
                    },
                    include: {user: true}
                })
            }
        }
        //--------------------------ACTIVITIES--------------------------->
        const kayak = await prisma.activities.create({
            data: {
                name: "kayaking"
            }
        })
        const hike = await prisma.activities.create({
            data: {
                name: "hiking"
            }
        })
        const cave = await prisma.activities.create({
            data: {
                name: "caves"
            }
        })
        const swim = await prisma.activities.create({
            data: {
                name: "swimming"
            }
        })
        const sulphur = await prisma.activities.create({
            data: {
                name: "Sulphur Works"
            }
        })
        const canoe = await prisma.activities.create({
            data: {
                name: "canoeing"
            }
        })
        const raft = await prisma.activities.create({
            data: {
                name: "rafting"
            }
        })
        //-------------------------CAMPGROUNDS--------------------------->
        const lassen = await prisma.campgrounds.create({
            data: {
                park: "Lassen Volcanic NP",
                price: 26,
                firewood: 15,
                distance: 5,
                curvy: "no",
                reserveFrame: 6,
                website: "https://www.nps.gov/lavo/planyourvisit/manzanita-lake-campground.htm",
                generalArea: "Northern Sierras",
                picture: "https://www.recreation.gov/camping/campgrounds/234039",
                activities: {connect: {
                    id: sulphur.id,
                    id: kayak.id,
                    id: hike.id,
                    id: swim.id
                }}
            },
            include: {activities: true}
        })
        const sequoiaKingsCanyon = await prisma.campgrounds.create({
            data: {
                park: "Sequoia & Kings Canyon NP",
                price: 32,
                firewood: 7,
                distance: 4.5,
                curvy: "at end",
                reserveFrame: 4,
                website: "https://cdn.recreation.gov/public/2018/09/17/13/37/234039_929e2ff8-9952-458e-8299-c76e692b3be8.jpg",
                generalArea: "Southern Sierras",
                picture: "https://cdn.recreation.gov/public/images/82369.jpg",
                activities: {connect: {
                    id: hike.id,
                }}
            },
            include: {activities: true}
        })
        const calaveras = await prisma.campgrounds.create({
            data: {
                park: "Calaveras Big Trees SP",
                price: 35,
                firewood: 9,
                distance: 3,
                curvy: "not bad",
                reserveFrame: 6,
                website: "https://www.parks.ca.gov/?page_id=551",
                generalArea: "Central Sierras",
                picture: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/4e/be/81/walk-between-two-halves.jpg?w=1200&h=-1&s=1",
                activities: {connect: {
                    id: hike.id,
                }}
            },
            include: {activities: true}
        })
        const castleCrags = await prisma.campgrounds.create({
            data: {
                park: "Castle Crags SP",
                price: 25,
                firewood: 8,
                distance: 5,
                curvy: "not bad",
                reserveFrame: 6,
                website: "https://www.parks.ca.gov/?page_id=454",
                generalArea: "Northern Coast Range",
                picture: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/e8/30/7e/castle-crags-state-park.jpg?w=1200&h=-1&s=1",
                activities: {connect: {
                    id: hike.id,
                    id: cave.id
                }}
            },
            include: {activities: true}
        })
        const plumasEureka = await prisma.campgrounds.create({
            data: {
                park: "Plumas-Eureka SP",
                price: 35,
                firewood: 7,
                distance: 4.5,
                curvy: "little",
                reserveFrame: 6,
                website: "https://www.parks.ca.gov/?page_id=507",
                generalArea: "Central Sierras",
                picture: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/58/b4/76/mining-equipment-near.jpg?w=1200&h=-1&s=1",
                activities: {connect: {
                    id: hike.id,
                }}
            },
            include: {activities: true}
        })
        const sugarPine = await prisma.campgrounds.create({
            data: {
                park: "Sugar Pine Point SP",
                price: 35,
                firewood: 9,
                distance: 4,
                curvy: "no",
                reserveFrame: 6,
                website: "https://www.parks.ca.gov/?page_id=510",
                generalArea: "Tahoe",
                picture: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/5e/29/c7/sugar-pine-state-park.jpg?w=1100&h=-1&s=1",
                activities: {connect: {
                    id: hike.id,
                    id: swim.id,
                    id: raft.id
                }}
            },
            include: {activities: true}
        })
        const fallenLeafLake = await prisma.campgrounds.create({
            data: {
                park: "Fallen Leaf Campground",
                price: 44,
                firewood: 8,
                distance: 4,
                curvy: "at end",
                reserveFrame: 6,
                website: "https://www.fs.usda.gov/recarea/ltbmu/recarea/?recid=11781",
                generalArea: "Tahoe",
                picture: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/7a/3c/2a/20180620-135448-largejpg.jpg?w=1000&h=-1&s=1",
                activities: {connect: {
                    id: hike.id,
                    id: swim.id,
                    id: raft.id
                }}
            },
            include: {activities: true}
        })
        const silverLake = await prisma.campgrounds.create({
            data: {
                park: "Silver Lake East",
                price: 28,
                firewood: 0,
                distance: 4,
                curvy: "at end",
                reserveFrame: 5,
                website: "https://www.recreation.gov/camping/campgrounds/232263?tab=info",
                generalArea: "Central Sierras",
                picture: "https://cdn.recreation.gov/public/images/64980.jpg",
                activities: {connect: {
                    id: hike.id,
                }}
            },
            include: {activities: true}
        })
        const yosemite = await prisma.campgrounds.create({
            data: {
                park: "Yosemite NP",
                price: 36,
                firewood: 13,
                distance: 4.5,
                curvy: "old priest grade, or 1-hour detour",
                reserveFrame: 5,
                website: "https://www.nps.gov/yose/planyourvisit/camping.htm",
                generalArea: "Central Sierras",
                picture: "https://cdn.recreation.gov/public/2021/04/14/00/55/2991_b79e9355-d662-4380-b51c-9c3f8b81ec24_700.jpeg",
                activities: {connect: {
                    id: hike.id,
                }}
            },
            include: {activities: true}
        })
        const koa = await prisma.campgrounds.create({
            data: {
                park: "Shingletown KOA",
                price: 38,
                firewood: 7,
                distance: 4.5,
                curvy: "no",
                reserveFrame: 6,
                website: "https://koa.com/campgrounds/mt-lassen/",
                generalArea: "Northern Sierras",
                picture: "https://koa.com/content/campgrounds/mt-lassen/photos/a2f84e91-701f-4d96-a6dd-c6daeca0946dphotoc1a84737-3e09-4b73-b482-b7afd7400ecc.JPG.axd?preset=campgroundphoto"
            }
        })       
        //-------------------------TRIP/BUDGET--------------------------->
        const y2022 = await prisma.trip.create({
            data: {
                startDate: new Date("June 10, 2022"),
                endDate: new Date("June 12, 2022"),
                campground: {connect: {id: lassen.id}},
                current: false,
                gasTotal: 180,
                gasSingle: 60,
                fireNight: 45,
                parking: 30,
            },
            include: {campground: true}
        })
        const y2023 = await prisma.trip.create({
            data: {
                startDate: new Date("June 9, 2023"),
                endDate: new Date("June 12, 2023"),
                campground: {connect: {id: koa.id}},
                current: false,
                gasTotal: 180,
                gasSingle: 60,
                fireNight: 16,
                parking: 0,
                budgets: {create: {
                    name: "kayaking",
                    total: 38,
                    individual: 12.67
                }},
            },
            include: {campground: true}
        })
        const y2024 = await prisma.trip.create({
            data: {
                startDate: new Date("June 28, 2024"),
                endDate: new Date("July 1, 2024"),
                campground: {connect: {id: castleCrags.id}},
                gasTotal: 180,
                gasSingle: 60,
                fireNight: 24,
                parking: 0,
                budgets: {create: {
                    name: "Shasta Caverns",
                    total: 131,
                    individual: 43.68
                }},
            },
            include: {campground: true}
        })
        //-----------------------------MEALS----------------------------->
        const breakfast = await prisma.meals.create({
            data: {
                course: "breakfast"
            }
        })
        const nachos = await prisma.meals.create({
            data: {
                day: 2,
                course: "dinner",
                name: "Campfire Nachos"
            }
        })
        //-----------------------------FOOD------------------------------>
        const sausage = await prisma.food.create({
            data: {
                name: "chicken apple sausage",
                purchased: true,
                cooler: true,
                meals: {connect: {id: breakfast.id}},
                user: {connect: {id: aloisa.id}}
            },
            include: {meals: true, user: true}
        })
        const tomatoes = await prisma.food.create({
            data: {
                name: "tomatoes",
                purchased: true,
                meals: {connect: {id: breakfast.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const fruit = await prisma.food.create({
            data: {
                name: "fruit",
                purchased: true,
                meals: {connect: {id: breakfast.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const oil = await prisma.food.create({
            data: {
                name: "veggie oil",
                purchased: true,
                cooler: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const chips = await prisma.food.create({
            data: {
                name: "tortilla chips",
                purchased: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const salsa = await prisma.food.create({
            data: {
                name: "hot sauce",
                purchased: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const cheese = await prisma.food.create({
            data: {
                name: "mexican cheese blend",
                purchased: true,
                cooler: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: ana.id}}
            },
            include: {meals: true, user: true}
        })
        const beans = await prisma.food.create({
            data: {
                name: "black beans",
                purchased: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const avocado = await prisma.food.create({
            data: {
                name: "avocado",
                purchased: true,
                cooler: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: aloisa.id}}
            },
            include: {meals: true, user: true}
        })
        const scallions = await prisma.food.create({
            data: {
                name: "green onions",
                purchased: true,
                cooler: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })
        const cilantro = await prisma.food.create({
            data: {
                name: "cilantro",
                purchased: true,
                cooler: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: ana.id}}
            },
            include: {meals: true, user: true}
        })
        const lime = await prisma.food.create({
            data: {
                name: "lime",
                purchased: true,
                meals: {connect: {id: nachos.id}},
                user: {connect: {id: marisa.id}}
            },
            include: {meals: true, user: true}
        })

        console.log("Database is seeded")
    } catch (error) {
        console.error(error)
    }
}

seed().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
})