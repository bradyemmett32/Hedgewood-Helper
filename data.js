// Class definitions
const classData = {
    minstrel: {
        name: "Minstrel",
        description: "Music, Sound, and Fortune Magick",
        damageDie: "1d8",
        healingDie: "1d8",
        damageTypes: ["sound"]
    },
    elementalist: {
        name: "Elementalist",
        description: "Fire, Ice, and Lightning Magick",
        damageDie: "1d12",
        healingDie: "1d4",
        damageTypes: ["fire", "ice", "lightning"]
    },
    priest: {
        name: "Priest",
        description: "Divine, Healing, and Light Magick",
        damageDie: "1d6",
        healingDie: "1d10",
        damageTypes: ["holy"]
    },
    occultist: {
        name: "Occultist",
        description: "Unholy, Darkness, and Curse Magick",
        damageDie: "1d10",
        healingDie: "1d6",
        damageTypes: ["shadow"]
    },
    sage: {
        name: "Sage",
        description: "Wind, Earth, Water, and Plant Magick",
        damageDie: "1d8",
        healingDie: "1d8",
        damageTypes: ["slash", "stab", "strike", "poison"]
    },
    magician: {
        name: "Magician",
        description: "Illusion, Arkane, and Transposition Magick",
        damageDie: "1d10",
        healingDie: "1d6",
        damageTypes: ["arkane"]
    },
    conjuror: {
        name: "Conjuror",
        description: "Summoning, Creation, and Rune Magick",
        damageDie: "1d8",
        healingDie: "1d8",
        damageTypes: ["poison", "acid"]
    },
    esper: {
        name: "Esper",
        description: "Psychic, Spirit, and Divination Magick",
        damageDie: "1d10",
        healingDie: "1d6",
        damageTypes: ["psychic"]
    }
};

// Spell type data
const spellData = {
    attackSpells: {
        meleeStrike: { 
            name: "Melee Spellstrike", 
            description: "Replace a Spellcraft Attack with a Melee Attack using a weapon",
            damage: "Weapon damage",
            range: "Melee"
        },
        rangedStrike: { 
            name: "Ranged Spellstrike", 
            description: "Replace a Spellcraft Attack with a Ranged Attack using a weapon",
            damage: "Weapon damage",
            range: "Ranged"
        },
        bolt: { 
            name: "Bolt", 
            description: "Deals damage to a single target up to 12 Squares (60 feet) away",
            damage: "2",
            range: "12 Squares (60 ft)"
        },
        touch: { 
            name: "Touch", 
            description: "Deals damage to a single target within 1 Square (5 feet)",
            damage: "3",
            range: "1 Square (5 ft)"
        },
        cleave: { 
            name: "Cleave", 
            description: "Deals damage to all targets within a Cone 3 Squares (15 feet) long",
            damage: "2",
            range: "Cone 3 Squares",
            area: "1/3/5 affected Squares"
        },
        bomb: { 
            name: "Bomb", 
            description: "Deals damage to all targets within a Cube 3 Squares (15 feet) on each side",
            damage: "1",
            range: "6 Squares (30 ft) away",
            area: "3x3x3 Cube"
        },
        beam: { 
            name: "Beam", 
            description: "Deals damage to all targets within a Line 1 Square tall, 1 Square wide, and 6 Squares long",
            damage: "1",
            range: "Line 6 Squares long"
        },
        burst: { 
            name: "Burst", 
            description: "Deals damage to all targets within 1 Square of the caster, except the caster",
            damage: "2",
            range: "1 Square radius"
        }
    },
    
    effectSpells: {
        aura: {
            name: "Aura",
            description: "Create an effect within 2 Squares (10 feet) of you that follows you",
            range: "2 Squares radius",
            trigger: "Start of turn or enters"
        },
        pillar: {
            name: "Pillar",
            description: "Create an effect within a vertical Line 3 Squares wide, 3 Squares long, and 6 Squares tall",
            range: "Up to 6 Squares away",
            area: "3 sq wide x 3 sq long x 6 sq tall",
            trigger: "Start of turn or enters"
        },
        zone: {
            name: "Zone",
            description: "Create an effect within a Cube 6 Squares on each side",
            range: "Up to 6 Squares away",
            area: "6x6x6 Cube",
            trigger: "Start of turn or enters"
        }
    },

    healSpells: {
        healBolt: {
            name: "Healing Bolt",
            description: "Heals a single target up to 6 Squares (30 feet) away",
            healing: "1",
            range: "6 Squares (30 ft)"
        },
        healTouch: {
            name: "Healing Touch",
            description: "Heals a single target within your reach",
            healing: "2",
            range: "Touch"
        },
        healFan: {
            name: "Healing Fan",
            description: "Heals all targets within a Cone 3 Squares (15 feet) long",
            healing: "1",
            range: "Cone 3 Squares",
            area: "1/3/5 affected Squares"
        },
        healBomb: {
            name: "Healing Bomb",
            description: "Heals all targets within a Cube 3 Squares on each side",
            healing: "1",
            range: "Up to 6 Squares away",
            area: "3x3x3 Cube"
        },
        healBeam: {
            name: "Healing Beam",
            description: "Heals all targets within a Line 1 Square tall, 1 Square wide, and 6 Squares long",
            healing: "1",
            range: "Line 6 Squares long"
        },
        healBurst: {
            name: "Healing Burst",
            description: "Heals all targets within 1 Square of the caster, except the caster",
            healing: "2",
            range: "1 Square radius"
        }
    },

    damageTypes: {
        physical: {
            slash: { name: "Slash", defense: "AC or Reflexes" },
            stab: { name: "Stab", defense: "AC or Reflexes" },
            strike: { name: "Strike", defense: "AC or Toughness" },
            sound: { name: "Sound", defense: "AC or Toughness" }
        },
        energy: {
            fire: { name: "Fire", defense: "AC or Reflexes" },
            ice: { name: "Ice", defense: "AC or Toughness" },
            lightning: { name: "Lightning", defense: "AC or Reflexes" },
            poison: { name: "Poison", defense: "AC or Toughness" },
            acid: { name: "Acid", defense: "AC or Reflexes" }
        },
        metaphysical: {
            arkane: { name: "Arkane", defense: "AC or Intellect" },
            holy: { name: "Holy", defense: "AC or Willpower" },
            shadow: { name: "Shadow", defense: "AC or Willpower" },
            psychic: { name: "Psychic", defense: "AC or Intellect" }
        }
    },

    healTypes: {
        hp: { name: "HP", description: "Expends one Hit Die, adding it to the roll" },
        tempHp: { name: "Temporary HP", description: "Does not require Hit Dice expenditure" },
        diseases: { name: "Diseases", description: "Remove diseases", level: 3 },
        poisons: { name: "Poisons", description: "Remove poisons", level: 3 },
        reducedStats: { name: "Reduced Max HP/Hit Dice", description: "Restore reduced maximums", level: 3 },
        lingeringInjuries: { name: "Lingering Injuries", description: "Requires Ritual, 1d10+ Healing Die", level: 5 },
        death: { name: "Death", description: "Revive (1d8+: 1 min, 1d10+: 1 hour)", level: 5 }
    },

    positiveEffects: {
        increaseAC: { name: "Increase AC", single: "+2", multi: "+1" },
        increaseDefense: { name: "Increase Attribute Defense", single: "+2", multi: "+1" },
        speedBoost: { name: "Speed Boost", single: "+4", multi: "+2" },
        attackBonus: { name: "Attack Bonus", single: "+1d6", multi: "+1d4" },
        damageBonus: { name: "Increase Damage", single: "+1d6", multi: "+1d4" },
        damageReduction: { name: "Reduce Damage Taken", single: "-1d4", multi: "-1" },
        skillBonus: { name: "Skill Check Bonus", single: "+1d4", multi: "+1d2" }
    },

    negativeEffects: {
        reduceAC: { name: "Reduce AC", single: "-2", multi: "-1", defense: "Reflexes" },
        reduceDefense: { name: "Reduce Attribute Defense", single: "-2", multi: "-1", defense: "Attribute" },
        attackPenalty: { name: "Attack Penalty", single: "-1d6", multi: "-1d4", defense: "Willpower" },
        skillPenalty: { name: "Skill Check Penalty", single: "-1d4", multi: "-1d2", defense: "Intellect" },
        forcedMovement: { name: "Forced Movement", single: "4 Squares", multi: "2 Squares", defense: "Toughness" }
    },

    conditions: {
        charmed: { name: "Charmed", defense: "Intellect", level: 1 },
        dazed: { name: "Dazed", defense: "Intellect", level: 1 },
        deafened: { name: "Deafened", defense: "Toughness", level: 1 },
        frightened: { name: "Frightened", defense: "Willpower", level: 1 },
        prone: { name: "Prone", defense: "Reflexes", level: 1 },
        sickened: { name: "Sickened", defense: "Toughness", level: 1 },
        slowed: { name: "Slowed", defense: "Willpower", level: 1 },
        blinded: { name: "Blinded", defense: "Toughness", level: 3 },
        immobilized: { name: "Immobilized", defense: "Reflexes", level: 3 },
        silenced: { name: "Silenced", defense: "Intellect", level: 3 },
        staggered: { name: "Staggered", defense: "Intellect", level: 3 },
        vulnerable: { name: "Vulnerable", defense: "Toughness", level: 5 },
        weakened: { name: "Weakened", defense: "Willpower", level: 5 },
        unconscious: { name: "Unconscious", defense: "Willpower", level: 5 }
    },

    componentModules: {
        extraDamage: { 
            name: "Extra Damage", 
            description: "Add an extra Damage die",
            applicable: ["attack"]
        },
        extraHeal: { 
            name: "Extra Healing", 
            description: "Add an extra Healing die",
            applicable: ["heal"]
        },
        extraBuff: { 
            name: "Extra Buff/Debuff", 
            description: "Adds an additional Positive or Negative effect",
            applicable: ["all"]
        },
        additionalTarget: { 
            name: "Additional Target", 
            description: "Allows an additional creature to be targeted within range",
            applicable: ["bolt", "healBolt"]
        },
        curvingBolt: { 
            name: "Curving Bolt", 
            description: "Your Spellcraft Attack ignores Cover",
            applicable: ["bolt"]
        },
        recurrence: { 
            name: "Recurrence", 
            description: "Affected creature receives 1 die of healing/damage at start of next turn",
            applicable: ["attack", "heal"]
        },
        concentration: { 
            name: "Concentration", 
            description: "Extend effects until end of next round with Concentration Action",
            applicable: ["all"]
        },
        longBolt: { 
            name: "Long Bolt", 
            description: "Increase range by 3 Squares (15 feet), max 12 Squares",
            applicable: ["bolt", "healBolt"]
        },
        wideCleave: { 
            name: "Wide Cleave", 
            description: "Increases Cone length by 1 Square, area becomes 1/3/5/7",
            applicable: ["cleave"]
        },
        wideFan: { 
            name: "Wide Fan", 
            description: "Increases Cone length by 1 Square, area becomes 1/3/5/7",
            applicable: ["healFan"]
        },
        bigBomb: { 
            name: "Big Bomb/Zone", 
            description: "Increases Cube sides by 1 Square",
            applicable: ["bomb", "healBomb", "zone"]
        },
        longBeam: { 
            name: "Long Beam", 
            description: "Increases Line length by 3 Squares, max 12 Squares",
            applicable: ["beam", "healBeam"]
        },
        wideBeam: { 
            name: "Wide Beam", 
            description: "Increases Line width by 1 Square, max 3 Squares",
            applicable: ["beam", "healBeam"]
        },
        radiateFurther: { 
            name: "Radiate Further", 
            description: "Increases area around caster by 1 Square in all directions",
            applicable: ["burst", "healBurst", "aura"]
        },
        additionalAuraTarget: { 
            name: "Additional Aura Target", 
            description: "Designate another creature for aura to follow (6 Squares range)",
            applicable: ["aura"]
        },
        changeAuraTarget: { 
            name: "Change Aura Target", 
            description: "Designate different creature for aura to follow",
            applicable: ["aura"]
        },
        spellImmunity: { 
            name: "Spell Immunity", 
            description: "Choose whether allies or enemies ignore certain spell effects",
            applicable: ["all"]
        },
        nonLethal: { 
            name: "Non-lethal Damage", 
            description: "Damage can only reduce to 0 HP and knock Unconscious",
            applicable: ["attack"]
        }
    }
};

// Spell type icons and descriptions
const spellTypeConfig = {
    attack: {
        icon: "⚔️",
        name: "Attack Spell",
        description: "Deal damage to enemies"
    },
    heal: {
        icon: "💚",
        name: "Heal Spell",
        description: "Restore health to allies"
    },
    effect: {
        icon: "✨",
        name: "Effect Spell",
        description: "Apply buffs, debuffs, or conditions"
    }
};

// Security: Freeze all data structures for immutability
(function freezeGameData() {
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

    deepFreeze(classData);
    deepFreeze(spellData);
    deepFreeze(spellTypeConfig);
})();
