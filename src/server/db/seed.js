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
                        user: { connect: { username: allUsers[i] } }
                    },
                    include: { user: true }
                })
            }
        }
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
                picture: "https://cdn.recreation.gov/public/images/71691.jpg",
                activities: {
                    create: [
                        { name: "Sulphur Works" },
                        { name: "kayak" },
                        { name: "hike" },
                    ]
                }
            },
            include: { activities: true }
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
                activities: {
                    create: {
                        name: "hike"
                    }
                }
            },
            include: { activities: true }
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
                activities: {
                    create: {
                        name: "hike"
                    }
                }
            },
            include: { activities: true }
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
                activities: {
                    create: [
                        { name: "hike" },
                        { name: "Shasta Caverns" }
                    ]
                }
            },
            include: { activities: true }
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
                activities: {
                    create: {
                        name: "hike"
                    }
                }
            },
            include: { activities: true }
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
                activities: {
                    create: [
                        { name: "hike" },
                        { name: "raft" },
                        {name: "lake beach"}
                    ]
                }
            },
            include: { activities: true }
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
                activities: {
                    create: [
                        { name: "hike" },
                        { name: "raft" },
                        {name: "lake beach"}
                    ]
                }
            },
            include: { activities: true }
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
                activities: {
                    create: {
                        name: "hike"
                    }
                }
            },
            include: { activities: true }
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
                activities: {
                    create: [
                        {name: "hike"},
                        {name: "Spider Caves"}
                    ]
                }
            },
            include: { activities: true }
        })
        const bliss = await prisma.campgrounds.create({
            data: {
                park: "Bliss SP",
                price: 40,
                firewood: 10,
                distance: 4,
                curvy: "at end",
                reserveFrame: 6,
                website: "https://www.parks.ca.gov/?page_id=505",
                generalArea: "Tahoe",
                picture: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/8c/28/3f/dl-bliss-state-park.jpg?w=1000&h=-1&s=1",
                activities: {
                    create: [
                        { name: "hike" },
                        { name: "raft" },
                        {name: "lake beach"}
                    ]
                }
            },
            include: { activities: true }
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
                campground: { connect: { id: lassen.id } },
                current: false,
                gasTotal: 180,
                gasSingle: 60,
                fireNight: 45,
                parking: 30,
            },
            include: { campground: true }
        })
        const y2023 = await prisma.trip.create({
            data: {
                startDate: new Date("June 9, 2023"),
                endDate: new Date("June 12, 2023"),
                campground: { connect: { id: koa.id } },
                current: false,
                gasTotal: 180,
                gasSingle: 60,
                fireNight: 16,
                parking: 0,
                budgets: {
                    create: {
                        name: "kayaking",
                        total: 38,
                        individual: 12.67
                    }
                },
            },
            include: { campground: true }
        })
        const y2024 = await prisma.trip.create({
            data: {
                startDate: new Date("June 28, 2024"),
                endDate: new Date("July 1, 2024"),
                campground: { connect: { id: castleCrags.id } },
                gasTotal: 180,
                gasSingle: 60,
                fireNight: 24,
                parking: 0,
                budgets: {
                    create: {
                        name: "Shasta Caverns",
                        total: 131,
                        individual: 43.68
                    }
                },
            },
            include: { campground: true }
        })
        //-----------------------------MEALS----------------------------->
        const breakfast = await prisma.meals.create({
            data: {
                course: "breakfast",
                trips: {
                    connect: [
                        { id: y2022.id },
                        { id: y2023.id },
                        { id: y2024.id }
                    ]
                }
            }
        })
        const nachos = await prisma.meals.create({
            data: {
                course: "dinner",
                name: "Campfire Nachos",
                trips: {
                    connect: [
                        { id: y2022.id },
                        { id: y2023.id },
                        { id: y2024.id }
                    ]
                }
            }
        })
        const hotDogs = await prisma.meals.create({
            data: {
                course: "dinner",
                name: "hot dogs",
                trips: {
                    connect: [
                        { id: y2022.id },
                        { id: y2023.id },
                        { id: y2024.id }
                    ]
                }
            }
        })
        const sandwiches = await prisma.meals.create({
            data: {
                course: "lunch",
                trips: {
                    connect: [
                        { id: y2022.id },
                        { id: y2023.id },
                        { id: y2024.id }
                    ]
                }
            }
        })
        const pastaPrimavera = await prisma.meals.create({
            data: {
                course: "dinner",
                name: "Pasta Primavera",
                trips: { connect: { id: y2024.id } }
            }
        })
        const smores = await prisma.meals.create({
            data: {
                course: "dessert",
                trips: {
                    connect: [
                        { id: y2022.id },
                        { id: y2023.id },
                        { id: y2024.id }
                    ]
                }
            }
        })
        const musubi = await prisma.meals.create({
            data: {
                course: "lunch",
                trips: {
                    connect: [
                        { id: y2022.id },
                        { id: y2023.id },
                        { id: y2024.id }
                    ]
                }
            }
        })
        //-----------------------------FOOD------------------------------>
        const sausage = await prisma.food.create({
            data: {
                name: "chicken apple sausage",
                cooler: true,
                meals: { connect: { id: breakfast.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const tomatoes = await prisma.food.create({
            data: {
                name: "tomatoes",
                meals: { connect: [{ id: breakfast.id }, { id: pastaPrimavera.id }] },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const fruit = await prisma.food.create({
            data: {
                name: "fruit",
                meals: { connect: { id: breakfast.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const oil = await prisma.food.create({
            data: {
                name: "veggie oil",
                cooler: true,
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const chips = await prisma.food.create({
            data: {
                name: "tortilla chips",
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const salsa = await prisma.food.create({
            data: {
                name: "hot sauce",
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const cheese = await prisma.food.create({
            data: {
                name: "mexican cheese blend",
                cooler: true,
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const beans = await prisma.food.create({
            data: {
                name: "black beans",
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const avocado = await prisma.food.create({
            data: {
                name: "avocado",
                cooler: true,
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const scallions = await prisma.food.create({
            data: {
                name: "green onions",
                cooler: true,
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const cilantro = await prisma.food.create({
            data: {
                name: "cilantro",
                cooler: true,
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const lime = await prisma.food.create({
            data: {
                name: "lime",
                meals: { connect: { id: nachos.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const buns = await prisma.food.create({
            data: {
                name: "hot dog buns",
                meals: { connect: { id: hotDogs.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const dogs = await prisma.food.create({
            data: {
                name: "hot dogs",
                cooler: true,
                meals: { connect: { id: hotDogs.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const ketchup = await prisma.food.create({
            data: {
                name: "ketchup",
                cooler: true,
                meals: { connect: { id: hotDogs.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const mustard = await prisma.food.create({
            data: {
                name: "mustard",
                cooler: true,
                meals: { connect: { id: hotDogs.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const bread = await prisma.food.create({
            data: {
                name: "bread",
                meals: { connect: { id: sandwiches.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const peanutButter = await prisma.food.create({
            data: {
                name: "peanut butter",
                cooler: true,
                meals: { connect: { id: sandwiches.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const jam = await prisma.food.create({
            data: {
                name: "jam",
                meals: { connect: { id: sandwiches.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const zucchini = await prisma.food.create({
            data: {
                name: "zucchini",
                cooler: true,
                meals: { connect: { id: pastaPrimavera.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const summerSquash = await prisma.food.create({
            data: {
                name: "yellow summer squash",
                cooler: true,
                meals: { connect: { id: pastaPrimavera.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const garlic = await prisma.food.create({
            data: {
                name: "garlic",
                meals: { connect: { id: pastaPrimavera.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const pasta = await prisma.food.create({
            data: {
                name: "pasta",
                meals: { connect: { id: pastaPrimavera.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const salt = await prisma.food.create({
            data: {
                name: "salt",
                meals: { connect: [{ id: breakfast.id }, { id: pastaPrimavera.id }] },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const goatCheese = await prisma.food.create({
            data: {
                name: "goat cheese",
                cooler: true,
                meals: { connect: { id: hotDogs.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const lemonJuice = await prisma.food.create({
            data: {
                name: "lemon juice",
                cooler: true,
                meals: { connect: { id: pastaPrimavera.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const graham = await prisma.food.create({
            data: {
                name: "graham crackers",
                meals: { connect: { id: smores.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const marshmallows = await prisma.food.create({
            data: {
                name: "marshmallows",
                meals: { connect: { id: smores.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const chocolate = await prisma.food.create({
            data: {
                name: "chocolate",
                cooler: true,
                meals: { connect: { id: smores.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const gorp = await prisma.food.create({
            data: {
                name: "trail mix",
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const eggs = await prisma.food.create({
            data: {
                name: "hard-boiled eggs",
                cooler: true,
                meals: { connect: { id: breakfast.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const ramen = await prisma.food.create({
            data: {
                name: "ramen",
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const spam = await prisma.food.create({
            data: {
                name: "spam",
                meals: { connect: { id: musubi.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const oysterSauce = await prisma.food.create({
            data: {
                name: "oyster sauce",
                meals: { connect: { id: musubi.id } },
                user: { connect: { id: aloisa.id } }
            },
            include: { meals: true, user: true }
        })
        const monkfruit = await prisma.food.create({
            data: {
                name: "monkfruit",
                meals: { connect: { id: musubi.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const soySauce = await prisma.food.create({
            data: {
                name: "soy sauce",
                meals: { connect: { id: musubi.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const nori = await prisma.food.create({
            data: {
                name: "nori",
                meals: { connect: { id: musubi.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const rice = await prisma.food.create({
            data: {
                name: "sushi rice",
                meals: { connect: { id: musubi.id } },
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const tea = await prisma.food.create({
            data: {
                name: "tea",
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const water = await prisma.food.create({
            data: {
                name: "gallon of water",
                user: { connect: { id: ana.id } }
            },
            include: { meals: true, user: true }
        })
        const oatmeal = await prisma.food.create({
            data: {
                name: "oatmeal",
                meals: { connect: { id: breakfast.id } },
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
        })
        const biscuits = await prisma.food.create({
            data: {
                name: "biscuits or onigiri",
                user: { connect: { id: marisa.id } }
            },
            include: { meals: true, user: true }
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