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

// Save inventory to localStorage with rate limiting
function saveInventory() {
    // Security: Rate limiting
    if (!canSave()) {
        return;
    }
    try {
        localStorage.setItem('foragingInventory', JSON.stringify(state.inventory));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        showNotification('Failed to save inventory. Storage may be full.', 'error');
    }
}

// Initialize the app
function init() {
    loadInventory();
    renderPlants();
    renderMushrooms();
    updateInventorySummary();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentFilter = btn.dataset.filter;
            filterItems();
        });
    });

    // Clear inventory button
    document.getElementById('clearInventory').addEventListener('click', () => {
        // Security: Use non-blocking notification instead of confirm
        showNotification('Click Clear All again within 3 seconds to confirm', 'warning', 3000);

        const btn = document.getElementById('clearInventory');
        if (btn.dataset.confirmClear === 'true') {
            state.inventory = {};
            saveInventory();
            updateInventorySummary();
            renderPlants();
            renderMushrooms();
            showNotification('Inventory cleared successfully', 'success');
            btn.dataset.confirmClear = 'false';
        } else {
            btn.dataset.confirmClear = 'true';
            setTimeout(() => {
                btn.dataset.confirmClear = 'false';
            }, 3000);
        }
    });
}

// Filter items based on current filter
function filterItems() {
    const allCards = document.querySelectorAll('.forage-card');
    
    allCards.forEach(card => {
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
    const grid = document.getElementById('plantsGrid');
    grid.innerHTML = '';
    
    foragingData.plants.forEach((plant, index) => {
        const card = createForageCard(plant, `plant-${index}`, index + 1);
        grid.appendChild(card);
    });
}

// Render mushrooms
function renderMushrooms() {
    const grid = document.getElementById('mushroomsGrid');
    grid.innerHTML = '';
    
    foragingData.mushrooms.forEach((mushroom, index) => {
        const card = createForageCard(mushroom, `mushroom-${index}`, index + 1);
        grid.appendChild(card);
    });
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

    // Add event listeners for quantity buttons
    card.querySelector('.minus').addEventListener('click', () => adjustQuantity(id, -1));
    card.querySelector('.plus').addEventListener('click', () => adjustQuantity(id, 1));

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
    
    // Add animation
    display.classList.add('quantity-updated');
    setTimeout(() => display.classList.remove('quantity-updated'), 300);
}

// Update inventory summary
function updateInventorySummary() {
    const summary = document.getElementById('inventorySummary');
    
    if (Object.keys(state.inventory).length === 0) {
        summary.innerHTML = '<p class="empty-inventory">No items collected yet. Use the + buttons to add items to your inventory.</p>';
        return;
    }
    
    let html = '<div class="inventory-list">';
    
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
    
    items.forEach(item => {
        // Security: Sanitize item data
        html += `
            <div class="inventory-item">
                <span class="item-icon">${sanitizeHTML(item.type)}</span>
                <span class="item-name">${sanitizeHTML(item.name)}</span>
                <span class="item-quantity">×${sanitizeHTML(String(item.quantity))}</span>
            </div>
        `;
    });

    html += '</div>';
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    html += `<div class="inventory-total">Total Items: ${sanitizeHTML(String(totalItems))}</div>`;
    
    summary.innerHTML = html;
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
