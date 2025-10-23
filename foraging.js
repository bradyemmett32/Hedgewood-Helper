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
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
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
    const container = document.createElement('div');
    container.className = 'notification-container';
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

// Application state
const state = {
    inventory: {},
    currentFilter: 'all'
};

// DOM Cache
const DOM = {
    plantsGrid: null,
    mushroomsGrid: null,
    inventorySummary: null,
    clearInventoryBtn: null
};

// Performance: Cached Query Results
const cachedQueries = {
    filterButtons: null,
    forageCards: null
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
    DOM.plantsGrid = document.getElementById('plantsGrid');
    DOM.mushroomsGrid = document.getElementById('mushroomsGrid');
    DOM.inventorySummary = document.getElementById('inventorySummary');
    DOM.clearInventoryBtn = document.getElementById('clearInventory');
}

// Security: Validate inventory data structure
function isValidInventory(inventory) {
    if (!inventory || typeof inventory !== 'object' || Array.isArray(inventory)) {
        return false;
    }

    // Validate each entry
    for (const [key, value] of Object.entries(inventory)) {
        // Key should be string in format "plant-N" or "mushroom-N"
        if (typeof key !== 'string' || !key.match(/^(plant|mushroom)-\d+$/)) {
            return false;
        }
        // Value should be a positive integer
        if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
            return false;
        }
    }

    return true;
}

// Load inventory from localStorage
function loadInventory() {
    // Security: Load and validate saved inventory from localStorage
    try {
        const saved = localStorage.getItem('foragingInventory');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (isValidInventory(parsed)) {
                state.inventory = parsed;
            } else {
                console.warn('Invalid inventory data found, resetting inventory');
                state.inventory = {};
                localStorage.removeItem('foragingInventory');
            }
        }
    } catch (e) {
        console.error('Failed to load saved inventory:', e);
        state.inventory = {};
        // Clear corrupted data
        localStorage.removeItem('foragingInventory');
    }
}

// Performance: Debounce localStorage writes
let saveTimeout;
function debouncedLocalStorageSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        try {
            localStorage.setItem('foragingInventory', JSON.stringify(state.inventory));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            showNotification('Failed to save inventory. Storage may be full.', 'error');
        }
    }, 300);
}

// Save inventory to localStorage with rate limiting
function saveInventory() {
    // Security: Rate limiting
    if (!canSave()) {
        return;
    }
    debouncedLocalStorageSave();
}

// Initialize the app
function init() {
    cacheDOMElements();
    loadInventory();
    renderPlants();
    renderMushrooms();
    updateInventorySummary();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Performance: Event delegation for all clicks
    document.addEventListener('click', handleClick);
}

// Main Click Handler (Event Delegation)
function handleClick(e) {
    const target = e.target;

    // Filter button clicks
    if (target.classList.contains('filter-btn')) {
        handleFilterClick(target);
        return;
    }

    // Quantity adjustment buttons
    if (target.classList.contains('qty-btn')) {
        const id = target.dataset.id;
        const delta = target.classList.contains('plus') ? 1 : -1;
        adjustQuantity(id, delta);
        return;
    }

    // Clear inventory button
    if (target.id === 'clearInventory') {
        handleClearInventory();
        return;
    }
}

// Handle filter button clicks
function handleFilterClick(btn) {
    // Performance: Use cached query result
    if (!cachedQueries.filterButtons) {
        cachedQueries.filterButtons = document.querySelectorAll('.filter-btn');
    }
    cachedQueries.filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentFilter = btn.dataset.filter;
    filterItems();
}

// Handle clear inventory
function handleClearInventory() {
    // Security: Use non-blocking notification instead of confirm
    showNotification('Click Clear All again within 3 seconds to confirm', 'warning', 3000);

    if (DOM.clearInventoryBtn.dataset.confirmClear === 'true') {
        state.inventory = {};
        saveInventory();
        updateInventorySummary();
        renderPlants();
        renderMushrooms();
        showNotification('Inventory cleared successfully', 'success');
        DOM.clearInventoryBtn.dataset.confirmClear = 'false';
    } else {
        DOM.clearInventoryBtn.dataset.confirmClear = 'true';
        setTimeout(() => {
            DOM.clearInventoryBtn.dataset.confirmClear = 'false';
        }, 3000);
    }
}

// Filter items based on current filter
function filterItems() {
    // Performance: Use cached query result and toggle visibility instead of re-rendering
    if (!cachedQueries.forageCards) {
        cachedQueries.forageCards = document.querySelectorAll('.forage-card');
    }

    cachedQueries.forageCards.forEach(card => {
        if (state.currentFilter === 'all') {
            card.style.display = 'block';
        } else {
            const effects = card.dataset.effects.toLowerCase();
            if (effects.includes(state.currentFilter.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Render plants
function renderPlants() {
    DOM.plantsGrid.innerHTML = '';
    invalidateQueryCache('forageCards'); // Performance: Clear cache on re-render

    // Performance: Use DocumentFragment for batch DOM operations
    const fragment = document.createDocumentFragment();

    foragingData.plants.forEach((plant, index) => {
        const card = createForageCard(plant, `plant-${index}`, index + 1);
        fragment.appendChild(card);
    });

    DOM.plantsGrid.appendChild(fragment);
}

// Render mushrooms
function renderMushrooms() {
    DOM.mushroomsGrid.innerHTML = '';
    invalidateQueryCache('forageCards'); // Performance: Clear cache on re-render

    // Performance: Use DocumentFragment for batch DOM operations
    const fragment = document.createDocumentFragment();

    foragingData.mushrooms.forEach((mushroom, index) => {
        const card = createForageCard(mushroom, `mushroom-${index}`, index + 1);
        fragment.appendChild(card);
    });

    DOM.mushroomsGrid.appendChild(fragment);
}

// Create a forage card
function createForageCard(item, id, rollNumber) {
    const card = document.createElement('div');
    card.className = 'forage-card';
    card.dataset.effects = Object.values(item.effects).join(',');

    const quantity = state.inventory[id] || 0;

    // Security: Sanitize data even though it's from frozen objects
    card.innerHTML = `
        <div class="forage-header">
            <div class="roll-number">${sanitizeHTML(String(rollNumber))}</div>
            <h3 class="forage-name">${sanitizeHTML(item.name)}</h3>
            <div class="quantity-control">
                <button class="qty-btn minus" data-id="${sanitizeHTML(id)}">−</button>
                <span class="quantity-display">${sanitizeHTML(String(quantity))}</span>
                <button class="qty-btn plus" data-id="${sanitizeHTML(id)}">+</button>
            </div>
        </div>
        <p class="forage-description">${sanitizeHTML(item.description)}</p>
        <div class="effects-grid">
            <div class="effect-item">
                <strong>🧪 Alchemist:</strong>
                <span>${sanitizeHTML(item.effects.alchemist)}</span>
            </div>
            <div class="effect-item">
                <strong>🍳 Cook:</strong>
                <span>${sanitizeHTML(item.effects.cook)}</span>
            </div>
            <div class="effect-item">
                <strong>🌱 Herbalogist:</strong>
                <span>${sanitizeHTML(item.effects.herbalogist)}</span>
            </div>
        </div>
    `;

    // Performance: No individual event listeners - using event delegation instead

    return card;
}

// Adjust quantity
function adjustQuantity(id, delta) {
    const current = state.inventory[id] || 0;
    const newValue = Math.max(0, current + delta);
    
    if (newValue === 0) {
        delete state.inventory[id];
    } else {
        state.inventory[id] = newValue;
    }
    
    saveInventory();
    updateQuantityDisplay(id, newValue);
    updateInventorySummary();
}

// Update quantity display for a specific item
function updateQuantityDisplay(id, quantity) {
    const card = document.querySelector(`[data-id="${id}"]`).closest('.forage-card');
    const display = card.querySelector('.quantity-display');
    display.textContent = quantity;

    // Performance: Use requestAnimationFrame for animations
    display.classList.add('quantity-updated');
    requestAnimationFrame(() => {
        setTimeout(() => {
            requestAnimationFrame(() => {
                display.classList.remove('quantity-updated');
            });
        }, 300);
    });
}

// Update inventory summary
function updateInventorySummary() {
    if (Object.keys(state.inventory).length === 0) {
        DOM.inventorySummary.innerHTML = '<p class="empty-inventory">No items collected yet. Use the + buttons to add items to your inventory.</p>';
        return;
    }

    // Get all items with quantities
    const items = [];

    foragingData.plants.forEach((plant, index) => {
        const id = `plant-${index}`;
        if (state.inventory[id]) {
            items.push({ name: plant.name, quantity: state.inventory[id], type: '🌿' });
        }
    });

    foragingData.mushrooms.forEach((mushroom, index) => {
        const id = `mushroom-${index}`;
        if (state.inventory[id]) {
            items.push({ name: mushroom.name, quantity: state.inventory[id], type: '🍄' });
        }
    });

    // Sort by quantity descending
    items.sort((a, b) => b.quantity - a.quantity);

    // Performance: Use DocumentFragment for efficient DOM building
    const fragment = document.createDocumentFragment();
    const listDiv = document.createElement('div');
    listDiv.className = 'inventory-list';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';

        const iconSpan = document.createElement('span');
        iconSpan.className = 'item-icon';
        iconSpan.textContent = item.type;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = item.name;

        const quantitySpan = document.createElement('span');
        quantitySpan.className = 'item-quantity';
        quantitySpan.textContent = `×${item.quantity}`;

        itemDiv.appendChild(iconSpan);
        itemDiv.appendChild(nameSpan);
        itemDiv.appendChild(quantitySpan);
        listDiv.appendChild(itemDiv);
    });

    fragment.appendChild(listDiv);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalDiv = document.createElement('div');
    totalDiv.className = 'inventory-total';
    totalDiv.textContent = `Total Items: ${totalItems}`;
    fragment.appendChild(totalDiv);

    DOM.inventorySummary.innerHTML = '';
    DOM.inventorySummary.appendChild(fragment);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
