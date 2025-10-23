// Security: Input Sanitization
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function sanitizeText(str) {
    if (typeof str !== 'string') return '';
    // Remove HTML tags and limit length
    return str.replace(/<[^>]*>/g, '').trim().slice(0, 200);
}

// Security: Non-blocking notification system (replaces alert())
function showNotification(message, type = 'info', duration = 3000) {
    const notification = createElement('div', `notification notification-${type}`);
    notification.textContent = message;

    const container = document.getElementById('notificationContainer') || createNotificationContainer();
    container.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    // Auto-dismiss
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function createNotificationContainer() {
    const container = createElement('div', 'notification-container');
    container.id = 'notificationContainer';
    document.body.appendChild(container);
    return container;
}

// Security: Rate limiting for save operations
let lastSaveTime = 0;
const SAVE_COOLDOWN = 1000; // 1 second between saves

function canSave() {
    const now = Date.now();
    if (now - lastSaveTime < SAVE_COOLDOWN) {
        return false;
    }
    lastSaveTime = now;
    return true;
}

// Application State
const state = {
    channelActions: 0,
    playerLevel: 1,
    selectedClasses: [],
    selected: {
        spellType: null,
        base: null,
        damageType: null,
        healType: null,
        effectType: null,
        modules: [],
        extraBuffs: {}
    },
    savedSpells: [],
    currentSpell: null
};

// DOM Cache
const DOM = {
    channelCount: null,
    playerLevel: null,
    classGrid: null,
    classInfo: null,
    spellTypeSelector: null,
    spellTypeLabel: null,
    spellBaseOptions: null,
    typeLabel: null,
    typeOptions: null,
    componentModules: null,
    extraBuffSection: null,
    extraBuffSelections: null,
    availableModules: null,
    generateBtn: null,
    resetBtn: null,
    spellOutput: null,
    spellName: null,
    spellStats: null,
    spellDescription: null,
    savedSpellsList: null,
    spellNamingDialog: null,
    spellNameInput: null,
    sections: {}
};

// Performance: Cached Query Results
const cachedQueries = {
    spellTypeCards: null,
    spellOptions: null,
    damageTypeOptions: null,
    componentModules: null,
    classOptions: null,
    allSections: null
};

function invalidateQueryCache(key = null) {
    if (key) {
        cachedQueries[key] = null;
    } else {
        Object.keys(cachedQueries).forEach(k => cachedQueries[k] = null);
    }
}

// Initialize DOM Cache
function cacheDOMElements() {
    DOM.channelCount = document.getElementById('channelCount');
    DOM.playerLevel = document.getElementById('playerLevel');
    DOM.classGrid = document.getElementById('classGrid');
    DOM.classInfo = document.getElementById('classInfo');
    DOM.spellTypeSelector = document.getElementById('spellTypeSelector');
    DOM.spellTypeLabel = document.getElementById('spellTypeLabel');
    DOM.spellBaseOptions = document.getElementById('spellBaseOptions');
    DOM.typeLabel = document.getElementById('typeLabel');
    DOM.typeOptions = document.getElementById('typeOptions');
    DOM.componentModules = document.getElementById('componentModules');
    DOM.extraBuffSection = document.getElementById('extraBuffSection');
    DOM.extraBuffSelections = document.getElementById('extraBuffSelections');
    DOM.availableModules = document.getElementById('availableModules');
    DOM.generateBtn = document.getElementById('generateBtn');
    DOM.resetBtn = document.getElementById('resetBtn');
    DOM.spellOutput = document.getElementById('spellOutput');
    DOM.spellName = document.getElementById('spellName');
    DOM.spellStats = document.getElementById('spellStats');
    DOM.spellDescription = document.getElementById('spellDescription');
    DOM.savedSpellsList = document.getElementById('savedSpellsList');
    DOM.spellNamingDialog = document.getElementById('spellNamingDialog');
    DOM.spellNameInput = document.getElementById('spellNameInput');
    
    DOM.sections = {
        spellType: document.getElementById('spellTypeSection'),
        spellBase: document.getElementById('spellBaseSection'),
        damageType: document.getElementById('damageTypeSection'),
        component: document.getElementById('componentSection')
    };
}

// Event Delegation
function setupEventListeners() {
    // Global click handler
    document.addEventListener('click', handleClick);

    // Player level change
    DOM.playerLevel.addEventListener('change', updatePlayerLevel);

    // Spell name input
    DOM.spellNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') confirmSpellGeneration();
        if (e.key === 'Escape') closeDialog();
    });

    // Performance: Add passive listeners for scroll performance
    const scrollableElements = [DOM.componentModules];
    scrollableElements.forEach(element => {
        if (element) {
            element.addEventListener('scroll', () => {}, { passive: true });
            element.addEventListener('touchstart', () => {}, { passive: true });
            element.addEventListener('touchmove', () => {}, { passive: true });
        }
    });
}

// Main Click Handler
function handleClick(e) {
    const target = e.target;
    const action = target.dataset.action;
    
    if (!action) return;
    
    e.preventDefault();
    
    const actionHandlers = {
        'adjust-channel': () => adjustChannelActions(parseInt(target.dataset.value)),
        'reset': resetSpell,
        'show-naming-dialog': showSpellNamingDialog,
        'confirm-spell': confirmSpellGeneration,
        'close-dialog': closeDialog,
        'save-spell': saveSpell,
        'export-spell': exportSpell
    };
    
    if (actionHandlers[action]) {
        actionHandlers[action]();
    }
}

// Utility Functions
function createElement(tag, className, content, useHTML = false) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) {
        // Security: Use textContent by default, innerHTML only when explicitly needed
        if (useHTML) {
            el.innerHTML = content;
        } else {
            el.textContent = content;
        }
    }
    return el;
}

function toggleClass(element, className, force) {
    if (force !== undefined) {
        element.classList.toggle(className, force);
    } else {
        element.classList.toggle(className);
    }
}

// Class Management
function renderClasses() {
    const fragment = document.createDocumentFragment();
    
    Object.entries(classData).forEach(([key, cls]) => {
        const div = createElement('div', 'class-option', cls.name);
        div.dataset.classKey = key;
        div.addEventListener('click', () => toggleClassSelection(key));
        fragment.appendChild(div);
    });
    
    DOM.classGrid.appendChild(fragment);
}

function toggleClassSelection(key) {
    const index = state.selectedClasses.indexOf(key);

    if (index > -1) {
        state.selectedClasses.splice(index, 1);
    } else {
        if (state.selectedClasses.length >= 2) {
            showNotification('You can only select up to 2 magical classes!', 'warning');
            return;
        }
        state.selectedClasses.push(key);
    }

    // Performance: Invalidate dice cache when classes change
    invalidateDiceCache();

    updateClassUI();
    updateClassInfo();

    if (state.selected.base?.type === 'attack' && DOM.sections.damageType.classList.contains('active')) {
        renderDamageTypes();
    }
}

function updateClassUI() {
    // Performance: Use cached query result
    if (!cachedQueries.classOptions) {
        cachedQueries.classOptions = document.querySelectorAll('.class-option');
    }
    cachedQueries.classOptions.forEach(el => {
        const key = el.dataset.classKey;
        toggleClass(el, 'selected', state.selectedClasses.includes(key));
    });
}

function updateClassInfo() {
    if (state.selectedClasses.length === 0) {
        DOM.classInfo.innerHTML = '';
        return;
    }

    // Performance: Use DocumentFragment for efficient DOM building
    const fragment = document.createDocumentFragment();

    const header = createElement('strong', null, 'Selected Classes:');
    fragment.appendChild(header);
    fragment.appendChild(document.createElement('br'));

    state.selectedClasses.forEach(key => {
        const cls = classData[key];
        const classLine = document.createTextNode(`• ${cls.name}: ${cls.description}`);
        fragment.appendChild(classLine);
        fragment.appendChild(document.createElement('br'));

        const statsLine = document.createTextNode(`  Damage: ${cls.damageDie} | Healing: ${cls.healingDie}`);
        fragment.appendChild(statsLine);
        fragment.appendChild(document.createElement('br'));
    });

    const availableTypes = getAvailableDamageTypes();
    if (availableTypes.length > 0) {
        fragment.appendChild(document.createElement('br'));
        const typesHeader = createElement('strong', null, 'Available Damage Types: ');
        fragment.appendChild(typesHeader);

        const typeNames = availableTypes.map(t => {
            for (const category of Object.values(spellData.damageTypes)) {
                if (category[t]) return category[t].name;
            }
            return t;
        }).join(', ');

        const typesText = document.createTextNode(typeNames);
        fragment.appendChild(typesText);
    }

    DOM.classInfo.innerHTML = '';
    DOM.classInfo.appendChild(fragment);
}

function getAvailableDamageTypes() {
    if (state.selectedClasses.length === 0) {
        const allTypes = [];
        for (const category of Object.values(spellData.damageTypes)) {
            allTypes.push(...Object.keys(category));
        }
        return allTypes;
    }
    
    const types = new Set();
    state.selectedClasses.forEach(key => {
        classData[key].damageTypes.forEach(type => types.add(type));
    });
    return Array.from(types);
}

// Performance: Cache dice calculations
const diceCache = {
    damage: null,
    healing: null,
    lastClassesHash: null
};

function getClassesHash() {
    return state.selectedClasses.sort().join(',');
}

function getDamageDice() {
    const classesHash = getClassesHash();

    // Performance: Return cached result if classes haven't changed
    if (diceCache.damage && diceCache.lastClassesHash === classesHash) {
        return diceCache.damage;
    }

    if (state.selectedClasses.length === 0) {
        diceCache.damage = "1d8";
        diceCache.lastClassesHash = classesHash;
        return diceCache.damage;
    }

    const dice = state.selectedClasses.map(key => classData[key].damageDie);
    dice.sort((a, b) => {
        const sizeA = parseInt(a.match(/d(\d+)/)[1]);
        const sizeB = parseInt(b.match(/d(\d+)/)[1]);
        return sizeB - sizeA;
    });

    diceCache.damage = dice[0];
    diceCache.lastClassesHash = classesHash;
    return diceCache.damage;
}

function getHealingDice() {
    const classesHash = getClassesHash();

    // Performance: Return cached result if classes haven't changed
    if (diceCache.healing && diceCache.lastClassesHash === classesHash) {
        return diceCache.healing;
    }

    if (state.selectedClasses.length === 0) {
        diceCache.healing = "1d8";
        diceCache.lastClassesHash = classesHash;
        return diceCache.healing;
    }

    const dice = state.selectedClasses.map(key => classData[key].healingDie);
    dice.sort((a, b) => {
        const sizeA = parseInt(a.match(/d(\d+)/)[1]);
        const sizeB = parseInt(b.match(/d(\d+)/)[1]);
        return sizeB - sizeA;
    });

    diceCache.healing = dice[0];
    diceCache.lastClassesHash = classesHash;
    return diceCache.healing;
}

// Clear dice cache when classes change
function invalidateDiceCache() {
    diceCache.damage = null;
    diceCache.healing = null;
    diceCache.lastClassesHash = null;
}

// Player Level
function updatePlayerLevel() {
    // Security: Validate input is integer within bounds
    let level = parseInt(DOM.playerLevel.value, 10);

    if (isNaN(level) || level < 1 || level > 10) {
        level = Math.max(1, Math.min(10, level || 1));
        DOM.playerLevel.value = level;
        showNotification('Level must be between 1 and 10', 'warning', 2000);
    }

    state.playerLevel = level;

    if (DOM.sections.damageType.classList.contains('active')) {
        if (state.selected.base?.type === 'heal') {
            renderHealTypes();
        } else if (state.selected.base?.type === 'effect') {
            renderEffectTypes();
        }
    }
}

// Channel Actions
function adjustChannelActions(change) {
    state.channelActions = Math.max(0, Math.min(10, state.channelActions + change));
    DOM.channelCount.textContent = state.channelActions;
    updateAvailableModules();
    
    const maxModules = state.channelActions + 1;
    if (state.selected.modules.length > maxModules) {
        state.selected.modules = state.selected.modules.slice(0, maxModules);
        updateModuleStates();
    }
}

function updateAvailableModules() {
    const maxModules = state.channelActions + 1;
    const available = maxModules - state.selected.modules.length;
    DOM.availableModules.textContent = available;
}

// Spell Type Selection
function renderSpellTypes() {
    const fragment = document.createDocumentFragment();

    Object.entries(spellTypeConfig).forEach(([type, config]) => {
        const card = createElement('div', 'spell-type-card');
        card.dataset.spellType = type;

        // Security: Build DOM safely without innerHTML
        const icon = createElement('div', 'spell-type-icon', config.icon);
        const name = createElement('div', 'spell-type-name', config.name);
        const desc = createElement('div', null, config.description);
        desc.style.fontSize = '0.85em';
        desc.style.marginTop = '5px';

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(desc);
        card.addEventListener('click', () => selectSpellType(type));
        fragment.appendChild(card);
    });

    DOM.spellTypeSelector.appendChild(fragment);
}

function selectSpellType(type) {
    // Performance: Use cached query result
    if (!cachedQueries.spellTypeCards) {
        cachedQueries.spellTypeCards = document.querySelectorAll('.spell-type-card');
    }
    cachedQueries.spellTypeCards.forEach(el => {
        toggleClass(el, 'selected', el.dataset.spellType === type);
    });

    state.selected.spellType = type;
    state.selected.base = null;
    state.selected.damageType = null;
    state.selected.healType = null;
    state.selected.effectType = null;
    state.selected.modules = [];

    DOM.resetBtn.style.display = 'inline-block';
    DOM.sections.spellBase.classList.add('active');

    const typeLabels = {
        attack: 'Attack Spell',
        heal: 'Healing Spell',
        effect: 'Effect Spell'
    };
    DOM.spellTypeLabel.textContent = typeLabels[type];

    renderSpellBases(type);

    DOM.sections.damageType.classList.remove('active');
    DOM.sections.component.classList.remove('active');
    DOM.generateBtn.style.display = 'none';
    DOM.spellOutput.classList.remove('visible');
}

// Spell Base Selection
function renderSpellBases(type) {
    DOM.spellBaseOptions.innerHTML = '';
    invalidateQueryCache('spellOptions'); // Performance: Clear cache on re-render

    let spells = {};
    let info = '';

    if (type === 'attack') {
        spells = spellData.attackSpells;
    } else if (type === 'heal') {
        spells = spellData.healSpells;
        info = '<div class="warning">Healing expends one of the target\'s Hit Dice. If unavailable, they take one level of Fatigue.</div>';
    } else if (type === 'effect') {
        spells = spellData.effectSpells;
        info = '<div class="info-box">Effect spells create areas that trigger when creatures start their turn in or enter the area.</div>';
    }

    if (info) DOM.spellBaseOptions.innerHTML = info;

    const grid = createElement('div', 'spell-base-grid');
    const fragment = document.createDocumentFragment();

    Object.entries(spells).forEach(([key, spell]) => {
        const div = createElement('div', 'spell-option');
        div.dataset.baseKey = key;

        let diceInfo = '';
        if (spell.damage && key !== 'meleeStrike' && key !== 'rangedStrike') {
            const damageDie = getDamageDice();
            diceInfo = `<div class="dice-info">${sanitizeHTML(spell.damage)}×${sanitizeHTML(damageDie)}</div>`;
        }
        if (spell.healing) {
            const healingDie = getHealingDice();
            diceInfo = `<div class="dice-info">${sanitizeHTML(spell.healing)}×${sanitizeHTML(healingDie)}</div>`;
        }

        div.innerHTML = `
            <div class="spell-option-title">${sanitizeHTML(spell.name)}</div>
            <div class="spell-option-description">${sanitizeHTML(spell.description)}</div>
            ${diceInfo}
        `;
        div.addEventListener('click', () => selectSpellBase(key));
        fragment.appendChild(div);
    });

    grid.appendChild(fragment);
    DOM.spellBaseOptions.appendChild(grid);
}

function selectSpellBase(key) {
    // Performance: Use cached query result
    if (!cachedQueries.spellOptions) {
        cachedQueries.spellOptions = document.querySelectorAll('.spell-option');
    }
    cachedQueries.spellOptions.forEach(el => {
        toggleClass(el, 'selected', el.dataset.baseKey === key);
    });

    state.selected.base = { type: state.selected.spellType, key };
    state.selected.damageType = null;
    state.selected.healType = null;
    state.selected.effectType = null;
    state.selected.modules = [];

    DOM.sections.damageType.classList.add('active');

    if (state.selected.spellType === 'attack') {
        DOM.typeLabel.textContent = 'Damage Type';
        renderDamageTypes();
    } else if (state.selected.spellType === 'heal') {
        DOM.typeLabel.textContent = 'Healing Type';
        renderHealTypes();
    } else if (state.selected.spellType === 'effect') {
        DOM.typeLabel.textContent = 'Effect Type';
        renderEffectTypes();
    }

    DOM.sections.component.classList.add('active');
    renderComponentModules();
    updateModuleStates();
    updateAvailableModules();

    DOM.generateBtn.style.display = 'block';
}

// Damage Type Selection
function renderDamageTypes() {
    DOM.typeOptions.innerHTML = '';
    invalidateQueryCache('damageTypeOptions'); // Performance: Clear cache on re-render
    const availableTypes = getAvailableDamageTypes();
    
    Object.entries(spellData.damageTypes).forEach(([category, types]) => {
        const grid = createElement('div', 'damage-type-grid');
        const fragment = document.createDocumentFragment();
        let hasVisible = false;
        
        Object.entries(types).forEach(([key, type]) => {
            if (!availableTypes.includes(key)) return;

            hasVisible = true;
            const div = createElement('div', 'damage-type-option');
            div.dataset.damageType = key;

            // Security: Build DOM safely
            const nameDiv = createElement('div', null, type.name);
            const defenseDiv = createElement('div', null, `vs ${type.defense}`);
            defenseDiv.style.fontSize = '0.8em';
            defenseDiv.style.opacity = '0.8';

            div.appendChild(nameDiv);
            div.appendChild(defenseDiv);
            div.addEventListener('click', () => selectDamageType(key));
            fragment.appendChild(div);
        });
        
        if (hasVisible) {
            const categoryDiv = createElement('div', 'damage-type-category', category);
            DOM.typeOptions.appendChild(categoryDiv);
            grid.appendChild(fragment);
            DOM.typeOptions.appendChild(grid);
        }
    });
    
    if (state.selectedClasses.length > 0) {
        const note = createElement('div', 'info-box');
        note.style.marginTop = '15px';
        note.textContent = 'Available damage types are limited by your selected magical classes.';
        DOM.typeOptions.appendChild(note);
    }
}

function selectDamageType(key) {
    // Note: Not caching these queries as they change frequently
    document.querySelectorAll('#typeOptions .damage-type-option').forEach(el => {
        toggleClass(el, 'selected', el.dataset.damageType === key);
    });
    state.selected.damageType = key;
}

// Heal Type Selection
function renderHealTypes() {
    DOM.typeOptions.innerHTML = '';
    const grid = createElement('div', 'damage-type-grid');
    const fragment = document.createDocumentFragment();
    
    Object.entries(spellData.healTypes).forEach(([key, type]) => {
        if (type.level && type.level > state.playerLevel) return;

        const div = createElement('div', 'damage-type-option');
        div.dataset.healType = key;

        // Security: Build DOM safely
        const levelText = type.level ? ` (Lvl ${type.level}+)` : '';
        const nameDiv = createElement('div', null, type.name + levelText);
        const descDiv = createElement('div', null, type.description);
        descDiv.style.fontSize = '0.8em';
        descDiv.style.opacity = '0.8';

        div.appendChild(nameDiv);
        div.appendChild(descDiv);
        div.addEventListener('click', () => selectHealType(key));
        fragment.appendChild(div);
    });
    
    grid.appendChild(fragment);
    DOM.typeOptions.appendChild(grid);
}

function selectHealType(key) {
    document.querySelectorAll('#typeOptions .damage-type-option').forEach(el => {
        toggleClass(el, 'selected', el.dataset.healType === key);
    });
    state.selected.healType = key;
}

// Effect Type Selection
function renderEffectTypes() {
    DOM.typeOptions.innerHTML = '';
    
    // Positive Effects
    renderEffectCategory('Positive Effects (Allies)', spellData.positiveEffects, 'positive');
    
    // Negative Effects
    renderEffectCategory('Negative Effects (Enemies)', spellData.negativeEffects, 'negative');
    
    // Conditions
    const visibleConditions = Object.entries(spellData.conditions)
        .filter(([, condition]) => condition.level <= state.playerLevel);
    
    if (visibleConditions.length > 0) {
        renderEffectCategory('Conditions', Object.fromEntries(visibleConditions), 'condition');
    }
}

function renderEffectCategory(title, effects, category) {
    const categoryDiv = createElement('div', 'damage-type-category', title);
    const grid = createElement('div', 'damage-type-grid');
    const fragment = document.createDocumentFragment();

    Object.entries(effects).forEach(([key, effect]) => {
        const div = createElement('div', 'damage-type-option');
        div.dataset.effectCategory = category;
        div.dataset.effectKey = key;

        // Security: Build DOM safely
        const nameDiv = createElement('div', null, effect.name);
        div.appendChild(nameDiv);

        if (effect.single) {
            const detailText = `Single: ${effect.single} | Multi: ${effect.multi}${effect.defense ? ` | vs ${effect.defense}` : ''}`;
            const detailDiv = createElement('div', null, detailText);
            detailDiv.style.fontSize = '0.8em';
            div.appendChild(detailDiv);
        } else if (effect.defense) {
            const levelText = effect.level > 1 ? ` (Lvl ${effect.level}+)` : '';
            const detailDiv = createElement('div', null, `vs ${effect.defense}${levelText}`);
            detailDiv.style.fontSize = '0.8em';
            div.appendChild(detailDiv);
        }

        div.addEventListener('click', () => selectEffectType(category, key));
        fragment.appendChild(div);
    });

    grid.appendChild(fragment);
    DOM.typeOptions.appendChild(categoryDiv);
    DOM.typeOptions.appendChild(grid);
}

function selectEffectType(category, key) {
    document.querySelectorAll('#typeOptions .damage-type-option').forEach(el => {
        toggleClass(el, 'selected', 
            el.dataset.effectCategory === category && el.dataset.effectKey === key);
    });
    state.selected.effectType = { category, key };
}

// Component Modules
function renderComponentModules() {
    DOM.componentModules.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    Object.entries(spellData.componentModules).forEach(([key, module]) => {
        if (!isModuleApplicable(module)) return;
        
        const div = createElement('div', 'component-module');
        div.dataset.moduleKey = key;
        div.innerHTML = `
            <div class="component-module-title">${module.name}</div>
            <div class="component-module-description">${module.description}</div>
        `;
        div.addEventListener('click', () => toggleModule(key));
        fragment.appendChild(div);
    });
    
    DOM.componentModules.appendChild(fragment);
}

function isModuleApplicable(module) {
    if (!state.selected.base) return false;
    if (module.applicable.includes('all')) return true;
    if (module.applicable.includes(state.selected.base.type)) return true;
    if (module.applicable.includes(state.selected.base.key)) return true;
    return false;
}

function toggleModule(key) {
    const module = spellData.componentModules[key];
    if (!isModuleApplicable(module)) return;
    
    const index = state.selected.modules.indexOf(key);
    if (index > -1) {
        state.selected.modules.splice(index, 1);
        if (key === 'extraBuff') {
            delete state.selected.extraBuffs[`extraBuff_${index}`];
        }
    } else {
        const maxModules = state.channelActions + 1;
        if (state.selected.modules.length < maxModules) {
            state.selected.modules.push(key);
        }
    }
    
    updateModuleStates();
    updateAvailableModules();
    updateExtraBuffSection();
}

function updateModuleStates() {
    document.querySelectorAll('.component-module').forEach(el => {
        const key = el.dataset.moduleKey;
        el.classList.remove('selected', 'disabled');
        
        if (state.selected.modules.includes(key)) {
            el.classList.add('selected');
        } else if (state.selected.modules.length >= (state.channelActions + 1)) {
            el.classList.add('disabled');
        }
    });
}

// Extra Buff/Debuff
function updateExtraBuffSection() {
    const extraBuffCount = state.selected.modules.filter(m => m === 'extraBuff').length;
    
    if (extraBuffCount === 0) {
        DOM.extraBuffSection.style.display = 'none';
        return;
    }
    
    DOM.extraBuffSection.style.display = 'block';
    DOM.extraBuffSelections.innerHTML = '';
    
    for (let i = 0; i < extraBuffCount; i++) {
        const buffDiv = createElement('div');
        buffDiv.style.cssText = 'margin-bottom: 20px; padding: 15px; background: #f8f9ff; border-radius: 10px; border: 2px solid #ddd;';

        // Security: Build DOM safely
        const heading = createElement('h5', null, `Extra Effect #${i + 1}:`);
        heading.style.color = 'var(--color-primary)';
        heading.style.marginBottom = '10px';
        buffDiv.appendChild(heading);

        const container = createElement('div');
        container.id = `extraBuffOptions_${i}`;
        buffDiv.appendChild(container);

        DOM.extraBuffSelections.appendChild(buffDiv);
        renderExtraBuffOptions(i);
    }
}

function renderExtraBuffOptions(index) {
    const container = document.getElementById(`extraBuffOptions_${index}`);
    renderEffectCategory('Positive Effects (Allies)', spellData.positiveEffects, 'positive');
    renderEffectCategory('Negative Effects (Enemies)', spellData.negativeEffects, 'negative');
    
    const visibleConditions = Object.entries(spellData.conditions)
        .filter(([, condition]) => condition.level <= state.playerLevel);
    
    if (visibleConditions.length > 0) {
        renderEffectCategory('Conditions', Object.fromEntries(visibleConditions), 'condition');
    }
    
    // Re-append to correct container
    while (DOM.typeOptions.firstChild) {
        container.appendChild(DOM.typeOptions.firstChild);
    }
    
    // Add click handlers for extra buffs
    container.querySelectorAll('.damage-type-option').forEach(el => {
        el.addEventListener('click', () => selectExtraBuff(index, el.dataset.effectCategory, el.dataset.effectKey));
    });
}

function selectExtraBuff(index, category, key) {
    const container = document.getElementById(`extraBuffOptions_${index}`);
    container.querySelectorAll('.damage-type-option').forEach(el => {
        toggleClass(el, 'selected', 
            el.dataset.effectCategory === category && el.dataset.effectKey === key);
    });
    state.selected.extraBuffs[`extraBuff_${index}`] = { category, key };
}

// Spell Generation
function showSpellNamingDialog() {
    if (!validateSpell()) return;
    
    const tempSpell = compileSpell();
    DOM.spellNameInput.value = tempSpell.name;
    DOM.spellNamingDialog.classList.add('active');
    DOM.spellNameInput.focus();
    DOM.spellNameInput.select();
}

function validateSpell() {
    if (!state.selected.base) {
        showNotification('Please select a spell base!', 'error');
        return false;
    }

    if (state.selected.base.type === 'attack' && !state.selected.damageType) {
        showNotification('Please select a damage type!', 'error');
        return false;
    }

    if (state.selected.base.type === 'heal' && !state.selected.healType) {
        showNotification('Please select a healing type!', 'error');
        return false;
    }

    if (state.selected.base.type === 'effect' && !state.selected.effectType) {
        showNotification('Please select an effect type!', 'error');
        return false;
    }

    const extraBuffCount = state.selected.modules.filter(m => m === 'extraBuff').length;
    if (extraBuffCount > Object.keys(state.selected.extraBuffs).length) {
        showNotification('Please select all extra buff/debuff effects!', 'error');
        return false;
    }

    return true;
}

function closeDialog() {
    DOM.spellNamingDialog.classList.remove('active');
}

function confirmSpellGeneration() {
    const rawName = DOM.spellNameInput.value.trim();

    // Security: Sanitize user input - remove HTML tags and limit length
    const customName = sanitizeText(rawName);

    if (!customName || customName.length < 1 || customName.length > 100) {
        showNotification('Please enter a valid spell name (1-100 characters)!', 'error');
        return;
    }

    const spell = compileSpell();
    spell.name = customName;
    spell.customName = customName;

    closeDialog();
    displaySpell(spell);
    state.currentSpell = spell;
}

function compileSpell() {
    const spell = {
        base: state.selected.base,
        modules: [...state.selected.modules],
        extraBuffs: {...state.selected.extraBuffs},
        channelActions: state.channelActions,
        classes: [...state.selectedClasses],
        level: state.playerLevel
    };
    
    let baseData;
    if (state.selected.base.type === 'attack') {
        baseData = spellData.attackSpells[state.selected.base.key];
        spell.damageType = state.selected.damageType;
    } else if (state.selected.base.type === 'heal') {
        baseData = spellData.healSpells[state.selected.base.key];
        spell.healType = state.selected.healType;
    } else {
        baseData = spellData.effectSpells[state.selected.base.key];
        spell.effectType = state.selected.effectType;
    }
    
    spell.name = generateSpellName(spell, baseData);
    spell.description = generateSpellDescription(spell, baseData);
    spell.stats = generateSpellStats(spell, baseData);
    
    return spell;
}

function generateSpellName(spell, baseData) {
    let name = baseData.name;
    
    if (spell.damageType) {
        const damageData = findDamageType(spell.damageType);
        name = damageData.name + " " + name;
    } else if (spell.healType) {
        const healData = spellData.healTypes[spell.healType];
        if (spell.healType !== 'hp') {
            name = healData.name + " " + name;
        }
    } else if (spell.effectType) {
        const effectData = getEffectData(spell.effectType);
        name = effectData.name + " " + name;
    }
    
    if (spell.modules.includes('concentration')) {
        name = "Sustained " + name;
    }
    if (spell.modules.includes('extraDamage')) {
        name = "Empowered " + name;
    }
    
    return name;
}

function generateSpellDescription(spell, baseData) {
    let description = baseData.description;
    
    spell.modules.forEach(moduleKey => {
        const module = spellData.componentModules[moduleKey];
        if (moduleKey === 'extraBuff') {
            description += ` [${module.name}: ${module.description}]`;
        } else {
            description += ` [${module.name}: ${module.description}]`;
        }
    });
    
    Object.values(spell.extraBuffs || {}).forEach((extraBuff, index) => {
        const effectData = getEffectData(extraBuff);
        description += ` [Extra Effect ${index + 1}: ${effectData.name}]`;
    });
    
    return description;
}

function generateSpellStats(spell, baseData) {
    const stats = [];
    
    if (spell.classes.length > 0) {
        stats.push({ 
            label: "Class", 
            value: spell.classes.map(c => classData[c].name).join(" / ") 
        });
    }
    
    stats.push({ 
        label: "Type", 
        value: spell.base.type.charAt(0).toUpperCase() + spell.base.type.slice(1) 
    });
    
    if (baseData.range) {
        stats.push({ label: "Range", value: baseData.range });
    }
    
    if (baseData.area) {
        stats.push({ label: "Area", value: baseData.area });
    }
    
    if (baseData.damage) {
        if (spell.base.key === 'meleeStrike' || spell.base.key === 'rangedStrike') {
            let damage = baseData.damage;
            if (spell.modules.includes('extraDamage')) {
                damage += " + 1×" + getDamageDice();
            }
            stats.push({ label: "Damage", value: damage });
        } else {
            const damageDie = getDamageDice();
            let damage = baseData.damage + "×" + damageDie;
            if (spell.modules.includes('extraDamage')) {
                damage += " + 1×" + damageDie;
            }
            stats.push({ label: "Damage", value: damage });
        }
    } else if (baseData.healing) {
        const healingDie = getHealingDice();
        let healing = baseData.healing + "×" + healingDie;
        if (spell.modules.includes('extraHeal')) {
            healing += " + 1×" + healingDie;
        }
        stats.push({ label: "Healing", value: healing });
    }
    
    if (spell.damageType) {
        const damageData = findDamageType(spell.damageType);
        stats.push({ label: "Damage Type", value: damageData.name });
        stats.push({ label: "Defense", value: damageData.defense });
    }
    
    if (spell.effectType) {
        const effectData = getEffectData(spell.effectType);
        stats.push({ label: "Effect Type", value: effectData.name });
        if (effectData.defense) {
            stats.push({ label: "Defense", value: effectData.defense });
        }
        if (effectData.single) {
            stats.push({ 
                label: "Effect", 
                value: `Single Target: ${effectData.single}, Multi Target: ${effectData.multi}` 
            });
        }
    }
    
    const duration = spell.modules.includes('concentration') ? 
        "Concentration" : "Until end of next turn";
    stats.push({ label: "Duration", value: duration });
    
    stats.push({ label: "Channel Actions", value: state.channelActions });
    
    return stats;
}

function findDamageType(key) {
    for (const category of Object.values(spellData.damageTypes)) {
        if (category[key]) return category[key];
    }
    return null;
}

function getEffectData(effectType) {
    if (effectType.category === 'positive') {
        return spellData.positiveEffects[effectType.key];
    } else if (effectType.category === 'negative') {
        return spellData.negativeEffects[effectType.key];
    } else {
        return spellData.conditions[effectType.key];
    }
}

function displaySpell(spell) {
    // Security: Use textContent for user-provided names
    DOM.spellName.textContent = sanitizeText(spell.name);

    // Build stats HTML with sanitization
    let statsHtml = '';
    spell.stats.forEach(stat => {
        statsHtml += `
            <div class="detail-row">
                <span class="detail-label">${sanitizeHTML(String(stat.label))}:</span>
                <span class="detail-value">${sanitizeHTML(String(stat.value))}</span>
            </div>
        `;
    });
    DOM.spellStats.innerHTML = statsHtml;
    DOM.spellDescription.textContent = spell.description;

    DOM.spellOutput.classList.add('visible');
}

// Performance: Debounce localStorage writes
let saveTimeout;
function debouncedLocalStorageSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        try {
            localStorage.setItem('savedSpells', JSON.stringify(state.savedSpells));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            alert('Failed to save spell. Storage may be full.');
        }
    }, 300);
}

// Save and Export
function saveSpell() {
    if (!state.currentSpell) {
        showNotification('Generate a spell first!', 'warning');
        return;
    }

    // Security: Rate limiting
    if (!canSave()) {
        showNotification('Please wait before saving again', 'warning', 2000);
        return;
    }

    state.savedSpells.push({...state.currentSpell, id: Date.now()});
    debouncedLocalStorageSave();
    updateSavedSpellsList();
    showNotification(`${sanitizeText(state.currentSpell.name)} has been saved!`, 'success');
}

function exportSpell() {
    if (!state.currentSpell) {
        showNotification('Generate a spell first!', 'warning');
        return;
    }

    const spell = state.currentSpell;
    // Security: Sanitize spell name for export
    const safeName = sanitizeText(spell.name);
    let text = `===== ${safeName} =====\n\n`;

    if (spell.classes && spell.classes.length > 0) {
        text += `Classes: ${spell.classes.map(c => classData[c]?.name || c).join(', ')}\n`;
        text += `Level: ${spell.level}\n\n`;
    }

    text += `${spell.description}\n\n`;
    text += `--- Stats ---\n`;
    spell.stats.forEach(stat => {
        text += `${stat.label}: ${stat.value}\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Security: Sanitize filename
    const safeFilename = safeName.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50);
    a.download = `${safeFilename || 'spell'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Spell exported successfully!', 'success');
}

function updateSavedSpellsList() {
    if (state.savedSpells.length === 0) {
        DOM.savedSpellsList.innerHTML = '<p style="text-align: center; color: #999;">No saved spells yet!</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    state.savedSpells.forEach(spell => {
        const classText = spell.classes && spell.classes.length > 0 ?
            ` (${spell.classes.map(c => classData[c]?.name || c).join('/')})` : '';

        const card = createElement('div', 'spell-card');
        card.dataset.spellId = spell.id;

        // Security: Sanitize user-provided data in saved spells
        const safeName = sanitizeHTML(String(spell.name || 'Unnamed Spell'));
        const safeDescription = sanitizeHTML(String(spell.description || ''));
        const safeChannelActions = parseInt(spell.channelActions) || 0;
        const safeLevel = parseInt(spell.level) || 1;

        card.innerHTML = `
            <button class="delete-btn" data-spell-id="${spell.id}">×</button>
            <div style="font-weight: bold; font-size: 1.2em; color: var(--color-primary); margin-bottom: 8px;">
                ${safeName}${sanitizeHTML(classText)}
            </div>
            <div style="font-size: 0.95em;">${safeDescription}</div>
            <div style="margin-top: 8px; font-size: 0.85em; color: #666;">
                Channel Actions: ${safeChannelActions} | Level: ${safeLevel}
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                loadSpell(spell.id);
            }
        });

        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSpell(spell.id);
        });

        fragment.appendChild(card);
    });

    DOM.savedSpellsList.innerHTML = '';
    DOM.savedSpellsList.appendChild(fragment);
}

function loadSpell(id) {
    const spell = state.savedSpells.find(s => s.id === id);
    if (!spell) return;

    resetSpell();

    state.channelActions = spell.channelActions || 0;
    DOM.channelCount.textContent = state.channelActions;

    if (spell.level) {
        state.playerLevel = spell.level;
        DOM.playerLevel.value = spell.level;
    }

    if (spell.classes && Array.isArray(spell.classes)) {
        state.selectedClasses = [...spell.classes];
        updateClassUI();
        updateClassInfo();
    }

    if (spell.base && spell.base.type) {
        selectSpellType(spell.base.type);
    }

    // Performance: Use requestAnimationFrame instead of setTimeout
    requestAnimationFrame(() => {
        state.selected.base = spell.base;

        if (spell.damageType) state.selected.damageType = spell.damageType;
        if (spell.healType) state.selected.healType = spell.healType;
        if (spell.effectType) state.selected.effectType = spell.effectType;

        if (spell.modules && Array.isArray(spell.modules)) {
            state.selected.modules = [...spell.modules];
        }

        if (spell.extraBuffs) {
            state.selected.extraBuffs = {...spell.extraBuffs};
        }

        updateModuleStates();
        updateAvailableModules();
        updateExtraBuffSection();
        displaySpell(spell);
    });
}

function deleteSpell(id) {
    if (confirm('Delete this spell?')) {
        state.savedSpells = state.savedSpells.filter(s => s.id !== id);
        debouncedLocalStorageSave(); // Performance: Use debounced save
        updateSavedSpellsList();
    }
}

function resetSpell() {
    state.selected = {
        spellType: null,
        base: null,
        damageType: null,
        healType: null,
        effectType: null,
        modules: [],
        extraBuffs: {}
    };

    // Performance: Use cached queries for reset operations
    if (!cachedQueries.spellTypeCards) {
        cachedQueries.spellTypeCards = document.querySelectorAll('.spell-type-card');
    }
    cachedQueries.spellTypeCards.forEach(el => el.classList.remove('selected'));

    // Cache section queries if not already cached
    if (!cachedQueries.allSections) {
        cachedQueries.allSections = document.querySelectorAll('.section');
    }
    cachedQueries.allSections.forEach(el => el.classList.remove('active'));

    DOM.sections.spellType.classList.add('active');
    DOM.resetBtn.style.display = 'none';
    DOM.generateBtn.style.display = 'none';
    DOM.spellOutput.classList.remove('visible');
    DOM.extraBuffSection.style.display = 'none';

    updateAvailableModules();
}

// Security: Validate spell data structure
function isValidSpell(spell) {
    return spell &&
           typeof spell === 'object' &&
           spell.base &&
           spell.base.type &&
           Array.isArray(spell.modules) &&
           typeof spell.name === 'string' &&
           typeof spell.id !== 'undefined';
}

// Initialize Application
function init() {
    cacheDOMElements();
    setupEventListeners();

    // Security: Load and validate saved spells from localStorage
    try {
        const saved = localStorage.getItem('savedSpells');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                // Filter out invalid spell data
                state.savedSpells = parsed.filter(isValidSpell);

                // If some spells were filtered out, update localStorage
                if (state.savedSpells.length !== parsed.length) {
                    console.warn('Some saved spells were corrupted and removed');
                    localStorage.setItem('savedSpells', JSON.stringify(state.savedSpells));
                }
            } else {
                console.error('Invalid saved spells format');
                state.savedSpells = [];
            }
        }
    } catch (e) {
        console.error('Failed to load saved spells:', e);
        state.savedSpells = [];
        // Clear corrupted data
        localStorage.removeItem('savedSpells');
    }

    renderClasses();
    renderSpellTypes();
    updateSavedSpellsList();
    updateAvailableModules();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
