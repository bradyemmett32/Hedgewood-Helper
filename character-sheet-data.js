// Character Sheet Reference Data
// Classes, Species, and Trades for Hedgewood TTRPG

const CLASSES = {
    "knight": {
        "name": "Knight",
        "category": "Martial Enabler",
        "hitDie": "d10",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "weaponTraining": ["Four types of Melee", "One type of Ranged or Spellcraft"],
        "armorTraining": ["Light", "Medium", "Heavy", "Shields"],
        "bloodiedEffect": {
            "name": "For Glory!",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Gain temporary HP equal to your level, plus additional temporary HP equal to number of friendly creatures (max 5). At start of each turn while Bloodied, can make one creature that can see/hear you Taunted until end of their next turn.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Visibly Dangerous (taunt enemies on initiative), Protect (reaction to increase ally AC by Melee Ranks)",
            "level2": "Challenge (action to taunt creature), Steadfast (bonus to Toughness Defense, reduce forced movement in Heavy Armor)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Knightly Arts (bonus to Maneuver/Craft), Vigilant Until Death (can't be Surprised, Advantage on Initiative)",
            "level4": "Armor Training (+1 AC in Heavy Armor, reduced speed penalty), Goading Attack (taunt on hit)",
            "level5": "Attribute Increase/Distinction, Iron Skin (take 1 less damage in Heavy Armor)",
            "level6": "Additional Action (4 total), Castling Maneuver (reaction to swap with ally being attacked)",
            "level7": "Attribute Increase/Distinction, Mass Challenge (challenge multiple creatures)",
            "level8": "Phalanx Stance (grant AC/Reflexes to nearby allies), Turn the Blade (reflect damage)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Steel Will (immunity to Charm/Frighten/Taunt)",
            "level10": "Master of Metal (+2 AC, -2 damage, no speed penalty), Living Fortress (+10 HP max, temp HP + bonus damage)"
        }
    },
    "berserker": {
        "name": "Berserker",
        "category": "Martial Exploiter",
        "hitDie": "d12",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "weaponTraining": ["Four types of Melee", "One type of Ranged or Spellcraft"],
        "armorTraining": ["Light", "Medium", "Shields"],
        "bloodiedEffect": {
            "name": "Bloodlust",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Speed increases by 1 Square. Once per turn can expend Hit Die when damaging creature with Attack to add die to damage.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Barbaric Instinct (bonus to Reflexes, Shift on hit), Berserking (increase Toughness, gain Damage Reduction)",
            "level2": "Reckless Assault (bonus to attack/defense trade-off), Intimidating Shout (frighten creature)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Survivor (bonus to Maneuver/Endure), Running Tackle (grapple + damage on Charge)",
            "level4": "Aggression (+2 Speed, improved Charge), Savage Swing (secondary Toughness target for Daze)",
            "level5": "Attribute Increase/Distinction, Heavy Handed (Heavy Attack as one Action)",
            "level6": "Additional Action (4 total), Adrenaline Rush (crit/kill grants movement + Action)",
            "level7": "Attribute Increase/Distinction, Frightening Glare (auto-frighten on being hit)",
            "level8": "Menacing Attacker (Advantage vs Frightened), Resilient Anger (extra Damage Reduction types)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Focusing Temper (Charm/Frighten immunity while Berserking)",
            "level10": "Absolutely Barbaric (extra crit damage + temp HP), Too Angry to Die (don't fall unconscious at 0 HP)"
        }
    },
    "duelist": {
        "name": "Duelist",
        "category": "Martial Exploiter",
        "hitDie": "d8",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "weaponTraining": ["Four types of Melee", "One type of Ranged or Spellcraft"],
        "armorTraining": ["Light", "Medium", "Shields"],
        "bloodiedEffect": {
            "name": "The Match",
            "trigger": "While Bloodied",
            "description": "Gain special Match Reaction. When Parry prevents hit, regain Match Reaction to immediately Riposte. When Match Reaction Attack is crit/kill, regain Match Reaction.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Reactive Fighting (two Reactions per round), Parry (reaction +2 AC), Riposte (reaction attack on miss)",
            "level2": "En Garde (provoke creature to attack), Lunging Attack (extended reach + damage on Charge)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Swagger (bonus to Maneuver/Barter), Fleurish (expend Reaction for Minor Action)",
            "level4": "Retreating Strike (Shift after Attack), Painful Mercy (end condition for damage)",
            "level5": "Attribute Increase/Distinction, Unflinching (can react while Dazed)",
            "level6": "Additional Action (4 total), Retaliation (reaction attack when hit)",
            "level7": "Attribute Increase/Distinction, Evasiveness (Disadvantage on Opportunity Attacks, Reflexes bonus)",
            "level8": "Cruel Counterer (Immobilize/Slow on reaction hit), Evolving Defense (Disadvantage if already hit this turn)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, The Greatest Offense (Parry +4, affects Reflexes/Intellect)",
            "level10": "Legendary Panache (regain Reaction when attacked), Master of Duels (Advantage on reaction Attacks, temp HP on kill)"
        }
    },
    "brawler": {
        "name": "Brawler",
        "category": "Martial Enabler",
        "hitDie": "d10",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "weaponTraining": ["Two types of Melee", "One type of Ranged or Spellcraft"],
        "armorTraining": ["Light", "Medium"],
        "bloodiedEffect": {
            "name": "Instinct Activation",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Increase AC by Reflexes or Toughness modifier (whichever higher). Advantage on Unarmed Strike Attacks.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Brawling (trade Actions for Minor Actions, use Toughness/Reflexes for Unarmed), Quick Footwork (+2 Speed, +2 AC/Reflexes unarmored)",
            "level2": "Flowing Strikes (gain Flow on hit, max 5), Rushing River (spend Flow to Charge/Dash as Minor), Butterfly Float (spend Flow to Dodge as Reaction)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Meditation (bonus to Endure/Study), Gut Punch (spend Flow to Sicken)",
            "level4": "Blitz (spend Flow for speed/Advantage), Fighting Focus (Flow on initiative/miss), Sweep the Leg (spend Flow to knock Prone)",
            "level5": "Attribute Increase/Distinction, Haymaker (spend Flow to Daze), Invigorate (spend Flow for temp HP)",
            "level6": "Additional Action (4 total), Dirty Fighting (spend Flow to Blind), Go for the Throat (spend Flow to Silence)",
            "level7": "Attribute Increase/Distinction, Stream of Power (gain Flow each turn), Roundhouse Kick (spend Flow to Stagger)",
            "level8": "Rapid Recovery (spend Flow to Recover as Minor), State of Flow (ignore DR at 3+, Disadvantage vs you at 5)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Striking River (extra damage when spending Flow)",
            "level10": "Armor of Self (+5 AC/Defenses unarmored), Tranquil Sea (regain HP when gaining Flow)"
        }
    },
    "thief": {
        "name": "Thief",
        "category": "Martial Exploiter",
        "hitDie": "d8",
        "combatSkillBonus": "ranged",
        "hasSpellcasting": false,
        "weaponTraining": ["Two types of Melee", "Two types of Ranged", "One Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Grace Under Pressure",
            "trigger": "While Bloodied",
            "description": "Gain bonus to all Skill checks equal to half your level.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Pickpocket (steal/plant items), Extra Skilled (bonus to one General Skill)",
            "level2": "Expert Climber (no speed reduction climbing), Tumble (Dash/Disengage as Minor)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Night Eyes (ignore darkness Disadvantage), Disarming Attack (knock object from hands)",
            "level4": "Disappear (Hide as Minor Action), Flanking (Advantage with ally nearby)",
            "level5": "Attribute Increase/Distinction, Turnabout (use stolen object/weapon immediately), Extra Skilled (second skill)",
            "level6": "Additional Action (4 total), Close Call (reaction to halve damage)",
            "level7": "Attribute Increase/Distinction, Double Trouble (two turns first round)",
            "level8": "Hard to Hit (Disadvantage on attacks vs you, Shift on miss), Copycat (copy non-magickal features)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Slink (stay Hidden while moving), Sleuth (higher Defense vs Hidden), Extra Skilled (third skill)",
            "level10": "Master Thief (Disadvantage/Slow on Pickpocket), Ready for Anything (no Surprise, choose Initiative attribute)"
        }
    },
    "hunter": {
        "name": "Hunter",
        "category": "Martial Exploiter",
        "hitDie": "d8",
        "combatSkillBonus": "ranged",
        "hasSpellcasting": false,
        "weaponTraining": ["Two types of Melee", "Three types of Ranged", "One Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Bloody Tracker",
            "trigger": "While Bloodied",
            "description": "Advantage on tracking/searching for creatures. Advantage on Attacks against Bloodied creatures.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Favored Prey (choose creature type for bonuses), Harrying Mark (mark target for extra damage)",
            "level2": "Steadied Aim (sacrifice movement for Advantage), Hunting Fever (high mark roll grants Advantage)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Knowledgeable Hunter (bonus vs Favored Prey), Retreating Shot (Shift + Ranged Attack)",
            "level4": "Preemptive Shot (reaction attack on enter/exit range), Terrain Specialist (ignore difficult/hazardous terrain), Additional Favored Prey",
            "level5": "Attribute Increase/Distinction, Point Blank (Heavy Attacks at close range)",
            "level6": "Additional Action (4 total), High Ground (Advantage from elevation), Prey Slayer (Advantage + damage vs Favored Prey)",
            "level7": "Attribute Increase/Distinction, Long Shot (double range attack), Additional Favored Prey",
            "level8": "Barrage (attack multiple targets in area), Focused Precision (ignore partial cover)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Deadly Mark (Advantage + extra die on marked target)",
            "level10": "Living Arsenal (double ammo, extra attacks), Ultimate Predator (+2 Speed, Dash/Charge toward Favored Prey), Additional Favored Prey"
        }
    },
    "assassin": {
        "name": "Assassin",
        "category": "Martial Exploiter",
        "hitDie": "d8",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "weaponTraining": ["Three types of Melee", "Two types of Ranged", "One Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Blood for Blood",
            "trigger": "While Bloodied",
            "description": "Advantage on Attacks against creatures at full HP or with temp HP.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Hidden Weapons (hide weapons on person), Twist the Knife (bonus damage based on Advantage dice)",
            "level2": "Assassin's Knack (Advantage on Initiative, Poison Reduction), Seize the Moment (Advantage with hidden weapon)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Second Identity (disguise benefits), Hamstring (Slow instead of damage)",
            "level4": "Assassinate (Advantage vs creatures pre-turn), The Reveal (reveal identity for Advantage)",
            "level5": "Attribute Increase/Distinction, Lacerate (create Wounds instead of damage)",
            "level6": "Additional Action (4 total), Element of Surprise (double Advantage from features)",
            "level7": "Attribute Increase/Distinction, Crippling Strike (Immobilize instead of Slow)",
            "level8": "Potent Poisons (double duration, ignore DR), Sudden Death (fake death as Reaction)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Terrible Wounds (prevent HP recovery)",
            "level10": "Executioner (regain HP on Twist the Knife kill), Master of Cloak and Dagger (single d20 hit = 5 Advantage)"
        }
    },
    "tactician": {
        "name": "Tactician",
        "category": "Martial Enabler",
        "hitDie": "d10",
        "combatSkillBonus": "melee",
        "hasSpellcasting": false,
        "weaponTraining": ["Three types of Melee", "Two types of Ranged", "One Spellcraft"],
        "armorTraining": ["Light", "Medium", "Heavy", "Shields"],
        "bloodiedEffect": {
            "name": "Warrior's Resolve",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Regain one expended Hit Die. If all Hit Dice available, gain temporary Hit Die.",
            "duration": "Instant"
        },
        "features": {
            "level1": "Rally (grant temp HP to ally), Tactical Assist (Reaction to grant Advantage, extended Help)",
            "level2": "Weight of Leadership (expend Hit Die for attack/damage bonus), Inspiring Speech (grant temp HP after Rest)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Tactical Wit (bonus to Study/Barter), Replenish Stamina (regain Hit Die after combat)",
            "level4": "Shoving Attack (secondary Toughness for push/prone), Commanding Strike (ally attacks/moves on your hit)",
            "level5": "Attribute Increase/Distinction, Positive Influence (+2 Defenses to nearby allies)",
            "level6": "Additional Action (4 total), Motivate (grant ally extra Action)",
            "level7": "Attribute Increase/Distinction, Battle Cry (allies gain speed/temp HP/Advantage, enemies Disadvantage)",
            "level8": "Awaken the Fallen (Rally + Hit Die, can target 0 HP allies), Charismatic Presence (extended aura, bonuses with temp HP)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Worthy Cause (temp HP + reaction attack when ally drops)",
            "level10": "Commander's Empathy (gain half temp HP others gain), Selfless Leader (Hit Die grants Advantage to ally)"
        }
    },
    "minstrel": {
        "name": "Minstrel",
        "category": "Magickal Enabler",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Music", "Sound", "Fortune"],
            "damageDie": "1d8",
            "healingDie": "1d8",
            "damageTypes": ["Sound"]
        },
        "weaponTraining": ["Two types of Melee", "Two types of Ranged", "Two types of Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "The Show Must Go On",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Grant yourself Fortune (doesn't count vs limit). While Bloodied, creatures with Fortune can expend it to reduce damage.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Tune (perfect pitch, play any instrument), Fortune (grant d6 to ally), Spellcasting (Willpower), Magick Recovery",
            "level2": "Misfortune (impose d6 penalty), Versatile Skill (raise General Skill rank)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Storied Adventurer (bonus to Barter/Deceive), Fast Tempo (speed + no Opportunity Attacks after spell)",
            "level4": "Dueling Fates (multiple Fortune/Misfortune), Defense Melody (Channel Magick increases Defenses), Versatile Skill",
            "level5": "Attribute Increase/Distinction, Harmonic Spellcrafting (expend Fortune/Misfortune for spell boost)",
            "level6": "Additional Action (4 total), Experienced Talespinner (d8 dice, can expend others' Fortune/Misfortune), Versatile Skill",
            "level7": "Attribute Increase/Distinction, Spell Interruption (reaction to counter spells)",
            "level8": "Echo of Magick (copy witnessed spells), Power Discord (damage when expending Misfortune), Versatile Skill",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Encore (cast duplicate spell)",
            "level10": "Grand Finale (musical solo after spell for temp HP/damage), Master Muse (d10 dice, regain MP on Initiative), Versatile Skill"
        }
    },
    "elementalist": {
        "name": "Elementalist",
        "category": "Magickal Exploiter",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Fire", "Ice", "Lightning"],
            "damageDie": "1d12",
            "healingDie": "1d4",
            "damageTypes": ["Fire", "Ice", "Lightning"]
        },
        "weaponTraining": ["Two types of Melee", "One type of Ranged", "Three types of Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Elements Unleashed",
            "trigger": "At start of each turn while Bloodied",
            "description": "Create one Bright Wisp matching current element. Can expend for 2d12 damage instead of 1d12. Only one Bright Wisp at a time.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Flicker (minor elemental effects), Elemental Wisp (create wisps for bonus damage), Spellcasting (Intellect), Magick Recovery",
            "level2": "Elementary Connection (choose element for DR + ignore DR), Magickal Ward (HP shield)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Sorcerous Academia (bonus to Study/Craft), Spell Fusion (extra damage if different element)",
            "level4": "Imploding Elements (reroll 1s on damage), Ward Refresh (spend MP to heal ward)",
            "level5": "Attribute Increase/Distinction, Motes of Magick (expend Wisp instead of MP for Channel Magick)",
            "level6": "Additional Action (4 total), Destructive Feedback (reaction damage when ward hit)",
            "level7": "Attribute Increase/Distinction, Power Surge (reroll damage for chosen element)",
            "level8": "Energy Conduit (chosen element ignores DR), Spell Siphon (regain MP on kill)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Chain Reaction (destroy all wisps for massive damage)",
            "level10": "Elemental Archon (immunity to chosen element, change on Rest), Ultimate Defense (ward HP = score, +1 AC/Defenses at 0)"
        }
    },
    "priest": {
        "name": "Priest",
        "category": "Magickal Enabler",
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
        "weaponTraining": ["Two types of Melee", "One type of Ranged", "Two types of Spellcraft"],
        "armorTraining": ["Light", "Medium", "Shields"],
        "bloodiedEffect": {
            "name": "Blood of the Martyr",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "At start of each turn, friendly creatures within 4 Squares gain temp HP equal to Willpower modifier.",
            "duration": "Until reduced to 0 HP or no longer Bloodied"
        },
        "features": {
            "level1": "Aspect of Divinity (minor divine displays), Blessed Renewal (boost Recovery Action), Spellcasting (Willpower), Magick Recovery",
            "level2": "Empowered Healing (cure poison/disease with healing), Purge Unholy (damage Unholy creatures in area)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Divine Emissary (bonus to Barter/Endure), Warrior's Blessing (Advantage after healing)",
            "level4": "Holy Strike (1d6 extra Holy damage), Font of Restoration (don't expend Hit Die on healing)",
            "level5": "Attribute Increase/Distinction, Radiant Aura (create light, impose Disadvantage on attacks)",
            "level6": "Additional Action (4 total), Curse Breaker (end spell/curse with healing)",
            "level7": "Attribute Increase/Distinction, Bane of Unholy (Advantage vs Unholy, max damage)",
            "level8": "Mana Recycling (regain MP when removing afflictions), Life From Death (temp HP on Holy kill)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Purify (Purge affects all, ignore Fatigue)",
            "level10": "Avatar of Divine (+5 Willpower, immunities, aura damage/healing), Symbiotic Healer (regain HP when healing, copy buffs)"
        }
    },
    "occultist": {
        "name": "Occultist",
        "category": "Magickal Exploiter",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Unholy", "Darkness", "Curse"],
            "damageDie": "1d10",
            "healingDie": "1d6",
            "damageTypes": ["Shadow"]
        },
        "weaponTraining": ["Two types of Melee", "One type of Ranged", "Three types of Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Blood Curse",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Curse creatures equal to Intellect + level. Cursed have Disadvantage vs you, can reflect damage as Reaction.",
            "duration": "One minute, until 0 HP, or no longer Bloodied"
        },
        "features": {
            "level1": "Shadow Step (teleport in darkness with Advantage), Darksight (see in darkness), Spellcasting (Intellect), Magick Recovery",
            "level2": "Magick Purge (remove buffs/curses for damage), Raise Minion (create undead servants)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Shadowy Informant (bonus to Deceive/Study), Lifestealer Curse (curse for damage + temp HP on death)",
            "level4": "Occult Extension (Concentrate as Action/Minor), Grip of Darkness (extra damage in dim light)",
            "level5": "Attribute Increase/Distinction, Homing Hex (Advantage vs Cursed)",
            "level6": "Additional Action (4 total), Misdirection Curse (redirect missed attacks)",
            "level7": "Attribute Increase/Distinction, Mighty Minions (spend extra MP for stronger minions)",
            "level8": "Exorcism (Magick Purge makes Vulnerable), Life Eater (temp HP on kill/dismiss)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Virulent Curse (spread on death, reduce Defenses)",
            "level10": "Reaving Spells (extra damage to healthy targets), Necromancer (temp HP from Exorcism, auto-raise on kill)"
        }
    },
    "sage": {
        "name": "Sage",
        "category": "Magickal Enabler",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Wind", "Earth", "Water", "Plant"],
            "damageDie": "1d8",
            "healingDie": "1d8",
            "damageTypes": ["Slash", "Stab", "Strike", "Poison"]
        },
        "weaponTraining": ["Two types of Melee", "Two types of Ranged", "Two types of Spellcraft"],
        "armorTraining": ["Light", "Shields"],
        "bloodiedEffect": {
            "name": "Spring Eternal",
            "trigger": "When Bloodied",
            "description": "Ground within 2 Squares becomes difficult terrain. Creatures starting turn in area recover 1 HP or take 1d4 Poison (your choice). Reducing to 0 HP Charms them instead.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Green Thumb (grow plants instantly), Language of Nature (speak with animals/plants), Spellcasting (Willpower), Magick Recovery",
            "level2": "Nature's Protection (reaction vines to Immobilize/Stagger), Natural Attunement (choose Wind/Water/Stone/Plant for benefits)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Askance of Nature (bonus to Maneuver/Sneak), Terrain Manipulation (create/destroy terrain)",
            "level4": "Wildstrider (+1 Speed, ignore difficult/hazardous terrain), Sage Forms (transform into elemental form)",
            "level5": "Attribute Increase/Distinction, Destructive Nature (Willpower to aligned spell damage)",
            "level6": "Additional Action (4 total), Wrathful Protection (halve damage, deal damage with vines)",
            "level7": "Attribute Increase/Distinction, Advanced Attunement (change on Rest, extra benefits per element)",
            "level8": "Grasping Vines (target extra creatures), Twin Attunement (choose two elements)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Will of the Land (create hazardous/obscuring terrain, permanent)",
            "level10": "Worldspeaker (Advantage with nature creatures, they avoid combat), Master of Four Forms (four uses, activate two at once)"
        }
    },
    "magician": {
        "name": "Magician",
        "category": "Magickal Enabler",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Illusion", "Arkane", "Transposition"],
            "damageDie": "1d10",
            "healingDie": "1d6",
            "damageTypes": ["Arkane"]
        },
        "weaponTraining": ["Two types of Melee", "One type of Ranged", "Three types of Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Is this a Dream, or a Nightmare?",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Charm or Frighten creatures within 4 Squares until end of next turn or damage. Concentrate to extend. Take damage/Slow when ends.",
            "duration": "Concentration"
        },
        "features": {
            "level1": "Simple Manipulation (move objects at distance), Handheld Illusion (create illusory objects), Spellcasting (Intellect), Magick Recovery",
            "level2": "Illusion Specialist (choose who sees through illusions), Hidden Step (turn invisible)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Magickal Guile (bonus to Sneak/Deceive), Scapegoat (teleport leaving illusion)",
            "level4": "Psychic Illusions (personalized perception), Trick Door (create portal storage)",
            "level5": "Attribute Increase/Distinction, Complex Manipulation (two hands, heavier objects, attack)",
            "level6": "Additional Action (4 total), From the Fold (bonus damage after Hidden Step/Scapegoat)",
            "level7": "Attribute Increase/Distinction, Doppelganger (create duplicate, swap places, attack from)",
            "level8": "Magickal Displacement (Arkane DR, resist forced movement, teleport on Channel), Unstable Duplicates (damage when duplicate destroyed)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Escape Hatch (Trick Door for travel)",
            "level10": "Altered Reality (make illusions real), Emergency Escape (Doppelganger with Scapegoat)"
        }
    },
    "conjuror": {
        "name": "Conjuror",
        "category": "Magickal Exploiter",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "willpower",
            "magickTypes": ["Summoning", "Creation", "Rune"],
            "damageDie": "1d8",
            "healingDie": "1d8",
            "damageTypes": ["Poison", "Acid"]
        },
        "weaponTraining": ["Two types of Melee", "One type of Ranged", "Two types of Spellcraft"],
        "armorTraining": ["Light", "Medium", "Shields"],
        "bloodiedEffect": {
            "name": "Runic Minefield",
            "trigger": "When Bloodied for first time in encounter or start encounter Bloodied",
            "description": "Create runic traps in spaces within 6 Squares. While Bloodied, can create traps up to 6 Squares away.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Runic Trap (create damage traps), Adaptable Tools (create magickal tools), Spellcasting (Willpower), Magick Recovery",
            "level2": "Conjured Weapon (create weapon using Spellcraft), Conjure Familiar (summon tiny creature)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Right Tool for Job (bonus with Adaptable Tools), Magick Armor (create armor set)",
            "level4": "Sorcerous Strike (1d8 extra damage), Explosive Traps (area effect, remote activation)",
            "level5": "Attribute Increase/Distinction, Conjure Incarnate (summon powerful champion)",
            "level6": "Additional Action (4 total), Familiar Evolution (stronger familiar, change form)",
            "level7": "Attribute Increase/Distinction, Concentrated Runes (spend MP for extra damage + effects)",
            "level8": "Kinetic Reversal (trap immunity, armor interacts with traps), Expanded Arsenal (two weapons or weapon + shield)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Twin Summons (two familiars, -1 Action)",
            "level10": "Master of Conjurations (temp HP on summon, Incarnate indefinite, regain MP), Supreme Runes (create anywhere, larger area)"
        }
    },
    "esper": {
        "name": "Esper",
        "category": "Magickal Exploiter",
        "hitDie": "d6",
        "combatSkillBonus": "spellcraft",
        "hasSpellcasting": true,
        "spellcasting": {
            "attribute": "intellect",
            "magickTypes": ["Psychic", "Spirit", "Divination"],
            "damageDie": "1d10",
            "healingDie": "1d6",
            "damageTypes": ["Psychic"]
        },
        "weaponTraining": ["Two types of Melee", "One type of Ranged", "Three types of Spellcraft"],
        "armorTraining": ["Light"],
        "bloodiedEffect": {
            "name": "Specter of Winter",
            "trigger": "At start of each turn while Bloodied",
            "description": "Designate one creature: either Slowed + 1d10 Ice damage, or gains 1d6 temp HP.",
            "duration": "While Bloodied"
        },
        "features": {
            "level1": "Sixth Sense (detect supernatural within 10 Squares), Ghostly Whispers (telepathy within 3 Squares), Spellcasting (Intellect), Magick Recovery",
            "level2": "Ghost Sight (see Invisible, read motives), Premonition (no Surprise, Advantage Initiative)",
            "level3": "Additional Action (3 total), Attribute Increase/Distinction, Past Lives (bonus to Sneak/Craft), Fade (reaction to become Intangible)",
            "level4": "Extract Thoughts (read/influence thoughts), Séance (pull spirits into visibility, restrict movement)",
            "level5": "Attribute Increase/Distinction, Fate Meddling (spend MP to manipulate dice)",
            "level6": "Additional Action (4 total), Phantom Walk (become Intangible, move through objects)",
            "level7": "Attribute Increase/Distinction, Mind Reader (Advantage when reading thoughts)",
            "level8": "Ghost Warrior (extended Intangible, ignore DR), Possession (control creatures at 0 HP)",
            "level9": "Additional Action (5 total), Attribute Increase/Distinction, Circles of Protection (magick circles with Séance)",
            "level10": "Incorporeal Champion (temp HP when Intangible), Death Gaze (Advantage on single target, spend MP for crit, possess on kill)"
        }
    }
};

// Cross-Class Features
// Keys are alphabetically sorted class names (e.g., "berserker-knight" not "knight-berserker")
// Total of 120 combinations for 16 classes
const CROSS_CLASS_FEATURES = {
    // Knight combinations (15 total)
    "berserker-knight": {
        "name": "Warlord",
        "level3": "Dominating Presence: When you use your Berserking feature, you can use your Visibly Dangerous feature as part of the same Action, even if you have already used it in this encounter. Additionally, while Berserking, you have Advantage on Attacks against any creature that is Taunted by you.",
        "level8": "Warlord's Menace: When a creature starts their turn Frightened by you, you can choose to make them Taunted instead, and when a creature starts their turn Taunted by you, you can choose to make them Frightened instead. If a creature starts their turn both Frightened and Taunted by you, they take Psychic damage equal to your level. You can then choose if they remain Frightened, Taunted, both, or neither."
    },
    "duelist-knight": {
        "name": "Vanguard",
        "level3": "Bringeth it On!: When you use your En Garde feature, if your Attack against Willpower Defense succeeds, the creature becomes Taunted by your Challenge feature after they make their movement and Melee Attack against you. If your Attack against Willpower Defense fails, you gain both failure benefits of En Garde and Challenge (+2 bonus movement on this turn, and an extra minor action).",
        "level8": "Avenging Steel: While in Phalanx stance, you gain a bonus to the damage of your Melee Attacks equal to twice the number of friendly creatures within 1 Square (5 feet) of you, to a maximum bonus of 6 damage. When you use your Castling Maneuver feature or Protect feature while in Phalanx Stance, you can also make one Melee Attack against the attacking creature if they are within range of your weapon or shield. If your ally was still hit by the Attack, you have Advantage on your Attack."
    },
    "brawler-knight": {
        "name": "Heavyhand",
        "level3": "Fists of Iron: When you hit a creature with a Punch while wearing Heavy Armor, they have Disadvantage on the next Attack they make against a creature other than you before the end of their next turn. This effect can stack up to three times. If a creature receives a third stack, you Daze the creature until the end of their turn as well.",
        "level8": "Limbs of Lead: While you are wearing Heavy Armor, your Unarmed Attacks (Punch, Kick, and Headbutt) deal additional damage equal to twice your AC bonus from Armor Training. When a creature hits you with an Attack, you gain 1 Flow."
    },
    "knight-thief": {
        "name": "Errant",
        "level3": "Sunder Grip: When a Taunted creature attacks you, you can use a Reaction to attempt to knock the weapon from their hand before their attack hits you. Make a Melee Attack against their Reflexes Defense. If you succeed, they drop the weapon they are attacking you with before they are able to make their attack. You can catch the item if you have at least one hand free. If you fail, the creature has Disadvantage on their Attack instead.",
        "level8": "Adding Injury to Insult: When you hit a creature with an Attack using a weapon you stole from them with Pickpocket, Disarming Strike, or Sunder Grip, they take additional Psychic damage equal to your level, or twice that if you hit their Willpower Defense using Goading Attack. Once a creature has taken Psychic damage from this feature, they cannot take damage from it again until they finish a Full Rest."
    },
    "hunter-knight": {
        "name": "Chevalier",
        "level3": "Chivalrous Mark: When you place your Harrying Mark on a creature Taunted by you, you can place a Chivalrous Mark on them as well, which lasts until they no longer have a Harrying Mark. While a creature has a Chivalrous Mark on them, any time they move outside of 6 Squares (30 feet) from you, you can move up to half your Speed (rounded up) towards that creature, no Reaction required. Additionally, while that creature is within 6 Squares (30 feet) of you, they have Disadvantage on Attacks made against creatures other than you.",
        "level8": "Delivering Justice: When you Attack a creature that has a Chivalrous Mark, you ignore the Disadvantage of your Point Blank and Long Shot features. When you hit a creature Taunted by you with a Ranged Attack, or if your Goading Attack successfully Taunts a creature, you can force that creature to move up to its speed towards you. This movement can provoke Opportunity Attacks."
    },
    "assassin-knight": {
        "name": "Kingslayer",
        "level3": "Clipped Wings: When you Attack a creature while they are Prone, they are automatically affected by your Hamstring feature, even if your attack misses. Additionally, when you successfully Shove a creature, that creature takes 1d4 Strike damage, and once per turn you can use Twist the Knife to increase the damage when you successfully Shove a creature. The damage of this feature increases as you reach higher levels: 1d6 at 6th level, and 1d8 at 9th level.",
        "level8": "Wound Dehiscence: When a creature with at least one lasting Wound from your Lacerate feature hits you with a Melee Attack, instead of dealing damage with your Turn the Blade feature, you can increase their number of Wounds by 1, to a maximum of 5 Wounds. Whenever you use a Knight feature to make a creature Taunted, if that creature has any lasting Wounds from your Lacerate feature, they take 1d4 Slash damage."
    },
    "knight-tactician": {
        "name": "Commander",
        "level3": "Heroic Paragon: Creatures with temporary HP from any of your Tactician features also gain the benefits of your Steadfast and Vigilant Until Death features.",
        "level8": "Offense and Defense: When you use your Rally feature while in Phalanx Stance, each friendly creature within 1 Square (5 feet) of you gains temporary HP equal to your level. Additionally, when you direct an ally within 1 Square (5 feet) of you to Attack or move using Commanding Strike, they gain either of the following benefits: If the creature Attacks and its Attack is successful, it deals additional damage equal to your level. If the creature moves, it can move up to its speed without provoking Opportunity Attacks, and it keeps the benefits of your Positive Influence and Phalanx Stance features until the end of its next turn, even if it is out of range of either or both of those features."
    },
    "knight-minstrel": {
        "name": "Skald",
        "level3": "War Herald: When you use your Challenge feature to make a creature Taunted, you can give that creature a Misfortune as part of that same Action. When you fail your Challenge feature, you can Channel Magick as a Minor Action on your turn. When you use your Protect feature, you can give the creature you protect a Fortune as part of that same Reaction. If the creature is still hit by the triggering Attack, they can expend their Fortune to roll 1d6 and reduce the damage they take from the Attack by the number rolled.",
        "level8": "Marching Cadence: When you Channel Magick, each friendly creature of your choice within 1 Square (5 feet) of you gains the benefits of your Defense Melody feature until the start of your next turn, and when you Cast a Spell, each friendly creature within 1 Square (5 feet) of you gains the benefits of your Fast Tempo feature until the end of their next turn. You can use your Castling Maneuver feature to move up to half your movement speed towards a creature that is Attacked before swapping with them if you end your movement within 1 Square (5 feet) of them."
    },
    "elementalist-knight": {
        "name": "Spellguard",
        "level3": "Aegis of Elements: As an Action, you can spend one MP to create your Aegis of Elements, which lasts for one minute. While the Aegis is active, you have Energy Damage Reduction 5. Additionally, as a Reaction when a creature within 2 Squares (10 feet) of you takes Energy damage, or when you use your Protect feature of a creature, you can give your Aegis to them, giving them Energy Damage Reduction 5 until the start of your next turn. You lose your Energy Damage Reduction during that time.",
        "level8": "Warding Formation: Your Aegis of Elements now provides you or any creature it is protecting Energy Damage Reduction 10. While in Phalanx Stance, each friendly creature within 1 Square (5 feet) of you gains the benefits of your Aegis, and when such a creature takes damage, you can let your Magickal Ward take the damage instead (no Reaction required)."
    },
    "knight-priest": {
        "name": "Paladin",
        "level3": "Mending Defense: When you use your Protect feature, the creature can use their Reaction to take the Recover Action, benefiting from your Blessed Renewal feature if they do. If the creature is still hit by the Attack, regardless of if they take the Recover Action, they regain HP equal to your Willpower modifier after they take the Attack's damage.",
        "level8": "Radiant Weapons, Holy Words: Friendly creatures that are in your Radiant Aura deal 1d6 additional Holy damage when they hit a creature with an Attack. When you make a creature within the area of your Radiant Aura feature Taunted with a Knight feature, they take Holy damage equal to your Willpower modifier."
    },
    "knight-occultist": {
        "name": "Dreadnaught",
        "level3": "Overshadow: While you have at least one creature Taunted by you, you emit an aura of shadows, which moves with you. The aura turns bright light into dim light, and dim light into darkness. The size of the aura (how many Squares it extends out from you) is based on the number of creatures Taunted by you plus the number of Minions you have (to a maximum of 6 Squares (30 feet). You can use the Concentrate Action to extend the duration of your Overshadow until the end of your next turn.",
        "level8": "Darkest Knight: While you are standing in an area of dim light or darkness, you gain the following benefits: Increase the AC and Damage Reduction of any Heavy Armor you are wearing by 1. Your Heavy Armor no longer gives you Disadvantage on Sneak checks. Your Melee Weapons can make Attacks against targets 1 Square (5 feet) further than normal. When a creature in an area of dim light or darkness within 4 Squares (20 feet) of you is Attacked, you can Shadow Step to an unoccupied space within 1 Square (5 feet) of the creature before using your Protect or Castling Maneuver feature."
    },
    "knight-sage": {
        "name": "Hedgewarden",
        "level3": "Hedge of Protection: As an Action, or when you use your Protect feature as a Reaction, you can expend a use of your Nature's Protection feature as part of the same Reaction. The creature that attacked them is subject to your Nature's Protection so long as they are within 6 Squares (30 feet) feet of you. You also form a Hedge 3 Squares (15 feet) tall, 3 Squares (15 feet) wide, 1 Square (5 feet) thick in an unoccupied space between the attacking creature and the creature you protected. If no large enough open space exists, the Hedge pushes back each creature in a suitable area of your choice, dealing 1d4 Stab damage to each creature it moves. The Hedge can provide cover and deals 1d4 Stab damage to any creature that touches it or hits it with a Melee Attack. The Hedge has an AC equal to 10 plus your Willpower modifier and HP equal to 5 times your level. It has Physical Damage Reduction 5, but Fire Damage Vulnerability 5. The Hedge lasts for 1 minute, until it is reduced to 0 HP, or until you dismiss it as an Action on your turn.",
        "level8": "Defense Hedgemony: Your Hedge of Protection grows larger - now you can form a Hedge up to 6 Squares (30 feet) wide (the other dimensions of the Hedge remain the same), and the Hedge can incorporate up to four 90 degree corners along the ground, making it able to form open or closed boxes. Additionally, your Hedge of Protection gives the benefits of your Phalanx Stance to all friendly creatures within 1 Square (5 feet) of it, and deals additional Stab damage to creatures that hit it with Melee Attacks equal to the damage of your Turn the Blade feature."
    },
    "knight-magician": {
        "name": "Arkane Guardian",
        "level3": "Emergency Relocation: When you use your Protect feature, you can expend a use of your Scapegoat feature as part of the same Reaction, teleporting the creature you are protecting instead of yourself. After they teleport, the creature you protected gains Advantage on the next Attack they make before the end of their next turn, and if that Attack succeeds, they deal 1d10 additional Arkane damage.",
        "level8": "Duplicate Defense: When you use your Challenge feature, any number of creatures you Taunt can be Taunted by your Doppelganger instead of you. Additionally, when a creature within 4 Squares (20 feet) of either you or your Doppelganger is Attacked, you can use a Reaction to use your Castling feature to swap either yourself or your Doppelganger with the creature, causing the Attack to target yourself or your Doppelganger instead."
    },
    "conjuror-knight": {
        "name": "Rune Juggernaut",
        "level3": "Rune-touched Armor: Instead of creating Magick Armor, you can expend 1 MP to cover the armor you are wearing with special runes when you finish a Rest, changing it into your Rune-touched Armor until you take a Rest. While you are wearing your Rune-touched Armor, you gain the benefits from your Magick Armor feature. When a creature within 2 Squares (10 feet) of you tries to move you against your will or Attacks your Toughness Defense, you can use a Reaction to push them back 2 Squares (10 feet) and deal 1d8 Acid or Poison damage to them. Whenever you create your Rune-touched Armor when you finish a Rest, also choose one of the following options: Stainless: Your armor cannot be dirtied, and its AC cannot be reduced by non-magical means. Unburdened: Your armor's Encumbrance value is reduced by 2, and its Speed Reduction is reduced by 1. Muffled: If your armor is heavy armor, your armor does not give you Disadvantage on Sneak checks. Otherwise, you have Advantage on Sneak checks while wearing your armor.",
        "level8": "Adapting Armor: When you are within the area of a Runic Trap when it activates and you are wearing your Rune-touched Armor, you can choose which Kinetic Reversal feature you use, regardless of the type of armor you are wearing. Whenever you create your Rune-touched Armor when you finish a Rest, also choose one of the following options instead of one of the options from the Rune-touched Armor feature: Reinforced: Increase your armor's AC by 1. Shock Absorbing: Increase your armor's Damage Reduction by 1. Neutralizing: Your armor gives you Acid and Poison Damage Reduction 5."
    },
    "esper-knight": {
        "name": "Clairvoyant",
        "level3": "Chivalric Clarity: You have three Clarity. When you Attack a creature Taunted by you, or when a creature Taunted by you makes an Attack against you, you can expend one Clarity to give the Attack Advantage or Disadvantage. If this causes an Attack to miss you, or causes your Attack to hit a Taunted creature, you can end the Taunted condition and cause that creature to take 1d10 Psychic damage. You can also expend one Clarity when Initiative is rolled to give yourself or a friendly creature that can see or hear you Advantage on their Initiative roll. You regain all of your expended Clarity when you finish a Rest, and one Clarity when you use your Visibly Dangerous feature to make at least one creature Taunted.",
        "level8": "Clear Future: You now have five Clarity. When a creature you can see makes an Attack, you can expend one Clarity to give their Attack Advantage or Disadvantage. If this causes their Attack to succeed, you can cause the creature hit by the Attack to take 1d10 Psychic damage and become Taunted by you until the end of your next turn. If this causes an Attack to miss, you can cause the creature that made the Attack to take 1d10 Psychic damage and become Taunted by you until the end of their next turn. If a creature that would take Psychic damage from this feature was already Taunted by you, they take 2d10 Psychic damage instead."
    },

    // Berserker combinations (14 remaining - excluding berserker-knight already listed)
    "berserker-duelist": {
        "name": "Champion",
        "level3": "Intercept: If an enemy you can see misses you with an Attack from more than 3 Squares (15 feet) away from you, you can use a Reaction to use the Charge Action towards that creature. You can use either your Lunging Attack or Running Tackle feature as part of the same Reaction.",
        "level8": "Champion's Rebuttal: When you use your Retaliation feature, you can make a Heavy Attack instead of a Normal Attack. If you get a Critical Hit or reduce a creature to 0 HP with an Attack that uses a Reaction, you regain that Reaction."
    },
    "berserker-brawler": {
        "name": "Mauler",
        "level3": "Pounce: When you hit a creature with your Running Tackle feature, you can spend Flow to deal additional damage to them with your Claws. For each Flow you spend, you deal Slash damage equal to one roll of your Claw Unarmed Strike damage die.\n\nBite and Hold: When you hit a creature with a Bite Attack, you can Grapple the creature as part of the same Attack, leaving your hands free by using your bite instead. While you have a creature grappled in this way, you are Silenced and cannot use your Bite Attack, the number needed to escape your Grapple is increased by your level, and as a Minor Action on your turn, you can spend 1 Flow to deal Stab damage to the creature equal to one roll of your Bite Unarmed Strike damage die.",
        "level8": "Beastial Roar: When you use your Intimidating Shout feature, you can target any number of creatures that can see or hear you instead of only one.\n\nFeral Strikes: Whenever you deal damage using your Claw or Bite Unarmed Strikes (including when you use your Pounce or Bite and Hold features), you can use your Frightening Glare feature on one creature that can see you."
    },
    "berserker-thief": {
        "name": "Raider",
        "level3": "Hit and Run: When you Dash towards an enemy while you are Berserking, the next Attack you make against that enemy during this turn deals extra damage equal to your level if it hits. Additionally, regardless of if the Attack hits, your movement does not provoke Opportunity Attacks from that enemy for the rest of the turn.",
        "level8": "Gold Rush: When you successfully steal an item from a creature using your Disarming Strike or Pickpocket feature, you gain the benefits of your Adrenaline Rush feature. You can only gain the benefits from this feature once on each of your turns, in addition to gaining Adrenaline Rush from scoring a Critical Hit or reducing a creature to 0 HP."
    },
    "berserker-hunter": {
        "name": "Predator",
        "level3": "Full Draw: While Berserking, you gain a bonus to Ranged Attacks and damage rolls equal to your Ranks in the Melee Skill while using Bows, Slings, and Thrown weapons against targets within half the weapon's range. Additionally, when you use your Barbaric Instinct feature to Shift away from a creature that hits you with an Attack targeting your Reflexes Defense or AC, you can then make one Ranged Attack as part of the same Reaction.",
        "level8": "Mighty Shot: Once per turn, you can use your Heavy Handed feature to use your Point Blank, Long Shot, or Barrage feature using a single Action instead of two Actions. If you do, you ignore the Disadvantage of either your Point Blank or Long Shot feature."
    },
    "assassin-berserker": {
        "name": "Ravager",
        "level3": "Ravaging Strike: When you use your Reckless Assault feature, the next time you use Twist the Knife before the start of your next turn, you deal additional damage equal to two rolls of the Reckless Assault die.",
        "level8": "Hemorrhage: When you hit a creature that has at least one Wound from your Lacerate feature with a Heavy Attack, they take 1d4 Slash damage for each Wound they have."
    },
    "berserker-tactician": {
        "name": "Warrior Chief",
        "level3": "Rallying Rage: When you use your Berserking feature, you can expend any number of your Hit Dice and use your Rally feature on that many allies as well, adding one roll of an expended Hit Die to each creature's temporary HP. Any creature that you Rally has Advantage on the next Attack they make before the end of their next turn. While you continue Berserking, when you use your Reckless Assault feature, one creature of your choice that can see or hear you may also add your Reckless Assault die to their Attacks on their next turn, but creatures that target them with Attacks may also add the Reckless Assault die to their Attacks.",
        "level8": "Radiating Hatred: While you are Berserking, each friendly creature within the range of your Positive Influence feature gains a bonus to the damage of their weapon Attacks equal to your Ranks in the Melee Skill. When you use your Battle Cry feature, double this bonus until the start of your next turn."
    },
    "berserker-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-elementalist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-conjuror": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "berserker-esper": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Duelist combinations (13 remaining - excluding duelist-knight and berserker-duelist)
    "brawler-duelist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-hunter": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-duelist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-elementalist": {
        "name": "Spellsword",
        "level3": "Magick Fencing: When a creature deals damage to your Magickal Ward but no damage to your HP, you can make a Melee Attack against them as a Reaction. Additionally, once per turn when you hit a creature with a Melee Attack, you can expend your wisps as though you made a Spellcraft Attack.",
        "level8": "TBD"
    },
    "duelist-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-duelist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "duelist-esper": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Brawler combinations (12 remaining)
    "brawler-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-hunter": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-brawler": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-elementalist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-conjuror": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "brawler-esper": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Thief combinations (11 remaining)
    "hunter-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "tactician-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "minstrel-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "priest-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "occultist-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "sage-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "magician-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-thief": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Hunter combinations (10 remaining)
    "assassin-hunter": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "hunter-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "hunter-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-hunter": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "hunter-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "hunter-occultist": {
        "name": "Deadeye",
        "level3": "Grim Concentration: When you use your Harrying Mark feature, you can spend 1 MP to mark the same creature with Grim Concentration. While a creature is marked with Grim Concentration, your Harrying Mark deals Shadow damage instead of its normal damage type, and any Curse you place on the creature lasts until the Grim Concentration ends instead of its normal duration. While you have a creature marked with Grim Concentration, you cannot place Curses or Harrying Mark on any other creature. Grim Concentration ends only if you or the creature are reduced to 0 HP, or if you end it before then as an Action.",
        "level8": "TBD"
    },
    "hunter-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "hunter-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-hunter": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-hunter": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Assassin combinations (9 remaining)
    "assassin-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-minstrel": {
        "name": "Jester",
        "level3": "Fool Around: When you expend a use of your Misfortune feature on a hostile creature, you can make a single Melee or Ranged Attack against that creature as a reaction. On a hit, the creature takes additional damage equal to the number rolled on the Misfortune die, and if you use your Twist the Knife feature, the damage of Twist the Knife is multiplied by the number you rolled on the Misfortune die if it is higher than the number of d20s you rolled for your Attack.",
        "level8": "TBD"
    },
    "assassin-elementalist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-conjuror": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "assassin-esper": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Tactician combinations (8 remaining)
    "minstrel-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "priest-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "occultist-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "sage-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "magician-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-tactician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Minstrel combinations (7 remaining)
    "elementalist-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "minstrel-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "minstrel-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "minstrel-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "magician-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-minstrel": {
        "name": "Wordsmith",
        "level3": "When you use your Adaptable Tools, Conjured Weapon, or Magick Armor feature, you can enchant the item you create with one of your Fortunes. If you do, this takes up your active use of Fortune while the item exists, or one use of your Fortune/Misfortune uses once you have your Dueling Fates feature. An enchanted item grants the following effects: A creature using the enchanted Adaptable Tool adds your Fortune die to each Skill check they make using the item. A creature using the enchanted Conjured Weapon adds your Fortune die to each Attack they make using the weapon. A creature wearing your enchanted Magick Armor can use a Reaction to roll the Fortune die and reduce the damage they take from an Attack by the number rolled.",
        "level8": "TBD"
    },
    "esper-minstrel": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Elementalist combinations (6 remaining)
    "elementalist-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-elementalist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "elementalist-esper": {
        "name": "Will O'wisp",
        "level3": "Psychic Wisps: When you start your turn while Intangible, you can create one Elemental Wisp as long as you are below your maximum number of wisps. Additionally, you can choose Psychic as the element of your Wisps, instead of Fire, Ice, or Lightning. Psychic Wisps deal 1d10 damage instead of 1d12 when expended, but deal an additional 1d10 damage to Otherworldly, Unholy, and Spirit creatures.",
        "level8": "TBD"
    },

    // Priest combinations (5 remaining)
    "occultist-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "priest-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "magician-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-priest": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Occultist combinations (4 remaining)
    "occultist-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "magician-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-occultist": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Sage combinations (3 remaining)
    "magician-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "conjuror-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-sage": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Magician combinations (2 remaining)
    "conjuror-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },
    "esper-magician": { "name": "TBD", "level3": "TBD", "level8": "TBD" },

    // Conjuror combinations (1 remaining)
    "conjuror-esper": { "name": "TBD", "level3": "TBD", "level8": "TBD" }
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
