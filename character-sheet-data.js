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
