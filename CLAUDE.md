# CLAUDE.md - Hedgewood Helper

## Project Overview

Hedgewood Helper is a client-side TTRPG (Tabletop RPG) companion tool built with **vanilla JavaScript, HTML5, and CSS3**. It has three main modules: a Spell Creator, a Character Sheet Manager, and a Foraging & Crafting Guide. There is no backend, no build system, and no package manager — all files are served as static assets.

## Architecture

```
Hedgewood-Helper/
├── index.html / script.js / data.js / styles.css          # Spell Creator
├── character-sheet.html / character-sheet.js / character-sheet-data.js / character-sheet.css  # Character Sheet
├── character-sheet-pdf.js                                  # PDF export (uses jsPDF from CDN)
├── foraging.html / foraging.js / foraging-data.js / foraging.css  # Foraging Guide
└── PDF_EXPORT_README.md                                    # PDF feature docs
```

### Module Breakdown

| Module | HTML | Logic | Data | Styles |
|--------|------|-------|------|--------|
| Spell Creator | `index.html` | `script.js` | `data.js` | `styles.css` |
| Character Sheet | `character-sheet.html` | `character-sheet.js` | `character-sheet-data.js` | `character-sheet.css` |
| PDF Export | (shared with Character Sheet) | `character-sheet-pdf.js` | — | — |
| Foraging Guide | `foraging.html` | `foraging.js` | `foraging-data.js` | `foraging.css` |

Each module follows a **data file + logic file** separation. Data files contain frozen game-rule definitions; logic files handle UI rendering, state management, and persistence.

### External Dependencies

- **jsPDF** — loaded from `cdnjs.cloudflare.com` via `<script>` tag in `character-sheet.html`. Used only by `character-sheet-pdf.js` for PDF generation.
- No npm packages, no bundlers, no other external libraries.

### Data Persistence

All user data (characters, spells) is stored in **LocalStorage**. Character data is keyed by slot (`character_1` through `character_5`). Spells are stored in the `state.savedSpells` array and serialized to LocalStorage.

## Development Workflow

### Running Locally

Open any HTML file directly in a browser, or serve with any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js (if npx is available)
npx serve .
```

No build step, transpilation, or compilation is needed.

### Testing

There is **no automated test suite**. All testing is manual through the browser UI. When making changes, verify behavior by:

1. Opening the relevant HTML page in a browser
2. Testing the affected feature interactively
3. Checking the browser console for errors
4. Verifying LocalStorage data is saved/loaded correctly

### Linting & Formatting

There are **no linting or formatting tools** configured (no ESLint, Prettier, etc.). Follow the existing code style (see conventions below).

### Git Workflow

- Feature branches are merged via pull requests
- Branch naming convention: `claude/[feature-description]-[id]`

## Code Conventions

### JavaScript

- **Vanilla JS only** — no frameworks, no jQuery, no TypeScript
- **camelCase** for variables and functions, **UPPER_SNAKE_CASE** for constants
- **Centralized state objects** — each module has a top-level `state` or `currentCharacter` object that holds all application state
- **DOM caching** — frequently accessed elements are stored in a `DOM` object, populated by a `cacheDOMElements()` function at startup
- **Query caching** — selector results cached in a `cachedQueries` object with `invalidateQueryCache()` for invalidation
- **Event delegation** — click handlers on `document` route to action handlers via `data-action` attributes
- **DocumentFragment** for batch DOM updates — build elements in a fragment, append once
- **`createElement()` helper** — use the project's `createElement(tag, className, content, useHTML)` utility instead of raw `document.createElement`
- **Data immutability** — game data objects are deep-frozen with `Object.freeze()` at load time. Never mutate data definitions.
- **Input sanitization** — all user-provided strings pass through `sanitizeHTML()` or `sanitizeText()` before being rendered. Always use `textContent` over `innerHTML` when possible.
- **Rate limiting** — save operations use a cooldown (`SAVE_COOLDOWN = 1000ms`) to prevent rapid-fire writes
- **Notification system** — use `showNotification(message, type, duration)` instead of `alert()` or `console.log` for user-facing messages

### CSS

- **CSS custom properties** defined in `:root` for colors, spacing, shadows, transitions (e.g., `--color-primary`, `--border-radius`, `--transition`)
- Responsive design using CSS Grid and Flexbox
- Each module has its own stylesheet; `styles.css` contains shared/global styles

### HTML

- **Content Security Policy** enforced via `<meta>` tags in all HTML files
- CSP allows `'self'` and `https://cdnjs.cloudflare.com` for scripts; `'unsafe-inline'` for styles
- Scripts are loaded at the end of `<body>` — data file first, then logic file

### File Organization

- **Data files** (`data.js`, `character-sheet-data.js`, `foraging-data.js`) contain only data definitions and are loaded before their corresponding logic files
- **Logic files** (`script.js`, `character-sheet.js`, `foraging.js`) contain all UI rendering, event handling, and state management
- **Keep data and logic separated** — never put rendering code in data files or game-rule data in logic files

## Security Considerations

- All HTML files enforce Content Security Policy
- User input is sanitized before DOM insertion (`sanitizeHTML`, `sanitizeText`)
- `textContent` preferred over `innerHTML` to prevent XSS
- LocalStorage data is validated on load
- Rate limiting on save operations prevents abuse

## Key Patterns to Follow When Making Changes

1. **Read the relevant data file first** to understand available game data structures before modifying logic
2. **Freeze any new data objects** — if adding game data, wrap it with `Object.freeze()` or add it to the existing `deepFreeze` IIFE
3. **Cache new DOM references** — if adding elements that are accessed frequently, add them to the `DOM` object and populate in `cacheDOMElements()`
4. **Use event delegation** — add `data-action` attributes to new interactive elements and handle them in the existing click handler rather than adding new `addEventListener` calls
5. **Use DocumentFragment** — when rendering lists or grids, build in a fragment and append once
6. **Sanitize all user input** — any string from user input or LocalStorage must be sanitized before DOM insertion
7. **Update CSP if adding external resources** — if a new CDN or external script is needed, update the CSP `<meta>` tag in the relevant HTML file
8. **Keep files flat** — this project has no directory nesting; all source files live in the root
9. **No build step required** — changes are immediately reflected when the HTML file is reloaded
