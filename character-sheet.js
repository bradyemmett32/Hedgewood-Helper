// Hedgewood Character Sheet App
// Main JavaScript file

// Character data structure
let currentCharacter = {
    characterInfo: {
        characterName: "",
        playerName: "",
        multiClassName: "",
        species: "",
        trade: "",
        class1: "",
        class2: "",
        level: 1,
        size: 1,
        experiencePoints: { current: 0, nextLevel: 300 }
    },
    attributes: {
        toughness: { score: 10, modifier: 0, defense: 10 },
        reflexes: { score: 10, modifier: 0, defense: 10 },
        intellect: { score: 10, modifier: 0, defense: 10 },
        willpower: { score: 10, modifier: 0, defense: 10 }
    },
    hitPoints: {
        current: 10,
        maximum: 10,
        temporary: 0,
        bloodiedThreshold: 5,
        isBloodied: false
    },
    hitDice: {
        class1: { dieType: "d6", total: 1, current: 1, expended: 0 },
        class2: { dieType: "d6", total: 1, current: 1, expended: 0 }
    },
    magickPoints: {
        class1: {
            hasSpellcasting: false,
            current: 0,
            maximum: 0,
            spellcastingAttribute: "intellect",
            magickTypes: [],
            damageDie: "",
            healingDie: "",
            damageTypes: []
        },
        class2: {
            hasSpellcasting: false,
            current: 0,
            maximum: 0,
            spellcastingAttribute: "intellect",
            magickTypes: [],
            damageDie: "",
            healingDie: "",
            damageTypes: []
        }
    },
    bloodiedStatus: {
        isBloodied: false,
        activeBloodiedEffect: "class1",
        encounterTracker: {
            becameBloodiedThisEncounter: false,
            encounterStartedBloodied: false
        }
    },
    combat: {
        armorClass: 10,
        speed: 6,
        combatSkills: {
            melee: { rank: 0 },
            ranged: { rank: 0 },
            spellcraft: { rank: 0 }
        }
    },
    generalSkills: {
        maneuver: { rank: 0, bonus: 0 },
        sneak: { rank: 0, bonus: 0 },
        study: { rank: 0, bonus: 0 },
        craft: { rank: 0, bonus: 0 },
        barter: { rank: 0, bonus: 0 },
        endure: { rank: 0, bonus: 0 },
        deceive: { rank: 0, bonus: 0 }
    },
    equipment: {
        weapons: [],
        armor: [],
        otherEffects: [],
        inventory: [],
        currency: { shells: 0 },
        carryCapacity: { current: 0, maximum: 10 }
    },
    features: {
        classFeatures: {
            class1Features: {
                generalFeatures: "",
                bloodiedEffect: { name: "", description: "", mechanics: "" }
            },
            class2Features: {
                generalFeatures: "",
                bloodiedEffect: { name: "", description: "", mechanics: "" }
            }
        },
        speciesFeatures: "",
        tradeFeatures: ""
    }
};

let currentSlot = 1;

// Helper function to get cross-class feature key
// Returns alphabetically sorted key for looking up cross-class features
// e.g., getCrossClassKey("knight", "berserker") returns "berserker-knight"
function getCrossClassKey(class1, class2) {
    if (!class1 || !class2 || class1 === class2) return null;
    const classes = [class1.toLowerCase(), class2.toLowerCase()].sort();
    return `${classes[0]}-${classes[1]}`;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Character Sheet App Initialized');

    // Populate dropdowns
    populateSpeciesDropdown();
    populateTradeDropdown();
    populateClassDropdowns();

    // Load saved character
    loadCharacter(currentSlot);

    // Setup event listeners
    setupEventListeners();

    // Initial calculations
    updateAllCalculations();
});

// Populate dropdowns with reference data
function populateSpeciesDropdown() {
    const select = document.getElementById('species');
    for (const [key, species] of Object.entries(SPECIES)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = species.name;
        select.appendChild(option);
    }
}

function populateTradeDropdown() {
    const select = document.getElementById('trade');
    for (const [key, trade] of Object.entries(TRADES)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = trade.name;
        select.appendChild(option);
    }
}

function populateClassDropdowns() {
    const class1Select = document.getElementById('class1');
    const class2Select = document.getElementById('class2');

    for (const [key, classData] of Object.entries(CLASSES)) {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = classData.name;
        class1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = classData.name;
        class2Select.appendChild(option2);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Character slot selector
    document.getElementById('characterSlot').addEventListener('change', function(e) {
        currentSlot = parseInt(e.target.value);
        loadCharacter(currentSlot);
    });

    // Character management buttons
    document.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', handleAction);
    });

    // Input fields with data-field attribute
    document.querySelectorAll('[data-field]').forEach(input => {
        input.addEventListener('input', handleFieldChange);
        input.addEventListener('change', handleFieldChange);
    });

    // Attribute scores (for auto-calculating modifiers)
    ['toughness', 'reflexes', 'intellect', 'willpower'].forEach(attr => {
        const scoreInput = document.getElementById(`${attr}Score`);
        if (scoreInput) {
            scoreInput.addEventListener('input', () => {
                updateAttributeModifier(attr);
                updateAllSkillBonuses();
                updateMagickPoints();
                saveCharacter();
            });
        }
    });

    // Class selection changes
    document.getElementById('class1').addEventListener('change', handleClassChange);
    document.getElementById('class2').addEventListener('change', handleClassChange);

    // Species and Trade changes
    document.getElementById('species').addEventListener('change', handleSpeciesChange);
    document.getElementById('trade').addEventListener('change', handleTradeChange);

    // Level changes
    document.getElementById('level').addEventListener('change', handleLevelChange);

    // Size changes
    document.getElementById('size').addEventListener('change', updateCarryCapacity);

    // Combat skill rank changes
    ['melee', 'ranged', 'spellcraft'].forEach(skill => {
        const rankInput = document.getElementById(`${skill}Rank`);
        if (rankInput) {
            rankInput.addEventListener('input', () => {
                updateCombatSkill(skill);
                saveCharacter();
            });
        }
    });

    // General skill rank and bonus changes
    ['maneuver', 'sneak', 'study', 'craft', 'barter', 'endure', 'deceive'].forEach(skill => {
        const rankInput = document.getElementById(`${skill}Rank`);
        const bonusInput = document.getElementById(`${skill}Bonus`);

        if (rankInput) {
            rankInput.addEventListener('input', () => {
                updateGeneralSkill(skill);
                saveCharacter();
            });
        }

        if (bonusInput) {
            bonusInput.addEventListener('input', () => {
                updateGeneralSkill(skill);
                saveCharacter();
            });
        }
    });
}

// Handle actions
function handleAction(e) {
    const action = e.target.dataset.action;

    switch(action) {
        case 'new-character':
            newCharacter();
            break;
        case 'import-character':
            showImportDialog();
            break;
        case 'export-character':
            exportCharacter();
            break;
        case 'decrease-hp':
            adjustHP(-1);
            break;
        case 'increase-hp':
            adjustHP(1);
            break;
        case 'decrease-mp':
            adjustMP(e.target.dataset.class, -1);
            break;
        case 'increase-mp':
            adjustMP(e.target.dataset.class, 1);
            break;
        case 'use-hit-dice':
            useHitDice(e.target.dataset.class);
            break;
        case 'add-weapon':
            addWeapon();
            break;
        case 'add-armor':
            addArmor();
            break;
        case 'add-effect':
            addEffect();
            break;
        case 'add-inventory':
            addInventoryItem();
            break;
        case 'close-modal':
            closeModal();
            break;
    }
}

// Handle field changes
function handleFieldChange(e) {
    const field = e.target.dataset.field;
    if (!field) return;

    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setNestedProperty(currentCharacter, field, value);

    // Trigger specific updates based on field
    if (field.includes('hitPoints')) {
        updateHPBar();
        checkBloodiedStatus();
    }

    if (field.includes('attributes')) {
        updateAllSkillBonuses();
    }

    saveCharacter();
}

// Helper function to set nested object properties
function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
}

// Helper function to get nested object properties
function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Update all calculations
function updateAllCalculations() {
    // Update attribute modifiers
    ['toughness', 'reflexes', 'intellect', 'willpower'].forEach(attr => {
        updateAttributeModifier(attr);
    });

    // Update skill bonuses
    updateAllSkillBonuses();

    // Update HP-related calculations
    updateBloodiedThreshold();
    updateHPBar();

    // Update MP
    updateMagickPoints();

    // Update carry capacity
    updateCarryCapacity();

    // Update XP threshold
    updateXPThreshold();

    // Check bloodied status
    checkBloodiedStatus();
}

// Attribute modifier calculation
function updateAttributeModifier(attribute) {
    const scoreInput = document.getElementById(`${attribute}Score`);
    const modifierDisplay = document.getElementById(`${attribute}Modifier`);

    if (!scoreInput || !modifierDisplay) return;

    const score = parseInt(scoreInput.value) || 10;
    const modifier = score - 10;

    currentCharacter.attributes[attribute].score = score;
    currentCharacter.attributes[attribute].modifier = modifier;

    modifierDisplay.textContent = modifier >= 0 ? `+${modifier}` : modifier;
}

// Skill attribute mappings
const SKILL_ATTRIBUTES = {
    combat: {
        melee: ['toughness', 'reflexes'],
        ranged: ['toughness', 'reflexes'],
        spellcraft: ['intellect', 'willpower']
    },
    general: {
        maneuver: ['toughness', 'reflexes'],
        sneak: ['reflexes', 'intellect'],
        study: ['intellect', 'willpower'],
        craft: ['toughness', 'intellect'],
        barter: ['intellect', 'willpower'],
        endure: ['toughness', 'willpower'],
        deceive: ['reflexes', 'willpower']
    }
};

// Update all skill bonuses
function updateAllSkillBonuses() {
    // Combat skills
    updateCombatSkill('melee');
    updateCombatSkill('ranged');
    updateCombatSkill('spellcraft');

    // General skills
    updateGeneralSkill('maneuver');
    updateGeneralSkill('sneak');
    updateGeneralSkill('study');
    updateGeneralSkill('craft');
    updateGeneralSkill('barter');
    updateGeneralSkill('endure');
    updateGeneralSkill('deceive');
}

// Update combat skill (shows both attribute scores)
function updateCombatSkill(skillName) {
    const rankInput = document.getElementById(`${skillName}Rank`);
    if (!rankInput) return;

    const rank = parseInt(rankInput.value) || 0;
    const attributes = SKILL_ATTRIBUTES.combat[skillName];

    attributes.forEach(attr => {
        const displayElement = document.getElementById(`${skillName}${attr.charAt(0).toUpperCase() + attr.slice(1)}`);
        if (!displayElement) return;

        const attrModifier = currentCharacter.attributes[attr]?.modifier || 0;
        const score = rank + attrModifier;

        displayElement.textContent = score >= 0 ? `+${score}` : score;
    });
}

// Update general skill (shows both attribute scores with bonus)
function updateGeneralSkill(skillName) {
    const rankInput = document.getElementById(`${skillName}Rank`);
    const bonusInput = document.getElementById(`${skillName}Bonus`);
    if (!rankInput || !bonusInput) return;

    const rank = parseInt(rankInput.value) || 0;
    const bonus = parseInt(bonusInput.value) || 0;
    const attributes = SKILL_ATTRIBUTES.general[skillName];

    attributes.forEach(attr => {
        const displayElement = document.getElementById(`${skillName}${attr.charAt(0).toUpperCase() + attr.slice(1)}`);
        if (!displayElement) return;

        const attrModifier = currentCharacter.attributes[attr]?.modifier || 0;
        const score = rank + attrModifier + bonus;

        displayElement.textContent = score >= 0 ? `+${score}` : score;
    });
}

// HP Management
function adjustHP(amount) {
    const currentHPInput = document.getElementById('currentHP');
    const maxHP = currentCharacter.hitPoints.maximum;
    let newHP = currentCharacter.hitPoints.current + amount;

    // Clamp between 0 and max
    newHP = Math.max(0, Math.min(maxHP, newHP));

    currentCharacter.hitPoints.current = newHP;
    currentHPInput.value = newHP;

    updateHPBar();
    checkBloodiedStatus();
    saveCharacter();
}

// Update HP bar visual
function updateHPBar() {
    const current = currentCharacter.hitPoints.current;
    const max = currentCharacter.hitPoints.maximum;
    const percentage = (current / max) * 100;

    const hpFill = document.getElementById('hpFill');
    const hpPercentage = document.getElementById('hpPercentage');

    if (hpFill) {
        hpFill.style.width = `${percentage}%`;

        // Update color based on HP level
        hpFill.classList.remove('low', 'bloodied');
        if (percentage <= 25) {
            hpFill.classList.add('bloodied');
        } else if (percentage <= 50) {
            hpFill.classList.add('low');
        }
    }

    if (hpPercentage) {
        hpPercentage.textContent = `${Math.round(percentage)}%`;
    }
}

// Update bloodied threshold
function updateBloodiedThreshold() {
    const maxHP = currentCharacter.hitPoints.maximum;
    const threshold = Math.floor(maxHP / 2);

    currentCharacter.hitPoints.bloodiedThreshold = threshold;

    const thresholdDisplay = document.getElementById('bloodiedThreshold');
    if (thresholdDisplay) {
        thresholdDisplay.textContent = threshold;
    }
}

// Check bloodied status
function checkBloodiedStatus() {
    const current = currentCharacter.hitPoints.current;
    const threshold = currentCharacter.hitPoints.bloodiedThreshold;
    const wasBloodied = currentCharacter.bloodiedStatus.isBloodied;
    const isNowBloodied = current < threshold && current > 0;

    currentCharacter.bloodiedStatus.isBloodied = isNowBloodied;
    currentCharacter.hitPoints.isBloodied = isNowBloodied;

    const bloodiedAlert = document.getElementById('bloodiedAlert');
    if (bloodiedAlert) {
        if (isNowBloodied) {
            bloodiedAlert.classList.add('active');

            // Track if this is first time bloodied in encounter
            if (!wasBloodied) {
                currentCharacter.bloodiedStatus.encounterTracker.becameBloodiedThisEncounter = true;
                showNotification('You are now Bloodied! Special ability activated.', 'warning');
            }
        } else {
            bloodiedAlert.classList.remove('active');
        }
    }
}

// Magick Points Management
function updateMagickPoints() {
    updateClassMagickPoints('class1');
    updateClassMagickPoints('class2');

    // Show/hide MP section based on whether any class has spellcasting
    const mpSection = document.getElementById('mpSection');
    const hasAnySpellcasting = currentCharacter.magickPoints.class1.hasSpellcasting ||
                               currentCharacter.magickPoints.class2.hasSpellcasting;

    if (mpSection) {
        if (hasAnySpellcasting) {
            mpSection.classList.add('active');
        } else {
            mpSection.classList.remove('active');
        }
    }
}

function updateClassMagickPoints(classSlot) {
    const classId = currentCharacter.characterInfo[classSlot];
    if (!classId || !CLASSES[classId]) return;

    const classData = CLASSES[classId];
    const mpData = currentCharacter.magickPoints[classSlot];

    mpData.hasSpellcasting = classData.hasSpellcasting || false;

    if (!mpData.hasSpellcasting) {
        // Hide this class's MP tracker
        const tracker = document.getElementById(`${classSlot}MPTracker`);
        if (tracker) tracker.style.display = 'none';
        return;
    }

    // Show tracker
    const tracker = document.getElementById(`${classSlot}MPTracker`);
    if (tracker) tracker.style.display = 'block';

    // Get spellcasting data
    const spellcasting = classData.spellcasting;
    mpData.spellcastingAttribute = spellcasting.attribute;
    mpData.magickTypes = spellcasting.magickTypes;
    mpData.damageDie = spellcasting.damageDie;
    mpData.healingDie = spellcasting.healingDie;
    mpData.damageTypes = spellcasting.damageTypes;

    // Calculate maximum MP
    const attrModifier = currentCharacter.attributes[spellcasting.attribute].modifier;
    const classLevel = currentCharacter.characterInfo.level; // Simplified - assumes equal levels
    mpData.maximum = attrModifier + (2 * classLevel);

    // Update UI
    const titleElement = document.getElementById(`${classSlot}MPTitle`);
    const attrElement = document.getElementById(`${classSlot}SpellcastingAttr`);
    const maxMPElement = document.getElementById(`${classSlot}MaxMP`);
    const magickTypesElement = document.getElementById(`${classSlot}MagickTypes`);
    const damageDieElement = document.getElementById(`${classSlot}DamageDie`);
    const healingDieElement = document.getElementById(`${classSlot}HealingDie`);
    const damageTypesElement = document.getElementById(`${classSlot}DamageTypes`);

    if (titleElement) titleElement.textContent = `${classData.name} MP`;
    if (attrElement) attrElement.textContent = spellcasting.attribute.charAt(0).toUpperCase() + spellcasting.attribute.slice(1);
    if (maxMPElement) maxMPElement.textContent = mpData.maximum;
    if (magickTypesElement) magickTypesElement.textContent = spellcasting.magickTypes.join(', ');
    if (damageDieElement) damageDieElement.textContent = spellcasting.damageDie;
    if (healingDieElement) healingDieElement.textContent = spellcasting.healingDie;
    if (damageTypesElement) damageTypesElement.textContent = spellcasting.damageTypes.join(', ');
}

function adjustMP(classSlot, amount) {
    const mpData = currentCharacter.magickPoints[classSlot];
    const currentMPInput = document.getElementById(`${classSlot}CurrentMP`);

    let newMP = mpData.current + amount;
    newMP = Math.max(0, Math.min(mpData.maximum, newMP));

    mpData.current = newMP;
    if (currentMPInput) currentMPInput.value = newMP;

    saveCharacter();
}

// Hit Dice Management
function useHitDice(classSlot) {
    const diceData = currentCharacter.hitDice[classSlot];

    if (diceData.current <= 0) {
        showNotification('No hit dice available!', 'error');
        return;
    }

    // Roll the hit die
    const dieType = diceData.dieType;
    const dieMax = parseInt(dieType.substring(1));
    const roll = Math.floor(Math.random() * dieMax) + 1;

    // Add Toughness modifier
    const toughMod = currentCharacter.attributes.toughness.modifier;
    const healing = Math.max(1, roll + toughMod); // Minimum 1 HP

    // Heal the character
    const maxHP = currentCharacter.hitPoints.maximum;
    const currentHP = currentCharacter.hitPoints.current;
    const newHP = Math.min(maxHP, currentHP + healing);

    currentCharacter.hitPoints.current = newHP;
    document.getElementById('currentHP').value = newHP;

    // Decrease available hit dice
    diceData.current--;
    diceData.expended++;

    document.getElementById(`${classSlot}CurrentDice`).value = diceData.current;

    updateHPBar();
    checkBloodiedStatus();
    saveCharacter();

    showNotification(`Used ${dieType}! Rolled ${roll} + ${toughMod} = ${healing} HP healed.`, 'success');
}

// Carry Capacity
function updateCarryCapacity() {
    const toughnessScore = currentCharacter.attributes.toughness.score;
    const size = parseFloat(currentCharacter.characterInfo.size);

    const maxCapacity = toughnessScore * (size || 1);
    currentCharacter.equipment.carryCapacity.maximum = maxCapacity;

    const maxCapacityElement = document.getElementById('maxCapacity');
    if (maxCapacityElement) maxCapacityElement.textContent = maxCapacity;

    // Calculate current weight
    let currentWeight = 0;
    currentCharacter.equipment.inventory.forEach(item => {
        currentWeight += (item.weight || 0) * (item.quantity || 1);
    });

    currentCharacter.equipment.carryCapacity.current = currentWeight;
    const currentWeightElement = document.getElementById('currentWeight');
    if (currentWeightElement) currentWeightElement.textContent = currentWeight.toFixed(1);
}

// XP Threshold
function updateXPThreshold() {
    const level = currentCharacter.characterInfo.level;
    const nextLevel = Math.min(10, level + 1);
    const threshold = XP_THRESHOLDS[nextLevel];

    currentCharacter.characterInfo.experiencePoints.nextLevel = threshold;

    const nextLevelXPElement = document.getElementById('nextLevelXP');
    if (nextLevelXPElement) nextLevelXPElement.textContent = threshold;
}

// Class change handler
function handleClassChange(e) {
    const classSlot = e.target.id; // 'class1' or 'class2'
    const classId = e.target.value;

    if (!classId) return;

    const classData = CLASSES[classId];

    // Update hit die for this class
    currentCharacter.hitDice[classSlot].dieType = classData.hitDie;
    document.getElementById(`${classSlot}DieType`).value = classData.hitDie;

    // Update multi-class name
    updateMultiClassName();

    // Update class features
    updateClassFeatures(classSlot, classData);

    // Update magick points if applicable
    updateMagickPoints();

    // Update bloodied effects
    updateBloodiedEffects();

    saveCharacter();
}

function updateMultiClassName() {
    const class1Id = currentCharacter.characterInfo.class1;
    const class2Id = currentCharacter.characterInfo.class2;

    let multiClassName = "";

    if (class1Id && class2Id && class1Id !== class2Id) {
        const class1Name = CLASSES[class1Id]?.name || "";
        const class2Name = CLASSES[class2Id]?.name || "";

        // Check for cross-class name
        const crossClassKey = getCrossClassKey(class1Id, class2Id);
        const crossClassData = crossClassKey && CROSS_CLASS_FEATURES ? CROSS_CLASS_FEATURES[crossClassKey] : null;

        if (crossClassData && crossClassData.name !== 'TBD') {
            multiClassName = `${class1Name} / ${class2Name} - ${crossClassData.name}`;
        } else {
            multiClassName = `${class1Name}/${class2Name}`;
        }
    } else if (class1Id) {
        multiClassName = CLASSES[class1Id]?.name || "";
    }

    currentCharacter.characterInfo.multiClassName = multiClassName;
    document.getElementById('multiClassName').value = multiClassName;
}

function updateClassFeatures(classSlot, classData) {
    const featuresTextarea = document.getElementById(`${classSlot}Features`);
    if (!featuresTextarea) return;

    const level = currentCharacter.characterInfo.level;
    let features = "";

    // Get cross-class info if both classes are selected
    const class1Id = currentCharacter.characterInfo.class1;
    const class2Id = currentCharacter.characterInfo.class2;
    const crossClassKey = getCrossClassKey(class1Id, class2Id);
    const crossClassData = crossClassKey && CROSS_CLASS_FEATURES ? CROSS_CLASS_FEATURES[crossClassKey] : null;

    for (let i = 1; i <= level; i++) {
        if (classData.features[`level${i}`]) {
            features += `Level ${i}: ${classData.features[`level${i}`]}\n`;
        }

        // Add cross-class features at levels 3 and 8 (only show in class1 slot to avoid duplication)
        if (classSlot === 'class1' && crossClassData && crossClassData.name !== 'TBD') {
            if (i === 3 && crossClassData.level3 && crossClassData.level3 !== 'TBD') {
                features += `\n--- ${crossClassData.name} Cross-Class Feature ---\n`;
                features += `Level 3: ${crossClassData.level3}\n`;
            }
            if (i === 8 && crossClassData.level8 && crossClassData.level8 !== 'TBD') {
                features += `\n--- ${crossClassData.name} Cross-Class Feature ---\n`;
                features += `Level 8: ${crossClassData.level8}\n`;
            }
        }
    }

    currentCharacter.features.classFeatures[`${classSlot}Features`].generalFeatures = features;
    currentCharacter.features.classFeatures[`${classSlot}Features`].bloodiedEffect = classData.bloodiedEffect;

    featuresTextarea.value = features;
}

function updateBloodiedEffects() {
    const bloodiedEffectsContainer = document.getElementById('bloodiedEffects');
    if (!bloodiedEffectsContainer) return;

    bloodiedEffectsContainer.innerHTML = '';

    const class1Id = currentCharacter.characterInfo.class1;
    const class2Id = currentCharacter.characterInfo.class2;

    if (class1Id && CLASSES[class1Id]) {
        const effect = CLASSES[class1Id].bloodiedEffect;
        bloodiedEffectsContainer.innerHTML += createBloodiedEffectCard('Class 1', effect);
    }

    if (class2Id && CLASSES[class2Id]) {
        const effect = CLASSES[class2Id].bloodiedEffect;
        bloodiedEffectsContainer.innerHTML += createBloodiedEffectCard('Class 2', effect);
    }

    // Show/hide choice selector
    const choiceElement = document.getElementById('bloodiedChoice');
    if (choiceElement) {
        choiceElement.style.display = (class1Id && class2Id) ? 'flex' : 'none';
    }
}

function createBloodiedEffectCard(className, effect) {
    return `
        <div class="bloodied-effect-card">
            <h4>${effect.name} (${className})</h4>
            <p><strong>Trigger:</strong> ${effect.trigger}</p>
            <p><strong>Effect:</strong> ${effect.description}</p>
            <p><strong>Mechanics:</strong> ${effect.mechanics}</p>
            <p><strong>Duration:</strong> ${effect.duration}</p>
        </div>
    `;
}

// Species change handler
function handleSpeciesChange(e) {
    const speciesId = e.target.value;
    if (!speciesId) return;

    const speciesData = SPECIES[speciesId];
    currentCharacter.features.speciesFeatures = speciesData.features;

    document.getElementById('speciesFeatures').value = speciesData.features;
    saveCharacter();
}

// Trade change handler
function handleTradeChange(e) {
    const tradeId = e.target.value;
    if (!tradeId) return;

    const tradeData = TRADES[tradeId];
    currentCharacter.features.tradeFeatures = tradeData.features;

    document.getElementById('tradeFeatures').value = tradeData.features;
    saveCharacter();
}

// Level change handler
function handleLevelChange(e) {
    const newLevel = parseInt(e.target.value);
    currentCharacter.characterInfo.level = newLevel;

    // Update hit dice totals
    currentCharacter.hitDice.class1.total = newLevel;
    currentCharacter.hitDice.class2.total = newLevel;

    document.getElementById('class1TotalDice').textContent = newLevel;
    document.getElementById('class2TotalDice').textContent = newLevel;

    // Update XP threshold
    updateXPThreshold();

    // Update MP
    updateMagickPoints();

    // Update class features
    const class1Id = currentCharacter.characterInfo.class1;
    const class2Id = currentCharacter.characterInfo.class2;

    if (class1Id && CLASSES[class1Id]) {
        updateClassFeatures('class1', CLASSES[class1Id]);
    }

    if (class2Id && CLASSES[class2Id]) {
        updateClassFeatures('class2', CLASSES[class2Id]);
    }

    saveCharacter();
}

// Equipment Management
function addWeapon() {
    const weapon = {
        id: Date.now().toString(),
        name: "New Weapon",
        range: "Melee",
        damage: "1d6",
        size: "Medium",
        properties: "",
        equipped: false
    };

    currentCharacter.equipment.weapons.push(weapon);
    renderEquipment();
    saveCharacter();
}

function addArmor() {
    const armor = {
        id: Date.now().toString(),
        name: "New Armor",
        acBonus: 0,
        speedReduction: 0,
        damageReduction: "",
        equipped: false
    };

    currentCharacter.equipment.armor.push(armor);
    renderEquipment();
    saveCharacter();
}

function addEffect() {
    const effect = {
        name: "New Effect",
        description: ""
    };

    currentCharacter.equipment.otherEffects.push(effect);
    renderEquipment();
    saveCharacter();
}

function addInventoryItem() {
    const item = {
        id: Date.now().toString(),
        name: "New Item",
        quantity: 1,
        weight: 0
    };

    currentCharacter.equipment.inventory.push(item);
    renderEquipment();
    saveCharacter();
}

function renderEquipment() {
    renderWeapons();
    renderArmor();
    renderEffects();
    renderInventory();
    updateCarryCapacity();
}

function renderWeapons() {
    const container = document.getElementById('weaponsList');
    if (!container) return;

    container.innerHTML = '';

    currentCharacter.equipment.weapons.forEach((weapon, index) => {
        const div = document.createElement('div');
        div.className = 'equipment-item';
        div.innerHTML = `
            <button class="remove-item-btn" onclick="removeWeapon(${index})">×</button>
            <div class="equipment-item-grid">
                <input type="text" placeholder="Weapon Name" value="${weapon.name}"
                       onchange="updateWeapon(${index}, 'name', this.value)">
                <input type="text" placeholder="Range" value="${weapon.range}"
                       onchange="updateWeapon(${index}, 'range', this.value)">
                <input type="text" placeholder="Damage" value="${weapon.damage}"
                       onchange="updateWeapon(${index}, 'damage', this.value)">
                <input type="text" placeholder="Size" value="${weapon.size}"
                       onchange="updateWeapon(${index}, 'size', this.value)">
                <input type="text" placeholder="Properties" value="${weapon.properties}"
                       onchange="updateWeapon(${index}, 'properties', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function renderArmor() {
    const container = document.getElementById('armorList');
    if (!container) return;

    container.innerHTML = '';

    currentCharacter.equipment.armor.forEach((armor, index) => {
        const div = document.createElement('div');
        div.className = 'equipment-item';
        div.innerHTML = `
            <button class="remove-item-btn" onclick="removeArmor(${index})">×</button>
            <div class="equipment-item-grid">
                <input type="text" placeholder="Armor Name" value="${armor.name}"
                       onchange="updateArmor(${index}, 'name', this.value)">
                <input type="number" placeholder="AC Bonus" value="${armor.acBonus}"
                       onchange="updateArmor(${index}, 'acBonus', this.value)">
                <input type="number" placeholder="Speed Reduction" value="${armor.speedReduction}"
                       onchange="updateArmor(${index}, 'speedReduction', this.value)">
                <input type="text" placeholder="Damage Reduction" value="${armor.damageReduction}"
                       onchange="updateArmor(${index}, 'damageReduction', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEffects() {
    const container = document.getElementById('effectsList');
    if (!container) return;

    container.innerHTML = '';

    currentCharacter.equipment.otherEffects.forEach((effect, index) => {
        const div = document.createElement('div');
        div.className = 'equipment-item';
        div.innerHTML = `
            <button class="remove-item-btn" onclick="removeEffect(${index})">×</button>
            <div class="equipment-item-grid">
                <input type="text" placeholder="Effect Name" value="${effect.name}"
                       onchange="updateEffect(${index}, 'name', this.value)">
                <input type="text" placeholder="Description" value="${effect.description}"
                       onchange="updateEffect(${index}, 'description', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function renderInventory() {
    const container = document.getElementById('inventoryList');
    if (!container) return;

    container.innerHTML = '';

    currentCharacter.equipment.inventory.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'equipment-item';
        div.innerHTML = `
            <button class="remove-item-btn" onclick="removeInventoryItem(${index})">×</button>
            <div class="equipment-item-grid">
                <input type="text" placeholder="Item Name" value="${item.name}"
                       onchange="updateInventoryItem(${index}, 'name', this.value)">
                <input type="number" placeholder="Quantity" value="${item.quantity}"
                       onchange="updateInventoryItem(${index}, 'quantity', this.value)">
                <input type="number" placeholder="Weight" value="${item.weight}" step="0.1"
                       onchange="updateInventoryItem(${index}, 'weight', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

// Equipment update functions (global scope for onclick handlers)
window.updateWeapon = function(index, field, value) {
    currentCharacter.equipment.weapons[index][field] = value;
    saveCharacter();
};

window.removeWeapon = function(index) {
    currentCharacter.equipment.weapons.splice(index, 1);
    renderEquipment();
    saveCharacter();
};

window.updateArmor = function(index, field, value) {
    currentCharacter.equipment.armor[index][field] = field.includes('Bonus') || field.includes('Reduction') ? parseFloat(value) : value;
    saveCharacter();
};

window.removeArmor = function(index) {
    currentCharacter.equipment.armor.splice(index, 1);
    renderEquipment();
    saveCharacter();
};

window.updateEffect = function(index, field, value) {
    currentCharacter.equipment.otherEffects[index][field] = value;
    saveCharacter();
};

window.removeEffect = function(index) {
    currentCharacter.equipment.otherEffects.splice(index, 1);
    renderEquipment();
    saveCharacter();
};

window.updateInventoryItem = function(index, field, value) {
    currentCharacter.equipment.inventory[index][field] = field === 'name' ? value : parseFloat(value);
    updateCarryCapacity();
    saveCharacter();
};

window.removeInventoryItem = function(index) {
    currentCharacter.equipment.inventory.splice(index, 1);
    renderEquipment();
    saveCharacter();
};

// Character Management
function newCharacter() {
    if (confirm('Create a new character? This will clear the current character data.')) {
        currentCharacter = JSON.parse(JSON.stringify({
            characterInfo: {
                characterName: "",
                playerName: "",
                multiClassName: "",
                species: "",
                trade: "",
                class1: "",
                class2: "",
                level: 1,
                size: 1,
                experiencePoints: { current: 0, nextLevel: 300 }
            },
            attributes: {
                toughness: { score: 10, modifier: 0, defense: 10 },
                reflexes: { score: 10, modifier: 0, defense: 10 },
                intellect: { score: 10, modifier: 0, defense: 10 },
                willpower: { score: 10, modifier: 0, defense: 10 }
            },
            hitPoints: {
                current: 10,
                maximum: 10,
                temporary: 0,
                bloodiedThreshold: 5,
                isBloodied: false
            },
            hitDice: {
                class1: { dieType: "d6", total: 1, current: 1, expended: 0 },
                class2: { dieType: "d6", total: 1, current: 1, expended: 0 }
            },
            magickPoints: {
                class1: {
                    hasSpellcasting: false,
                    current: 0,
                    maximum: 0,
                    spellcastingAttribute: "intellect",
                    magickTypes: [],
                    damageDie: "",
                    healingDie: "",
                    damageTypes: []
                },
                class2: {
                    hasSpellcasting: false,
                    current: 0,
                    maximum: 0,
                    spellcastingAttribute: "intellect",
                    magickTypes: [],
                    damageDie: "",
                    healingDie: "",
                    damageTypes: []
                }
            },
            bloodiedStatus: {
                isBloodied: false,
                activeBloodiedEffect: "class1",
                encounterTracker: {
                    becameBloodiedThisEncounter: false,
                    encounterStartedBloodied: false
                }
            },
            combat: {
                armorClass: 10,
                speed: 6,
                combatSkills: {
                    melee: { rank: 0 },
                    ranged: { rank: 0 },
                    spellcraft: { rank: 0 }
                }
            },
            generalSkills: {
                maneuver: { rank: 0, bonus: 0 },
                sneak: { rank: 0, bonus: 0 },
                study: { rank: 0, bonus: 0 },
                craft: { rank: 0, bonus: 0 },
                barter: { rank: 0, bonus: 0 },
                endure: { rank: 0, bonus: 0 },
                deceive: { rank: 0, bonus: 0 }
            },
            equipment: {
                weapons: [],
                armor: [],
                otherEffects: [],
                inventory: [],
                currency: { shells: 0 },
                carryCapacity: { current: 0, maximum: 10 }
            },
            features: {
                classFeatures: {
                    class1Features: {
                        generalFeatures: "",
                        bloodiedEffect: { name: "", description: "", mechanics: "" }
                    },
                    class2Features: {
                        generalFeatures: "",
                        bloodiedEffect: { name: "", description: "", mechanics: "" }
                    }
                },
                speciesFeatures: "",
                tradeFeatures: ""
            }
        }));

        loadCharacterToUI();
        saveCharacter();
        showNotification('New character created!', 'success');
    }
}

function saveCharacter() {
    const key = `hedgewood_character_${currentSlot}`;
    localStorage.setItem(key, JSON.stringify(currentCharacter));
}

function loadCharacter(slot) {
    const key = `hedgewood_character_${slot}`;
    const saved = localStorage.getItem(key);

    if (saved) {
        currentCharacter = JSON.parse(saved);
    }

    loadCharacterToUI();
}

function loadCharacterToUI() {
    // Load all fields with data-field attributes
    document.querySelectorAll('[data-field]').forEach(element => {
        const field = element.dataset.field;
        const value = getNestedProperty(currentCharacter, field);

        if (element.type === 'checkbox') {
            element.checked = value;
        } else {
            element.value = value !== undefined ? value : '';
        }
    });

    // Render equipment
    renderEquipment();

    // Update all calculations
    updateAllCalculations();

    // Update bloodied effects
    updateBloodiedEffects();
}

function exportCharacter() {
    const dataStr = JSON.stringify(currentCharacter, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentCharacter.characterInfo.characterName || 'character'}_hedgewood.json`;
    link.click();

    URL.revokeObjectURL(url);
    showNotification('Character exported!', 'success');
}

function showImportDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                currentCharacter = imported;
                loadCharacterToUI();
                saveCharacter();
                showNotification('Character imported successfully!', 'success');
            } catch (error) {
                showNotification('Error importing character: Invalid file', 'error');
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

// Modal functions
function closeModal() {
    const modal = document.getElementById('importExportModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Print functionality
window.print = function() {
    window.print();
};
