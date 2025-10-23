// Application state
const state = {
    inventory: {},
    currentFilter: 'all'
};

// Load inventory from localStorage
function loadInventory() {
    const saved = localStorage.getItem('foragingInventory');
    if (saved) {
        state.inventory = JSON.parse(saved);
    }
}

// Save inventory to localStorage
function saveInventory() {
    localStorage.setItem('foragingInventory', JSON.stringify(state.inventory));
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
        if (confirm('Clear all inventory? This cannot be undone.')) {
            state.inventory = {};
            saveInventory();
            updateInventorySummary();
            renderPlants();
            renderMushrooms();
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
    
    card.innerHTML = `
        <div class="forage-header">
            <div class="roll-number">${rollNumber}</div>
            <h3 class="forage-name">${item.name}</h3>
            <div class="quantity-control">
                <button class="qty-btn minus" data-id="${id}">−</button>
                <span class="quantity-display">${quantity}</span>
                <button class="qty-btn plus" data-id="${id}">+</button>
            </div>
        </div>
        <p class="forage-description">${item.description}</p>
        <div class="effects-grid">
            <div class="effect-item">
                <strong>🧪 Alchemist:</strong>
                <span>${item.effects.alchemist}</span>
            </div>
            <div class="effect-item">
                <strong>🍳 Cook:</strong>
                <span>${item.effects.cook}</span>
            </div>
            <div class="effect-item">
                <strong>🌱 Herbalogist:</strong>
                <span>${item.effects.herbalogist}</span>
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
        html += `
            <div class="inventory-item">
                <span class="item-icon">${item.type}</span>
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">×${item.quantity}</span>
            </div>
        `;
    });
    
    html += '</div>';
    html += `<div class="inventory-total">Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}</div>`;
    
    summary.innerHTML = html;
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
