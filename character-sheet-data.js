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
        "size": 0.5,
        "speed": 5,
        "origins": ["Commoner", "Courtier"],
        "languages": ["Common", "Smallfolk", "+1 Other"],
        "features": "Bravery: If Frightened and you use Recover Action, become immune to Frightened for remainder of encounter.\n\nScurry: Can move through space of any creature at least one size larger. Don't provoke Opportunity Attacks while moving through another creature's space. First time per turn, Speed increases by 1 for remainder of turn. Can spend one Momentum to take Charge, Dash, or Disengage Actions.\n\nHopeful: Once per session, when you roll Natural 1 on d20 and GM gains Doom point, you also gain one Momentum.",
        "startingEquipment": []
    },
    "chipmunk": {
        "name": "Chipmunk",
        "size": 0.5,
        "speed": 5,
        "origins": ["Townie", "Rural"],
        "languages": ["Common", "Smallfolk", "Forester"],
        "features": "Talented Climber: Speed not reduced while climbing. Have Advantage on Sneak and Maneuver checks while climbing.\n\nAdorable Performance: As Action, make yourself distractingly cute. Until start of next turn, any number of creatures of your choice within 2 Squares are either Charmed or Taunted by you as long as they can see you. Attacks against creatures Charmed or Taunted in this way have Advantage. Once a creature affected for two rounds (consecutive or nonconsecutive), immune until Full Rest.\n\nDeep Cheeks: Once per session as Action, reveal a useful item by pulling it from your mouth. Item must safely fit in your oversized gob and be something you could afford or logically found within last day. Can spend one Momentum to reveal second useful item.",
        "startingEquipment": []
    },
    "mole": {
        "name": "Mole",
        "size": 0.5,
        "speed": 5,
        "origins": ["Deep Mountain", "Underhill"],
        "languages": ["Common", "Smallfolk", "Mountaineer"],
        "features": "Compact Build: Count as Medium sized creature for carry capacity and weapons you can wield. HP maximum increased by 1 per level.\n\nDigging Claws: Can dig through loose sediments at normal Speed minus 1. Can dig through solid sediments at Speed of 1 even without tools. Claws deal 1d6 Stab or Slash damage. Can spend one Momentum when hitting to move creature up to 2 Squares into unoccupied space within 1 Square of you.\n\nTunnelvision: Can see easily in dark, cramped places. Ignore Disadvantage from darkness/dim light, not Blinded in darkness, Advantage on Attacks against creatures Blinded in darkness. Disadvantage on Attacks and Skill checks relying on sight while you or target in bright light.",
        "startingEquipment": []
    },
    "lesserBat": {
        "name": "Lesser Bat",
        "size": 0.5,
        "speed": 4,
        "origins": ["Cave", "Canopy"],
        "languages": ["Common", "Smallfolk", "Vermin"],
        "features": "Flight: Can fly on your turn, but cannot fly if wearing medium/heavy armor or holding shield. If you make Attack or Use Item, begin to fall. Don't provoke Opportunity Attacks while flying.\n\nEcholocation: Use echolocation to perceive surroundings within 6 Squares. Creatures treat your Intellect or Willpower Defense as 5 higher when trying to become Hidden. When taking Search Action or Study check, can focus on one creature/object in radius - cannot become Hidden from you until end of next turn unless leaves area. Cannot use while Deafened. Have Sound Damage Vulnerability 5. Can spend Momentum to extend range to 12 Squares until end of next turn.\n\nNight Denizen: Disadvantage on Attacks and Skill checks relying on sight while you or target in direct sunlight. Advantage on Study and Sneak checks at night and in total darkness.",
        "startingEquipment": []
    },
    "jerboa": {
        "name": "Jerboa",
        "size": 0.5,
        "speed": 7,
        "origins": ["Deserter", "Ambassador"],
        "languages": ["Common", "Smallfolk", "Dunish"],
        "features": "Desert Dweller: Have Fire Damage Reduction 5. Immune to effects of extreme heat.\n\nExpert Jumper: When you Jump on turn, increase horizontal Jump by 3 additional Squares and vertical Jump by 2 additional Squares. Can Jump off another creature at least one size larger than you. Can spend one Momentum to continue repeating Jump with same Minor Action as long as jump off different creature not jumped off this turn and don't exceed remaining movement.\n\nShort Hibernation: When taking Partial Rest, can enter deep sleep to recover one additional Hit Die (even with Fatigue level) and can spend one additional Hit Die to recover HP. When taking Full Rest and making Endure check to resist negative conditions, have Advantage.",
        "startingEquipment": []
    },
    "rabbit": {
        "name": "Rabbit",
        "size": 1,
        "speed": 7,
        "origins": ["Peasant", "Royalty"],
        "languages": ["Common", "Forester", "+1 Other"],
        "features": "Leporine Kick: Your Kicks deal 1d8 Strike damage and have Reach.\n\nExpert Jumper: When you Jump on turn, increase horizontal Jump by 2 additional Squares and vertical Jump by 1 additional Square.\n\nEvasive Hop: As Reaction when creature targets you with Attack, can Jump in any direction to evade, giving attacker Disadvantage. Can spend one Momentum to increase distance moved to 3 Squares, and if movement causes you to be out of reach/range of triggering Attack, Attack automatically misses.",
        "startingEquipment": []
    },
    "squirrel": {
        "name": "Squirrel",
        "size": 1,
        "speed": 7,
        "origins": ["Great Tree", "Ground"],
        "languages": ["Common", "Forester"],
        "features": "Talented Climber: Speed not reduced while climbing. Have Advantage on Sneak and Maneuver checks while climbing.\n\nFluffy Tail: Your large fluffy tail distracts enemies. When you Attack creature on turn, can use Reaction to swing tail and gain Advantage. When enemy Attacks you, can use Reaction to swing tail to give them Disadvantage. Can spend one Momentum to either give yourself Advantage twice or give enemy Attacking you Disadvantage twice.\n\nStrong Bite: Your Bites deal 1d6 Stab damage. Once per encounter when you hit with Bite Attack, can deal additional damage equal to twice your level.",
        "startingEquipment": []
    },
    "hedgehog": {
        "name": "Hedgehog",
        "size": 1,
        "speed": 5,
        "origins": ["Hermit", "Socalite"],
        "languages": ["Common", "Mountaineer"],
        "features": "Quilled: When creature misses you with Melee Attack targeting AC or Toughness/Reflexes Defense, deal 1d2 Stab damage to them (1d4 at 5th level, 1d6 at 9th level).\n\nDefense Curl: As Action, curl into defensive ball. While curled, speed is 3 and can only roll (speed becomes 6 on downward slope). AC and all Defenses (except Intellect) increase by 3. Cannot take Actions/Minor Actions/Reactions except uncurling (Action). Uncurl when reduced to 0 HP. When moving while using Defense Curl, can spend one Momentum to crash into creature, dealing Stab damage equal to one Quilled die per Square moved (max 6 dice).\n\nHedgehog Vitality: Have Poison Damage Reduction 5, cannot be Sickened by poisons, Toughness Defense increases by 5 against poisons.",
        "startingEquipment": []
    },
    "weasel": {
        "name": "Weasel",
        "size": 1,
        "speed": 6,
        "origins": ["Coastal", "Inland"],
        "languages": ["Common", "Vermin", "+1 Other"],
        "features": "Silver Tongue: Have Advantage on Deceive and Barter checks. Can speak to any intelligent creature that knows at least one language, even if you don't share one.\n\nSly Movement: After rolling Initiative, can use Reaction to move up to half your speed (rounded up). Can spend Momentum to take Action (two Momentum) and/or Minor Action (one Momentum) after rolling Initiative but before encounter begins.\n\nStrong Bite: Your Bites deal 1d6 Stab damage. Once per encounter when you hit with Bite Attack, can deal additional damage equal to twice your level.",
        "startingEquipment": []
    },
    "groundhog": {
        "name": "Groundhog",
        "size": 1,
        "speed": 6,
        "origins": ["Burrow", "City"],
        "languages": ["Common", "Prairietalk"],
        "features": "Burrower: Can dig through loose sediments at half your normal speed (rounded up).\n\nPotent Portents: When you finish Full Rest, roll d20 and save result as Portent. Whenever creature you can see other than yourself makes Attack or Skill check, can replace one d20 roll with your Portent. After using Portent, roll another d20 for new Portent. Can use this twice. Once out of uses, cannot use again until Full Rest. Any remaining Portents lost when finishing Full Rest if you roll new Portent. Uses increase to 3 at 5th level and 4 at 9th level. Can spend one Momentum when out of uses to gain another Portent immediately.\n\nDeny Fate: Once per session when player rolls Natural 1 on d20 roll, can prevent result from granting GM Doom point. You then gain additional use of Potent Portents feature, rolling d20 and saving as Portent until Full Rest.",
        "startingEquipment": []
    },
    "badger": {
        "name": "Badger",
        "size": 2,
        "speed": 6,
        "origins": ["Imperial", "Wanderer"],
        "languages": ["Common", "Bigfolk", "Mountaineer"],
        "features": "Tremendous Impact: When you score Critical Hit with Attack, damage you deal to one creature with that Attack increased by amount equal to twice your level.\n\nIntimidating: Have Advantage on Deceive and Barter checks against creatures smaller in size than you.\n\nInsurmountable: When creature would get Critical Hit against you, it becomes normal hit instead. Once used, cannot use again until finish Rest. After using but before becoming available again from Rest, can use again by spending one Momentum.",
        "startingEquipment": []
    },
    "hare": {
        "name": "Hare",
        "size": 2,
        "speed": 7,
        "origins": ["Nomad", "Settler"],
        "languages": ["Common", "Bigfolk", "Prairietalk"],
        "features": "Leporine Kick: Your Kicks deal 1d10 Strike damage and have Reach. When you hit creature your size or smaller with Leporine Kick Attack, can spend one Momentum to push them back 1 Square.\n\nExpert Jumper: When you Jump on turn, increase horizontal Jump by 3 additional Squares and vertical Jump by 2 additional Squares.\n\nBig-Ears: Have Advantage on Study checks using hearing. If succeed, can make out specific sounds (like conversations) up to quarter-mile away, or eighth-mile if muffled. Cannot use while Deafened. Have Sound Damage Vulnerability 5.",
        "startingEquipment": []
    },
    "otter": {
        "name": "Otter",
        "size": 2,
        "speed": 6,
        "origins": ["Lake", "River", "Sea"],
        "languages": ["Common", "Bigfolk", "Mariner"],
        "features": "Born Swimmer: Speed not reduced when swimming. Have Advantage on Sneak and Maneuver checks while swimming.\n\nSoothing Touch: As Minor Action, can touch another creature within 1 Square and cause them to regain HP equal to your level. Creature submerged in water regains twice as much. Once creature regained HP from this feature, cannot use again until finish Rest. Can spend one Momentum when using Soothing Touch to regain HP equal to your level (twice as much if submerged).\n\nSub Aquatic: Can hold breath for up to 10 minutes underwater. While underwater, have Advantage on Attacks against creatures that are neither Aquatic nor Subaquatic who are also underwater.",
        "startingEquipment": []
    },
    "fox": {
        "name": "Fox",
        "size": 2,
        "speed": 6,
        "origins": ["Arctic", "Forest", "Desert"],
        "languages": ["Common", "Bigfolk", "+1 Other"],
        "features": "Magickal Aptitude: Your MP maximum increased by 1, and increases by additional 1 every time you gain level.\n\nMystical Cunning: Increase Intellect and Willpower Defenses by 2 against spells and magick effects (increases to 3 at 5th level, 5 at 9th level). When targeted by spell or magickal effect and use Mystical Cunning, can spend one Momentum to gain Damage Reduction to one damage type that spell deals equal to your Mystical Cunning defense bonus until start of next turn.\n\nVulpine Sorcery: Choose one Magick Class: Minstrel, Priest, Sage, Magician, Elementalist, Occultist, Conjuror, or Esper. You can cast spells that Class knows using your MP.",
        "startingEquipment": []
    },
    "wildCat": {
        "name": "Wild Cat",
        "size": 2,
        "speed": 7,
        "origins": ["Domestic", "Wildling"],
        "languages": ["Common", "Bigfolk", "Feline"],
        "features": "Nine Lives: When reduced to 0 HP but not killed outright, may drop to 1 HP instead. Once used, cannot use again until finish Full Rest.\n\nRetractable Claws: Movement speed not reduced when climbing. Claws deal 2d4 Stab or Slash damage. When you hit creature with Retractable Claws Attack, can spend one Momentum to Grapple them as part of same Attack.\n\nPredatory Rush: Thanks to concentrated zoomies, can call upon burst of speed when pursuing prey. Double movement gained when you Dash, Charge, or Shift directly towards enemy. Can use once every encounter.\n\nFear of Water: Have Disadvantage on all Attacks and Checks while you or target is swimming or submerged in water. Movement reduced to 1 Square while swimming.",
        "startingEquipment": []
    }
};

const TRADES = {
    "alchemist": {
        "name": "Alchemist",
        "category": "Handicraft",
        "skillBonuses": ["craft"],
        "features": "Create alchemical solutions (acids, oils, poisons) using Trade Tools and Craft Skill.\n\nPartial Rest: Increase potency of one alchemical solution. If deals damage, adds damage equal to twice Craft Ranks. If requires Attack, Attack has Advantage. Must be used within 24 hours or goes inert.\n\nFull Rest: Create one basic acid, simple poison, or standard oil without cost. Must be used before making another.\n\nAt 7th level: Increase potency of solutions equal to Craft Ranks during Partial Rest. Produce one of each solution during Full Rest instead of only one.",
        "startingEquipment": []
    },
    "blacksmith": {
        "name": "Blacksmith",
        "category": "Support",
        "skillBonuses": ["craft"],
        "features": "Repair and improve metal equipment using Trade Tools and Craft Skill.\n\nAction: Inspect metal object within 1 Square to determine quality, material, and maker's mark. Advantage on Study checks related to crafting.\n\nPartial Rest: Repair any broken metal object with materials and tools.\n\nFull Rest: Improve nonmagickal metal weapon or armor with suitable fire/furnace and materials. Weapon gains +1 to Attack and damage. Armor no longer causes Disadvantage on Sneak and doesn't reduce Speed. Improvements last days equal to half your level (rounded up). Only one object can benefit at a time.\n\nAt 7th level: +1 AC while wearing metal armor. Metal weapons you wield gain +1 to Attack and damage.",
        "startingEquipment": []
    },
    "cook": {
        "name": "Cook",
        "category": "Support",
        "skillBonuses": ["craft"],
        "features": "Create meals and snacks using Trade Tools, Craft Skill, and Ingredients.\n\nAction: Identify if food/drink has been poisoned or tampered with.\n\nPartial Rest: Prepare delicious snack for 2 + Craft Ranks creatures. Each gains temporary HP equal to one roll of smallest Hit Die plus your level.\n\nFull Rest: Prepare nutritious meal for 4 + level creatures. Each increases Fortitude and Reflexes Defenses by 2, and can roll 1d4 in place of expending Hit Die at end of Encounter or when using Recover Action. Benefits last until next Rest.\n\nAt 7th level: Creatures with temporary HP from snacks gain +1 to Attacks. Creatures partaking meals gain +1 to Skill Checks until end of next Full Rest.",
        "startingEquipment": []
    },
    "doctor": {
        "name": "Doctor",
        "category": "Support",
        "skillBonuses": ["study", "craft"],
        "features": "Diagnose illness and injuries using Study Skill, treat them using Trade Tools and Craft Skill.\n\nAction: Give creature battlefield triage, allowing them to use Recover Action (doesn't count against their one per Encounter). Bonus to HP healed equal to Study Ranks. Once used on creature, cannot use on them again until they finish Rest.\n\nPartial Rest (1 hour): Prepare homeopathic remedy that suppresses disease or poison effects for 24 hours. Advantage on Study check to cure during that time (still need medicine/tools).\n\nFull Rest (2+ hours): Tend to creature's major injury (not missing limb/eye/horrific scar). Make Study check against injury to leave only Minor scar on success.\n\nAt 7th level: When creature within 1 Square recovers HP from Recover Action, that creature regains one of its smallest expended Hit Dice, which can be immediately expended for additional healing.",
        "startingEquipment": []
    },
    "entertainer": {
        "name": "Entertainer",
        "category": "Utility",
        "skillBonuses": ["deceive", "barter"],
        "features": "Use Deceive to tell tales and weave lyrics, Barter to earn money.\n\nAction: Begin distracting performance lasting up to one minute. Make Deceive check. Creatures of your choice that can see/hear you with Willpower Defense equal to or lower than result have Disadvantage on Attacks and Skill checks towards creatures other than you. Once used, cannot use again until Rest.\n\nHour-long performance: Make Barter check. Earn shells equal to half total skill check (rounded up). Once used, cannot benefit again in same town until week passes.\n\nFree food/lodging for yourself and one other at local tavern you perform at (if on good terms with owner).\n\nAt 7th level: Free food/lodging for entire party (up to 10 creatures). Attacks against distracted creatures have Advantage, and those creatures cannot use Channel Magick Action.",
        "startingEquipment": []
    },
    "fisher": {
        "name": "Fisher",
        "category": "Situational",
        "skillBonuses": ["endure"],
        "features": "Catch fish and aquatic crustaceans with fishing gear using Endure Skill.\n\nAction: Cast fishing rod at creature within 6 Squares and begin reeling them towards you. If unwilling, make Melee or Ranged Attack against Toughness. Subsequent Actions pull them 2 Squares towards you.\n\nPartial Rest (near water): Spend 1-8 hours fishing. Make one Endure check at end, gaining bonus equal to half hours spent fishing (rounded down). Result 10+: catch 10 rations of fish/seafood. Every 5 additional points: catch 5 more rations (max 20). Keeps for one week.\n\nFull Rest: Get accurate weather prediction for next 24 hours (temperature, wind, precipitation/storms).\n\nAt 7th level: When fishing check exceeds 20, can catch Wishing Fish instead. Cook into single ration or release for one of three wishes: Wealth (1d20 × 5 shells value), Health (restore companion to full health, remove curses/diseases/injuries), or Your Self (fish joins party for 24 hours, grows to Huge size, can carry two medium creatures or pull large boat, won't engage in combat).",
        "startingEquipment": []
    },
    "guard": {
        "name": "Guard",
        "category": "Utility",
        "skillBonuses": ["maneuver"],
        "features": "Advantage on Deceive and Barter checks towards regular townsfolk. Can wear medium armor and shields. Skilled with one weapon type of choice.\n\nWhile defending town from outside threat: +1 to all Attacks and Skill checks (must be within town).\n\nFree food/lodging for yourself and one other at local guard barracks (if on good terms).\n\nRequisition standard-issued equipment from guard barracks at half cost. Items can only be returned to same barracks for half refund, not sold to other vendors.\n\nAt 7th level: While within 12 miles of town or city, gain +1 to AC and Attribute Defenses.",
        "startingEquipment": []
    },
    "herbalogist": {
        "name": "Herbalogist",
        "category": "Handicraft",
        "skillBonuses": ["craft"],
        "features": "Create potions and curatives using Trade Tools, Craft Skill, and Ingredients.\n\nAction: Identify one herb or herbal ingredient within 2 Squares. Immediately know natural properties, medical uses, if poisonous, and how to craft with it.\n\nPartial Rest: Increase effectiveness of one healing potion or antitoxin. Healing potion recovers additional HP equal to Craft Ranks. Antitoxin makes creature immune to poisons and poison damage for one hour. Must be used within 24 hours or goes inert.\n\nFull Rest: Produce one weak healing potion or vial of antitoxin. Must be used before making another.\n\nAt 7th level: Intelligent Plant creatures have Disadvantage on Attacks against you. You have Advantage on Attacks against them. Immunity to any Poison damage they deal. They cannot make you Charmed or Frightened.",
        "startingEquipment": []
    },
    "inventor": {
        "name": "Inventor",
        "category": "Handicraft",
        "skillBonuses": ["craft"],
        "features": "Skilled with firearms and explosives. Repair and improve firearms, explosives and mechanical devices using Trade Tools and Craft Skill.\n\nAction: Inspect mechanical object within 1 Square to determine quality, material, and maker's mark. Advantage on Study checks related to crafting.\n\nPartial Rest: Increase effectiveness of one trap or explosive. Trap: increase duration by 1 turn OR damage by Craft Ranks. Explosive: increase radius by 1 Square OR damage by Craft Ranks. Must be used within 24 hours or goes inert.\n\nFull Rest: Produce small grenade, smoke bomb, or single-use leg trap (must be used before making another). OR improve nonmagickal firearm (+1 to Attack and damage, lasts days equal to half level rounded up, only one at a time).\n\nAt 7th level: Finish constructing toy soldier automaton (Small Mechanical). Appears as miniature mechanical version of you. Can wear light armor, shields, wield non-Heavy weapons. Can't be Charmed/Frightened. Immune to poison damage and Sickened. Obeys commands, takes turn after yours. Understands your languages but can't speak. All ability scores 10, speed 4, HP = 4 × your level. Adds Craft Ranks to Attacks, Skill checks, and weapon damage. If reduced to 0 HP, repair during Full Rest with 10 shells materials. If beyond recovery, build new one with one week of work (8 hours/day) and 100 shells materials.",
        "startingEquipment": []
    },
    "journalist": {
        "name": "Journalist",
        "category": "Utility",
        "skillBonuses": ["study"],
        "features": "Know two additional languages of choice. Advantage on Study checks to glean information from people conversing with or tell if they're lying.\n\nOver one minute: Create detailed accurate sketch of person, place, or object you've seen or another can accurately describe. While sketch on your person, know when subject is visible to you.\n\nWhile Resting in town (1-8 hours): Spend time reveling, gambling, or playing instrument in public. At end of Rest, make Study check to glean useful information about town. Gain bonus equal to hours spent carousing. Success may reveal potential job, recent rumor, or insidious secret. DM may ask what kind of info you prefer.\n\nAt 7th level: When you use Aim action, gain Advantage on all Attacks against that creature until end of current turn, or end of next turn if don't attack until then.",
        "startingEquipment": []
    },
    "knitster": {
        "name": "Knitster",
        "category": "Handicraft",
        "skillBonuses": ["craft"],
        "features": "Create knitted gifts and cloth or woven armor using Trade Tools and Craft Skill.\n\nAction: Inspect woven object or cloth object within 1 Square to determine quality, material, and maker's mark. Advantage on Study checks related to crafting.\n\nPartial Rest: Give handmade gift to one traveling companion. If accept: they gain bonus to each Attribute Defense while they can see you. If refuse: you gain bonus to Attack and Damage while you can see them. Bonus = half Craft Ranks (rounded up). Benefits last until next Rest or either reduced to 0 HP.\n\nFull Rest: Supply traveling companions with warm clothes. Any number of creatures of choice get warm clothes (hats, mittens, scarfs). While wearing (can fit over/under armor): Advantage on Endure checks against extreme cold, Ice Damage Reduction 5, cannot catch disease from extreme cold. Benefits last until finish another Full Rest.\n\nAt 7th level: Gain +1 to attack and damage rolls with weapons dealing Stab damage.",
        "startingEquipment": []
    },
    "leatherweaver": {
        "name": "Leatherweaver",
        "category": "Support",
        "skillBonuses": ["craft"],
        "features": "Repair and improve leather/hide equipment using Trade Tools and Craft Skill, as well as ranged weapons other than firearms.\n\nAction: Inspect leather/hide object within 1 Square to determine quality, material, and maker's mark. Advantage on Study checks related to crafting.\n\nPartial Rest (1 hour): Repair broken leather/hide object or ranged weapon (not firearm) with materials and tools.\n\nFull Rest: Improve nonmagickal ranged weapon (not firearm) or leather/hide armor. Ranged weapon: +1 to Attack and damage. Armor: no longer causes Disadvantage on Sneak, grants wearer +1 Speed and Sneak checks. Improvements last days equal to half level (rounded up). Only one object at a time.\n\nAt 7th level: +2 to Attacks using ranged weapons (not firearms). While not wearing metal armor or holding metal shield, Speed increases by 2 (10 feet).",
        "startingEquipment": []
    },
    "merchant": {
        "name": "Merchant",
        "category": "Utility",
        "skillBonuses": ["barter"],
        "features": "Action: Inspect art object or valuable within 1 Square to determine quality, material, and value in shells. If has maker's mark, find that and have Advantage on Study checks related to crafting.\n\nWhen selling items in town: Make Barter check contested by shopkeeper's Intellect or Willpower Defense (their choice). On success, sell up to twice your Barter Ranks items to shopkeeper at full price (if acceptable condition). Once used, cannot benefit again at that shop until week passes.\n\nAt 7th level: While carrying valuables worth more than 200 shells, gain +1 to all Attacks and Skill checks (instinctively wish to protect valuables).",
        "startingEquipment": []
    },
    "rancher": {
        "name": "Rancher",
        "category": "Situational",
        "skillBonuses": [],
        "features": "Action: Inspect domesticated creature and get general understanding of current mood and health. If suffering diseases, know which and have Advantage on Study checks to determine remedy.\n\nPartial Rest: Form platonic bond with one willing friendly creature who can see you. While within 4 Squares of each other: both gain +1 AC, both have Advantage on Attacks against creatures within 1 Square of each other. Benefits last until next Rest or either reduced to 0 HP.\n\nFull Rest (along road or in Plains, not in town/city): Party travels at double normal pace for next 8 hours. You gain 1 Momentum (only spendable by you, lost at next Full Rest).\n\nAt 7th level: While within 4 Squares of bonded creature, both gain +1 to each Attribute Defense. When either hit with Attack, other can use Reaction to make single attack against attacking creature.",
        "startingEquipment": []
    },
    "stonemason": {
        "name": "Stonemason",
        "category": "Situational",
        "skillBonuses": ["study"],
        "features": "When you hit stone object (big rock) with Attack using Hammer, Warpick, or pickaxe, roll one additional damage die and add to damage dealt.\n\nWhen making Study check related to origin of stonework: Advantage on check and gain temporary bonus equal to half your level (rounded up).\n\nWhile traveling underground: Advantage on Endure and Study checks to notice structural weakness in ground, walls, or ceiling.\n\nAt 7th level: When you hit creature with Hammer, Warpick, or pickaxe, can turn standard hit into Critical Hit if creature is made of rock, crystal, or metal. Once used to get Critical Hit on a creature, cannot use on that creature again until finish Rest.",
        "startingEquipment": []
    },
    "woodcutter": {
        "name": "Woodcutter",
        "category": "Situational",
        "skillBonuses": ["endure"],
        "features": "When you hit wooden object (tree or wooden door) with Attack using Axe, deal additional damage equal to Endure Ranks.\n\nWhile traveling through Forest environment: Advantage on Study, Maneuver, or Endure checks related to environment. When foraging for food, find twice as much as normally would.\n\nWhen taking Rest in Forest: Always find enough wood to create large campfire. Large campfire sheds bright light in 6 Square (30-foot) radius and dim light for additional 6 Squares. Creatures within bright light have Ice Damage Reduction 10 and are immune to extreme cold effects.\n\nAt 7th level: When you hit Intelligent Plant creature with Axe, that creature has Slash Damage Vulnerability 5 until end of current turn (including for triggering attack). Once used, cannot use again until finish Rest.",
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
