// Foraging data for Redwood Highlands
const foragingData = {
    plants: [
        {
            name: "Redwood tips",
            description: "Bright green tips of new growth on a redwood that are edible and have a tart, evergreen-like flavor.",
            effects: {
                alchemist: "flammable oil",
                cook: "resist Fatigue x1",
                herbalogist: "mana potion"
            }
        },
        {
            name: "Wood sorrel (Oxalis)",
            description: "Resembling clover, wood sorrel is a common edible plant in redwood forests.",
            effects: {
                alchemist: "sickening poison",
                cook: "+1 Speed",
                herbalogist: "antidote"
            }
        },
        {
            name: "Blue Huckleberries",
            description: "Sweet and tart and enjoyed fresh, though some people find them to have a slightly mealy texture.",
            effects: {
                alchemist: "slippery oil",
                cook: "temporary HP",
                herbalogist: "health potion"
            }
        },
        {
            name: "Salmonberries",
            description: "Ripe salmonberries are tart but sweet, with yellow varieties being sweeter and redder ones being more tart.",
            effects: {
                alchemist: "damaging poison",
                cook: "temporary HP",
                herbalogist: "poison damage reduction 5"
            }
        },
        {
            name: "Miner's lettuce",
            description: "Mild, slightly sweet, and earthy, similar to spinach or butter lettuce, with a pleasant crunch and succulent, juicy leaves.",
            effects: {
                alchemist: "flammable oil",
                cook: "AC bonus (+1)",
                herbalogist: "poison damage reduction 5"
            }
        },
        {
            name: "Wild dandelion",
            description: "Petals are edible with a mild, honey-like sweetness, while the roots are earthy and can be roasted for a coffee-like flavor.",
            effects: {
                alchemist: "slippery oil",
                cook: "resist Fatigue x1",
                herbalogist: "health potion"
            }
        }
    ],
    mushrooms: [
        {
            name: "Golden chanterelle",
            description: "Mildly peppery and fruity, with distinctive notes of apricot, and a savory, earthy, and woodsy flavor profile.",
            effects: {
                alchemist: "damaging poison",
                cook: "temporary HP",
                herbalogist: "mana potion"
            }
        },
        {
            name: "King bolete",
            description: "Rich, complex flavor that is often described as earthy and nutty.",
            effects: {
                alchemist: "damaging poison",
                cook: "temporary HP",
                herbalogist: "health potion"
            }
        },
        {
            name: "Hedgehog mushroom",
            description: "Mild, slightly sweet, and nutty flavor with a firm, crunchy texture.",
            effects: {
                alchemist: "sickening poison",
                cook: "AC bonus (+1)",
                herbalogist: "poison damage reduction 5"
            }
        },
        {
            name: "Oyster mushroom",
            description: "Delicate, slightly savory flavor with hints of anise and a subtle sweetness.",
            effects: {
                alchemist: "slippery oil",
                cook: "AC bonus (+1)",
                herbalogist: "health potion"
            }
        },
        {
            name: "Candy cap",
            description: "Distinct flavor reminiscent of maple syrup, butterscotch, or brown sugar, though the aroma is more potent than the taste.",
            effects: {
                alchemist: "flammable oil",
                cook: "+1 Speed",
                herbalogist: "mana potion"
            }
        },
        {
            name: "Saffron milk cap",
            description: "Rich, nutty, and earthy flavor with hints of woodiness and a subtle sweetness.",
            effects: {
                alchemist: "slippery oil",
                cook: "temporary HP",
                herbalogist: "mana potion"
            }
        },
        {
            name: "Lion's mane",
            description: "Mildly sweet, savory, and slightly nutty flavor, often described as similar to seafood, particularly crab or lobster.",
            effects: {
                alchemist: "slippery oil",
                cook: "resist Fatigue x1",
                herbalogist: "antidote"
            }
        },
        {
            name: "Blushing morel",
            description: "Rich, nutty, and earthy flavor with a tender, meaty texture.",
            effects: {
                alchemist: "flammable oil",
                cook: "temporary HP",
                herbalogist: "antidote"
            }
        },
        {
            name: "Shaggy mane",
            description: "Mild and delicate mushroom flavor, often described as pleasant, meaty, and sometimes slightly bitter, with an earthy taste.",
            effects: {
                alchemist: "flammable oil",
                cook: "AC bonus (+1)",
                herbalogist: "mana potion"
            }
        },
        {
            name: "Turkey tail",
            description: "Mild, earthy flavor and a tough, leathery texture that makes them unpalatable on their own.",
            effects: {
                alchemist: "sickening poison",
                cook: "+1 Speed",
                herbalogist: "health potion"
            }
        }
    ]
};

// Security: Freeze data structure for immutability
(function freezeForagingData() {
    // Deep freeze helper
    function deepFreeze(obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(prop => {
            if (obj[prop] !== null
                && (typeof obj[prop] === "object" || typeof obj[prop] === "function")
                && !Object.isFrozen(obj[prop])) {
                deepFreeze(obj[prop]);
            }
        });
        return obj;
    }

    deepFreeze(foragingData);
})();
