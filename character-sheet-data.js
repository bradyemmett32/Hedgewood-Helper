// Character Sheet Reference Data
// Classes, Species, and Trades for Hedgewood TTRPG

const CLASSES = {
    "priest": {
        "name": "Priest",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Divine", "Healing", "Light"],
            "damageDie": "1d6",
            "healingDie": "1d10",
            "damageTypes": ["Holy"]
        },
        "bloodiedEffect": {
            "name": "Blood of the Martyr",
            "trigger": "When Bloodied for first time in encounter",
            "description": "Your faith strengthens in times of dire need.",
            "mechanics": "Gain advantage on all Willpower-based checks and saving throws until no longer Bloodied or reduced to 0 HP.",
            "duration": "Until no longer Bloodied or reduced to 0 HP"
        },
        "features": {
            "level1": "Divine Channel, Healing Touch",
            "level2": "Turn Undead"
        }
    },
    "occultist": {
        "name": "Occultist",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Arcane", "Illusion", "Divination"],
            "damageDie": "1d8",
            "healingDie": "1d6",
            "damageTypes": ["Psychic", "Force"]
        },
        "bloodiedEffect": {
            "name": "Desperate Ritual",
            "trigger": "When Bloodied",
            "description": "Pain fuels your dark magic.",
            "mechanics": "Your spell damage dice gain +2 to all rolls. Each spell cast while Bloodied costs 1 additional MP.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Arcane Study, Ritual Casting"
        }
    },
    "elementalist": {
        "name": "Elementalist",
        "hitDie": "d8",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Elemental", "Nature", "Weather"],
            "damageDie": "1d10",
            "healingDie": "1d6",
            "damageTypes": ["Fire", "Ice", "Lightning", "Acid"]
        },
        "bloodiedEffect": {
            "name": "Elemental Fury",
            "trigger": "When Bloodied",
            "description": "The elements respond to your pain.",
            "mechanics": "Choose one damage type. Your elemental spells of that type deal maximum damage instead of rolling until no longer Bloodied.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Elemental Affinity, Shapeshift Element"
        }
    },
    "warrior": {
        "name": "Warrior",
        "hitDie": "d12",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "bloodiedEffect": {
            "name": "Battle Rage",
            "trigger": "When Bloodied",
            "description": "Injury only makes you fight harder.",
            "mechanics": "Gain +2 to all melee attack rolls and damage. You cannot use the Dodge action while in Battle Rage.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Weapon Mastery, Second Wind"
        }
    },
    "ranger": {
        "name": "Ranger",
        "hitDie": "d10",
        "combatSkillBonus": "ranged",
        "hasSpellcasting": false,
        "bloodiedEffect": {
            "name": "Predator's Focus",
            "trigger": "When Bloodied",
            "description": "Desperation sharpens your aim.",
            "mechanics": "Your ranged attacks ignore half cover and three-quarters cover. You have advantage on ranged attacks against creatures within 30 feet.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Hunter's Mark, Favored Terrain"
        }
    },
    "rogue": {
        "name": "Rogue",
        "hitDie": "d8",
        "combatSkillBonus": "ranged",
        "hasSpellcasting": false,
        "bloodiedEffect": {
            "name": "Cornered Animal",
            "trigger": "When Bloodied",
            "description": "A wounded creature is most dangerous.",
            "mechanics": "You can take the Disengage or Hide action as a bonus action. Your Sneak attack damage increases by 1d6.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Sneak Attack, Expertise"
        }
    },
    "bard": {
        "name": "Bard",
        "hitDie": "d8",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Enchantment", "Illusion", "Sound"],
            "damageDie": "1d8",
            "healingDie": "1d8",
            "damageTypes": ["Psychic", "Thunder"]
        },
        "bloodiedEffect": {
            "name": "Swan Song",
            "trigger": "When Bloodied",
            "description": "Your performance becomes legendary in desperation.",
            "mechanics": "Your Bardic Inspiration die increases by one size (d6→d8, d8→d10, etc.). Allies within 30 feet gain +1 to all saving throws.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Bardic Inspiration, Jack of All Trades"
        }
    },
    "paladin": {
        "name": "Paladin",
        "hitDie": "d10",
        "combatSkillBonus": "melee",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Divine", "Protection", "Light"],
            "damageDie": "1d8",
            "healingDie": "1d8",
            "damageTypes": ["Holy", "Radiant"]
        },
        "bloodiedEffect": {
            "name": "Righteous Defiance",
            "trigger": "When Bloodied",
            "description": "Your divine oath sustains you.",
            "mechanics": "Gain resistance to all damage types. Your Lay on Hands healing pool increases by your level × 2.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Divine Smite, Lay on Hands"
        }
    },
    "druid": {
        "name": "Druid",
        "hitDie": "d8",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Nature", "Primal", "Beast"],
            "damageDie": "1d8",
            "healingDie": "1d10",
            "damageTypes": ["Poison", "Acid", "Piercing"]
        },
        "bloodiedEffect": {
            "name": "Primal Instinct",
            "trigger": "When Bloodied",
            "description": "Nature's raw power flows through you.",
            "mechanics": "You can Wild Shape as a bonus action. While Wild Shaped and Bloodied, your natural attacks deal an additional 1d6 damage.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Wild Shape, Natural Recovery"
        }
    },
    "monk": {
        "name": "Monk",
        "hitDie": "d8",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "bloodiedEffect": {
            "name": "Inner Flame",
            "trigger": "When Bloodied",
            "description": "Pain is but another illusion.",
            "mechanics": "Regain Ki points equal to your Wisdom modifier (minimum 1). Your unarmed strikes deal maximum damage instead of rolling.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Martial Arts, Ki Points"
        }
    },
    "barbarian": {
        "name": "Barbarian",
        "hitDie": "d12",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "bloodiedEffect": {
            "name": "Unstoppable Fury",
            "trigger": "When Bloodied",
            "description": "You refuse to fall.",
            "mechanics": "Gain temporary HP equal to twice your level. Your critical hit range increases (critical on 19-20 instead of 20).",
            "duration": "Until no longer Bloodied or reduced to 0 HP"
        },
        "features": {
            "level1": "Rage, Unarmored Defense"
        }
    },
    "artificer": {
        "name": "Artificer",
        "hitDie": "d8",
        "combatSkillBonus": "ranged",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Artifice", "Technology", "Construct"],
            "damageDie": "1d8",
            "healingDie": "1d6",
            "damageTypes": ["Fire", "Lightning", "Force"]
        },
        "bloodiedEffect": {
            "name": "Emergency Protocols",
            "trigger": "When Bloodied",
            "description": "Your inventions activate failsafe measures.",
            "mechanics": "Your artificer infusions gain +1 bonus. You can activate one infusion as a bonus action. Your constructed servant gains temporary HP equal to your level.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Magical Tinkering, Infuse Item"
        }
    },
    "warlock": {
        "name": "Warlock",
        "hitDie": "d8",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Eldritch", "Shadow", "Pact"],
            "damageDie": "1d10",
            "healingDie": "1d6",
            "damageTypes": ["Necrotic", "Force", "Psychic"]
        },
        "bloodiedEffect": {
            "name": "Dark Bargain",
            "trigger": "When Bloodied",
            "description": "Your patron demands payment in blood.",
            "mechanics": "Your Eldritch Blast gains one additional beam. Once per encounter while Bloodied, you can cast a spell without expending MP (costs 1d6 HP instead).",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Eldritch Blast, Pact Magic"
        }
    },
    "sorcerer": {
        "name": "Sorcerer",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Sorcery", "Wild Magic", "Bloodline"],
            "damageDie": "1d10",
            "healingDie": "1d6",
            "damageTypes": ["Fire", "Lightning", "Force", "Psychic"]
        },
        "bloodiedEffect": {
            "name": "Wild Surge",
            "trigger": "When Bloodied",
            "description": "Your raw magic becomes unstable.",
            "mechanics": "You can use Metamagic without spending sorcery points. All your spells deal +1d6 damage of the spell's type, but roll on Wild Magic table after each spell.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Metamagic, Sorcerous Origin"
        }
    },
    "cleric": {
        "name": "Cleric",
        "hitDie": "d8",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Divine", "Healing", "Protection"],
            "damageDie": "1d8",
            "healingDie": "1d10",
            "damageTypes": ["Radiant", "Necrotic"]
        },
        "bloodiedEffect": {
            "name": "Divine Intervention",
            "trigger": "When Bloodied",
            "description": "Your deity shields you in your hour of need.",
            "mechanics": "Gain +2 AC. Your Channel Divinity recharges immediately. Healing spells you cast heal for maximum amount.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Channel Divinity, Divine Domain"
        }
    },
    "wizard": {
        "name": "Wizard",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Arcane", "Evocation", "Transmutation"],
            "damageDie": "1d8",
            "healingDie": "1d6",
            "damageTypes": ["Fire", "Ice", "Lightning", "Force"]
        },
        "bloodiedEffect": {
            "name": "Arcane Desperation",
            "trigger": "When Bloodied",
            "description": "Fear unlocks forbidden knowledge.",
            "mechanics": "You can cast one spell you haven't prepared (must be in your spellbook). Your spell save DC increases by 2.",
            "duration": "Until no longer Bloodied"
        },
        "features": {
            "level1": "Spellbook, Arcane Recovery"
        }
    }
};

const SPECIES = {
    "mouse": {
        "name": "Mouse",
        "attributeBonuses": ["reflexes", "intellect"],
        "features": "Small size (Size ¼). Advantage on Sneak checks. Can fit through tiny spaces.",
        "startingEquipment": []
    },
    "rabbit": {
        "name": "Rabbit",
        "attributeBonuses": ["reflexes", "willpower"],
        "features": "Medium size (Size ½). Increased movement speed (+2 squares). Keen hearing.",
        "startingEquipment": []
    },
    "squirrel": {
        "name": "Squirrel",
        "attributeBonuses": ["reflexes", "intellect"],
        "features": "Small size (Size ¼). Climbing speed equal to walking speed. Can glide short distances.",
        "startingEquipment": []
    },
    "hedgehog": {
        "name": "Hedgehog",
        "attributeBonuses": ["toughness", "willpower"],
        "features": "Small size (Size ½). Natural armor (+1 AC). Defensive curl ability.",
        "startingEquipment": []
    },
    "fox": {
        "name": "Fox",
        "attributeBonuses": ["intellect", "willpower"],
        "features": "Medium size (Size 1). Advantage on Deceive checks. Keen senses.",
        "startingEquipment": []
    },
    "badger": {
        "name": "Badger",
        "attributeBonuses": ["toughness", "willpower"],
        "features": "Medium size (Size 1). Powerful build. Advantage on Endure checks.",
        "startingEquipment": []
    },
    "otter": {
        "name": "Otter",
        "attributeBonuses": ["reflexes", "toughness"],
        "features": "Medium size (Size 1). Swimming speed equal to walking speed. Hold breath for extended periods.",
        "startingEquipment": []
    },
    "mole": {
        "name": "Mole",
        "attributeBonuses": ["toughness", "intellect"],
        "features": "Small size (Size ½). Burrow speed. Tremor sense within 10 feet.",
        "startingEquipment": []
    },
    "deer": {
        "name": "Deer",
        "attributeBonuses": ["reflexes", "willpower"],
        "features": "Large size (Size 2). Increased movement speed (+3 squares). Graceful.",
        "startingEquipment": []
    },
    "raccoon": {
        "name": "Raccoon",
        "attributeBonuses": ["reflexes", "intellect"],
        "features": "Medium size (Size 1). Advantage on Craft checks. Nimble hands.",
        "startingEquipment": []
    },
    "owl": {
        "name": "Owl",
        "attributeBonuses": ["intellect", "willpower"],
        "features": "Medium size (Size 1). Flight. Superior darkvision.",
        "startingEquipment": []
    },
    "raven": {
        "name": "Raven",
        "attributeBonuses": ["intellect", "reflexes"],
        "features": "Small size (Size ½). Flight. Mimicry ability.",
        "startingEquipment": []
    },
    "bear": {
        "name": "Bear",
        "attributeBonuses": ["toughness", "toughness"],
        "features": "Large size (Size 3). Powerful build (+2 carrying capacity multiplier). Natural weapons.",
        "startingEquipment": []
    },
    "wolf": {
        "name": "Wolf",
        "attributeBonuses": ["toughness", "reflexes"],
        "features": "Medium size (Size 1). Pack tactics. Keen smell.",
        "startingEquipment": []
    },
    "cat": {
        "name": "Cat",
        "attributeBonuses": ["reflexes", "reflexes"],
        "features": "Small size (Size ½). Always land on feet. Advantage on Maneuver checks.",
        "startingEquipment": []
    }
};

const TRADES = {
    "blacksmith": {
        "name": "Blacksmith",
        "skillBonuses": ["craft", "endure"],
        "features": "Proficiency with smith's tools. Can repair metal equipment. +1 to AC when wearing crafted armor.",
        "startingEquipment": []
    },
    "herbalist": {
        "name": "Herbalist",
        "skillBonuses": ["study", "craft"],
        "features": "Proficiency with herbalism kit. Can identify plants and create potions. Advantage on foraging checks.",
        "startingEquipment": []
    },
    "scholar": {
        "name": "Scholar",
        "skillBonuses": ["study", "barter"],
        "features": "Proficiency in two languages. Can decipher ancient texts. Advantage on knowledge checks.",
        "startingEquipment": []
    },
    "merchant": {
        "name": "Merchant",
        "skillBonuses": ["barter", "deceive"],
        "features": "Advantage on Barter checks. Start with 50 extra shells. Can appraise items accurately.",
        "startingEquipment": []
    },
    "hunter": {
        "name": "Hunter",
        "skillBonuses": ["sneak", "endure"],
        "features": "Proficiency with bows and traps. Advantage on tracking. +2 damage with ranged weapons against beasts.",
        "startingEquipment": []
    },
    "farmer": {
        "name": "Farmer",
        "skillBonuses": ["endure", "craft"],
        "features": "Proficiency with farming tools. Advantage on animal handling. Can grow crops efficiently.",
        "startingEquipment": []
    },
    "guard": {
        "name": "Guard",
        "skillBonuses": ["maneuver", "endure"],
        "features": "Proficiency with shields and medium armor. Advantage on perception checks during watch. +1 AC.",
        "startingEquipment": []
    },
    "thief": {
        "name": "Thief",
        "skillBonuses": ["sneak", "deceive"],
        "features": "Proficiency with thieves' tools. Can pick locks and disable traps. Advantage on Sneak checks in urban environments.",
        "startingEquipment": []
    },
    "cook": {
        "name": "Cook",
        "skillBonuses": ["craft", "barter"],
        "features": "Proficiency with cook's utensils. Can create meals that provide temporary HP. Advantage on food preparation.",
        "startingEquipment": []
    },
    "entertainer": {
        "name": "Entertainer",
        "skillBonuses": ["deceive", "barter"],
        "features": "Proficiency with musical instrument. Can perform to earn money. Advantage on social interactions in taverns.",
        "startingEquipment": []
    },
    "sailor": {
        "name": "Sailor",
        "skillBonuses": ["maneuver", "endure"],
        "features": "Proficiency with navigator's tools and water vehicles. Advantage on swimming checks. Can read weather patterns.",
        "startingEquipment": []
    },
    "carpenter": {
        "name": "Carpenter",
        "skillBonuses": ["craft", "study"],
        "features": "Proficiency with carpenter's tools. Can build structures and furniture. Advantage on crafting wooden items.",
        "startingEquipment": []
    },
    "tailor": {
        "name": "Tailor",
        "skillBonuses": ["craft", "barter"],
        "features": "Proficiency with weaver's tools. Can repair and create clothing. Crafted clothing provides +1 to social checks.",
        "startingEquipment": []
    },
    "apothecary": {
        "name": "Apothecary",
        "skillBonuses": ["study", "craft"],
        "features": "Proficiency with alchemist's supplies. Can create basic medicines. Advantage on identifying poisons.",
        "startingEquipment": []
    },
    "messenger": {
        "name": "Messenger",
        "skillBonuses": ["maneuver", "endure"],
        "features": "Increased movement speed (+1 square). Advantage on navigation checks. Can memorize long messages.",
        "startingEquipment": []
    },
    "scribe": {
        "name": "Scribe",
        "skillBonuses": ["study", "deceive"],
        "features": "Proficiency with calligrapher's supplies. Can forge documents. Advantage on reading and writing checks.",
        "startingEquipment": []
    }
};

// XP thresholds for each level
const XP_THRESHOLDS = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000
};
