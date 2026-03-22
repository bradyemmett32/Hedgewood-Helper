# Roll20 Character Sheet Reference

In Roll20, the character sheet code is basically wrapped inside a giant `<form>` tag (so don't use it).

* Most DOM functionalities can't be used.
* Do not use root HTML elements such as `<html>`, `<head>`, `<title>`, or `<body>` in your HTML. Doing so will prevent your character sheet from loading in the virtual tabletop.
* HTML Elements that don't work: `<meter>`, `<progress>`, `link`, `video`, `iframe`, `meta`, `input type="color"`. Trying to add any of these to a sheet will either result in Roll20 removing them or behave like they are a `<div>`.
* Restricted attributes examples: `autoplay`, `download`, `onclick`
* Elements that now work: `<datalist>`, `<details>`, `<summary>`, `<a href>`, `main`, `section`
* Enable use of `#id` in HTML elements, & `<a href=#>`
* Attribute names are case-insensitive when checked for uniqueness. All `<input>`, `<select>`, `<textarea>` etc. should have unique attribute names if intended to be independent. Two inputs with same attr name will mirror each other and update if the other one is changed.
* To create a section where you can dynamically add new entries, the Repeating Sections method is used through the `<fieldset>` element.
* `<input>` and `<button>` elements are restricted to a limited number of types. This is likely true with other elements.
* All images will be passed through the Roll20 image proxy to prevent security attacks. This should be largely transparent to you and shouldn't affect anything, but it's something to be aware of.
* `<svg>` elements aren't supported directly, but they can be used if saved as separate `.svg` files.
* All attributes in Roll Templates need to be written with double quotes, as single quotes results in roll template code being completely ignored.
  * Classes called in Roll Templates must use the `sheet-classname` format, like is used with Legacy Sheet.
* If using the Roll20-made rows & columns, need to prefix `sheet-` to their use in the HTML (likely in the CSS also).
* You cannot refer to external CSS stylesheets. Everything needs to be in the CSS file.

---

## CSS

* Certain media queries can now be used.
* Do not use `.sheet-new-window` as a CSS class name, as Roll20 already uses it and will block you from trying to override it.
* Roll20 have some predefined CSS classes for its custom row/column system and other defaults, so very generic class names like: `.sheet-row`, `.sheet-col`, `.sheet-3colrow`, `.sheet-2colrow`.
* `.sheet-character` is best to be avoided when naming your own CSS classes. If you use the predefined classes, you need to call them by their full name in the HTML.
* Repeating Sections have their own CSS restrictions.
* Default Fonts: The following fonts can be accessed by default: Arial, Patrick Hand, Contrail One, Shadows Into Light and Candal.
  * Google Fonts can be used with the `@import` function. **Note:** If you use `@import` with Google's own generated URL, you may see the following error: *Potential CSS security violation; character sheet template styling thrown out.* To work around this issue, change `css2?family` to `css?family` in the URL (i.e., remove the "2").
* Enable use of `#id` in HTML elements.
* You can't refer to external CSS stylesheets. Everything needs to be in the CSS file.

---

## Input Types

Roll20 supports the following `<input>` types. Every input that should be saved **must** have a `name` attribute starting with `attr_`.

| Type | Notes |
|---|---|
| `type="text"` | Free text. Use `attr_character_name` to auto-sync with the journal name. |
| `type="number"` | Integer preferred; shows increment arrows on focus. |
| `type="hidden"` | Saves a value invisibly — useful for internal state. |
| `type="checkbox"` | Boolean toggle. `value` sets what is stored when checked. |
| `type="radio"` | Group by sharing a `name`; each option has a unique `value`. Used for tab systems. |
| `type="range"` | Slider. Use `min`, `max`, `step` attributes. |

`<select>` (dropdowns) and `<textarea>` are also supported and must use `attr_` names.

**Default values:** set via the `value` attribute. If omitted, the default is `""`.

```html
<input type="number" name="attr_strength" value="10" />
<input type="hidden" name="attr_internal_flag" value="0" />
<input type="checkbox" name="attr_proficient" value="1" />
<select name="attr_dice_type">
  <option value="d6">d6</option>
  <option value="d8">d8</option>
</select>
<textarea name="attr_notes"></textarea>
```

---

## Attribute Syntax & the `attr_` Prefix

* Every saveable field's `name` must begin with `attr_`.
* When **referencing** an attribute in macros/rolls, drop the prefix: `@{strength}` not `@{attr_strength}`.
* Attribute names are **case-insensitive** for uniqueness checks.
* Two inputs sharing the same `attr_` name will mirror each other.
* `attr_character_name` is special: it syncs with the journal's character name.

```html
<!-- Sheet HTML -->
<input type="number" name="attr_strength" value="10" />

<!-- Macro / roll formula reference -->
@{CharacterName|strength}
```

**Name prefix conventions:**

| Prefix | Used For | Reference Without Prefix? |
|---|---|---|
| `attr_` | All attributes (inputs, selects, etc.) | Yes — `@{attrname}` |
| `roll_` | Roll buttons | Yes — `%{character|buttonname}` |
| `act_` | Action buttons | Yes — `clicked:buttonname` in sheet workers |
| `repeating_` | Repeating section fieldset class | N/A |
| `sheet-` | CSS classes (explicit in CSE, auto in Legacy) | N/A |

**CSS class note (Legacy sheets):** Any HTML class not starting with `attr_`, `roll_`, or `repeating_` is automatically prefixed with `sheet-`. In CSE, you must add `sheet-` yourself. Using `sheet-` explicitly on all classes is recommended for compatibility with both modes.

---

## Repeating Sections

Repeating sections are dynamic lists where the player can add/remove rows.

```html
<fieldset class="repeating_skills">
  <input type="text" name="attr_skillname" value="" />
  <input type="number" name="attr_skillrank" value="0" />
  <select name="attr_skillstat">
    <option value="strength">STR</option>
    <option value="dexterity">DEX</option>
  </select>
  <button type="roll" name="roll_skillroll"
    value="/roll 1d20 + @{skillrank}">Roll Skill</button>
</fieldset>
```

**Critical rules:**
* The `class` must start with `repeating_` followed by a **lowercase, no-underscore** name (e.g., `repeating_skills`, NOT `repeating_my_skills`).
* Each `fieldset` needs a **unique** class.
* Inside a repeating row, attributes reference each other **without the row ID** — Roll20 resolves scope automatically.
* Roll20 stores row data internally as `repeating_skills_-ROWID_skillname`.
* All fields used in buttons or auto-calc within a row **must be present in that same row** (can be hidden).
* Having a CSS `position` property on a container of a button in a repeating row can prevent the button from being recognized.

**Referencing from macros:**
```
@{CharacterName|repeating_skills_$0|skillname}   ← first row
@{CharacterName|repeating_skills_$1|skillname}   ← second row
```

---

## Roll Buttons

Roll buttons send a roll formula to the chat when clicked.

```html
<button type="roll" name="roll_attack"
  value="/roll 1d20 + @{strength_mod}">Attack</button>

<!-- With roll template -->
<button type="roll" name="roll_attack"
  value="&{template:basic} {{type=Attack}} {{name=@{character_name}}} {{roll=[[1d20+@{strength_mod}]]}}">
  Attack
</button>

<!-- Inside a repeating section -->
<fieldset class="repeating_weapons">
  <input type="text" name="attr_weapon_name" />
  <input type="number" name="attr_weapon_bonus" value="0" />
  <button type="roll" name="roll_weapon_attack"
    value="/roll 1d20 + @{weapon_bonus}">Roll Attack</button>
</fieldset>
```

**Rules:**
* `name` must start with `roll_`.
* `value` contains the full roll formula string sent to chat.
* Inline rolls in `value` use `[[ ]]`: `[[1d20+@{strength_mod}]]`.
* The button can be dragged to the macro quickbar if it has a name.
* Clicking a roll button does **not** fire a `clicked:` sheet worker event.

---

## Action Buttons

Action buttons trigger sheet worker JavaScript when clicked. They do **not** send to chat by themselves.

```html
<button type="action" name="act_calculate">Calculate</button>
```

```javascript
on("clicked:calculate", function() {
  getAttrs(["strength", "dexterity"], function(values) {
    var result = (parseInt(values.strength) || 0) + (parseInt(values.dexterity) || 0);
    setAttrs({ combined_stat: result });
  });
});
```

**Rules:**
* `name` must start with `act_`.
* Listener uses `clicked:NAME` where NAME is the part after `act_`.
* Avoid underscores in the button name **inside repeating sections** — use hyphens instead (`act_roll-attack`, not `act_roll_attack`).
* Inside a repeating section, listen with `on("clicked:repeating_sectionname:buttonname", ...)`.
* Action buttons **can** be linked in chat: `[Label](~buttonname)`.

---

## Sheet Workers

Sheet workers are JavaScript blocks that react to attribute changes. They run in a web worker (off the main thread).

**Declaration:**
```html
<script type="text/worker">
  // all sheet worker code goes here
</script>
```

### `on(eventString, callback)`
Registers listeners. Multiple events can be space-separated.

```javascript
// Fires when sheet opens
on("sheet:opened", function() { ... });

// Fires when a specific attribute changes
on("change:strength", function() { ... });

// Multiple events at once
on("sheet:opened change:strength change:level", function() {
  getAttrs(["strength", "level"], function(values) {
    var mod = Math.floor((parseInt(values.strength) || 10) / 2) - 5;
    setAttrs({ strength_mod: mod });
  });
});

// Repeating section change
on("change:repeating_spells:spelllevel", function() { ... });
```

### `getAttrs(attrArray, callback)`
Reads attributes asynchronously. Returns an object of key-value pairs.

```javascript
getAttrs(["strength", "strength_max", "level"], function(values) {
  var str = parseInt(values.strength) || 0;
  var maxStr = parseInt(values.strength_max) || 0;
  var lvl = parseInt(values.level) || 0;
  // NOTE: getAttrs on an autocalc field returns the formula string, not the number
});
```

### `setAttrs(valueObject, options, callback)`
Writes attributes. The callback fires after the write completes.

```javascript
setAttrs({ strength_mod: 3, initiative: 2 });

// With silent option (suppresses change events):
setAttrs({ temp_value: 5 }, { silent: true });

// With callback:
setAttrs({ hp: 10 }, {}, function() { console.log("HP set"); });
```

### `getSectionIDs(sectionName, callback)`
Returns all current row IDs for a repeating section.

```javascript
getSectionIDs("repeating_inventory", function(idarray) {
  var fields = [];
  idarray.forEach(function(id) {
    fields.push("repeating_inventory_" + id + "_weight");
    fields.push("repeating_inventory_" + id + "_quantity");
  });
  getAttrs(fields, function(values) {
    var total = 0;
    idarray.forEach(function(id) {
      total += (parseInt(values["repeating_inventory_" + id + "_weight"]) || 0)
              * (parseInt(values["repeating_inventory_" + id + "_quantity"]) || 0);
    });
    setAttrs({ total_weight: total });
  });
});
```

### `generateRowID()`
Creates a new unique row ID for programmatically adding repeating rows.

```javascript
var newid = generateRowID();
var newrow = {};
newrow["repeating_inventory_" + newid + "_name"] = "New Item";
newrow["repeating_inventory_" + newid + "_weight"] = 1;
setAttrs(newrow);
```

**Key behaviors:**
* All three async functions use callbacks — nest them, don't chain them linearly.
* `getAttrs` on an autocalc (`disabled`) field returns the **formula string**, not the computed number.

---

## Roll Templates

Roll templates define custom HTML layouts for roll output in chat.

**Definition (in character sheet HTML):**
```html
<rolltemplate class="sheet-rolltemplate-mytemplate">
  <div class="sheet-template-container">
    <div class="sheet-template-header">{{title}}</div>
    <div class="sheet-template-row">
      <span class="sheet-label">Roll:</span> {{roll}}
    </div>

    {{#rollWasCrit() roll}}
      <div class="sheet-template-critical">Critical Hit!</div>
    {{/rollWasCrit() roll}}

    {{#rollTotal() roll 20}}
      <div>Natural 20!</div>
    {{/rollTotal() roll 20}}

    {{#rollBetween() roll 1 5}}
      <div>Low roll warning</div>
    {{/rollBetween() roll 1 5}}

    {{#myoptionalprop}}
      <div>{{myoptionalprop}}</div>
    {{/myoptionalprop}}
  </div>
</rolltemplate>
```

**Referencing the template in a roll button value:**
```
&{template:mytemplate} {{title=Attack Roll}} {{roll=[[1d20+@{strength_mod}]]}} {{myoptionalprop=@{character_name}}}
```

**Field syntax:**
* `{{fieldname}}` — outputs the value of fieldname.
* `{{#fieldname}}...{{/fieldname}}` — conditional: renders only if fieldname has a value.
* `{{#rollWasCrit() roll}}` — renders if the inline roll `roll` was a critical (max die result).
* `{{#rollTotal() roll N}}` — renders if the roll total equals exactly N.
* `{{#rollBetween() roll X Y}}` — renders if the roll total is between X and Y (inclusive).
* `^{i18n-key}` — outputs a translation string inside a template.

**Rules:**
* Template name format: class must be `sheet-rolltemplate-NAME`.
* Called via `&{template:NAME}` in the roll string.
* Cannot use spaces in template names.
* All attributes must use double quotes — single quotes cause the template to be completely ignored.
* Arithmetic cannot be done inside the template — compute values in the roll formula before passing them in.

---

## Auto-Calculating Fields

### A. `disabled` input with formula (legacy auto-calc)

```html
<input type="number" name="attr_strength_mod"
  value="(floor(@{strength}/2)-5)" disabled="true" />
```

* The `value` formula is evaluated live using `@{attrname}` references.
* Supports `floor()`, `round()`, `ceil()` — no other JS functions.
* Only references attributes on the **same character**.
* `getAttrs` in a sheet worker returns the formula string, not the number.
* Recalculates every time the sheet opens — can cause performance issues at scale.

### B. `readonly` input or `<span>` set by sheet worker (recommended)

```html
<input type="number" name="attr_strength_mod" value="0" readonly />
<!-- or -->
<span name="attr_strength_mod"></span>
```

```javascript
on("sheet:opened change:strength", function() {
  getAttrs(["strength"], function(v) {
    var mod = Math.floor((parseInt(v.strength) || 10) / 2) - 5;
    setAttrs({ strength_mod: mod });
  });
});
```

**Performance comparison:**

| Method | Auto-formula | Sheet Worker writable | Performance |
|---|---|---|---|
| `disabled` input | Yes | No | Slow (main thread) |
| `readonly` input | No | Yes | Fast |
| `<span name="attr_...">` | No | Yes | Fastest |

---

## i18n Translation Attributes

### `data-i18n`
Marks an element's text content for translation. The key maps to a string in `translation.json`.

```html
<label data-i18n="strength-label">Strength</label>
```

### `data-i18n-[attribute]`
Translates an HTML attribute value. Supported: `title`, `alt`, `aria-label`, `label`, `placeholder`.

```html
<input type="text" name="attr_weapon_name"
  placeholder="Hand Axe"
  data-i18n-placeholder="weapon-name-placeholder" />
```

### `data-i18n-vars`
Substitutes variables into a translated string. Variables delimited by `|`, referenced as `{{0}}`, `{{1}}`, etc.

```html
<span data-i18n="stat-display" data-i18n-vars="STR|10">{{0}}: {{1}}</span>
```

### In roll templates
Use `^{key}` syntax (not `{{}}`) to reference translation keys inside rolltemplate blocks.

### `translation.json` structure
```json
{
  "strength-label": "Strength",
  "weapon-name-placeholder": "Hand Axe"
}
```

---

## CSE vs. Legacy Sheet Differences

| Feature | Legacy Sheet (`"legacy": true`) | CSE (`"legacy": false`) |
|---|---|---|
| CSS class auto-prefix | Roll20 auto-prepends `sheet-` to classes | You must write `sheet-` explicitly |
| Supported HTML elements | Limited — no `<section>`, `<header>`, `<footer>`, `<details>`, etc. | All modern elements supported |
| First tab shown on open | Bio/Info tab | Character Sheet tab |

**`sheet.json` minimum example:**
```json
{
  "html": "sheet.html",
  "css": "sheet.css",
  "legacy": false,
  "authors": "Your Name",
  "roll20userid": "0"
}
```

**Compatibility tip:** Write `sheet-` explicitly on all classes in HTML and CSS. This makes the sheet work in both Legacy and CSE environments.

---

## Tab System

### Method A: Radio Buttons + CSS Sibling Selector (CSS-only)

Radio inputs and their content divs must be **siblings at the same DOM level**.

```html
<input type="radio" name="attr_tab" class="sheet-tab-core" value="core" checked="checked">
<label class="sheet-tab-label">Core</label>
<input type="radio" name="attr_tab" class="sheet-tab-equipment" value="equipment">
<label class="sheet-tab-label">Equipment</label>

<div class="sheet-content-core"><!-- core content --></div>
<div class="sheet-content-equipment"><!-- equipment content --></div>
```

```css
.sheet-content-core,
.sheet-content-equipment { display: none; }

.sheet-tab-core:checked ~ .sheet-content-core { display: block; }
.sheet-tab-equipment:checked ~ .sheet-content-equipment { display: block; }
```

**Note:** The `~` sibling selector only works when the radio and its target div share the same parent.

### Method B: Action Buttons + Sheet Workers

```html
<button type="action" name="act_tab-core">Core</button>
<button type="action" name="act_tab-equipment">Equipment</button>
<input type="hidden" name="attr_active_tab" value="core" />
```

```javascript
on("clicked:tab-core", function() { setAttrs({ active_tab: "core" }); });
on("clicked:tab-equipment", function() { setAttrs({ active_tab: "equipment" }); });
```

---

## Whisper and Query Syntax in Roll Formulas

### Queries: `?{prompt}`

```
?{Prompt Text}               ← free input, no default
?{Prompt Text|default}       ← with default value
?{Choose|Option A|Option B}  ← dropdown choices

/roll 1d20 + ?{Modifier|0}
```

### Whispers: `/w`

```
/w gm Your private message
/w "Player Name" Your message
/gmroll 1d20+5              ← equivalent to /w gm for rolls
```

Since `/roll` cannot be whispered, use inline rolls inside a whisper:
```
/w gm [[1d20 + @{strength_mod}]]
/w gm &{template:mytemplate} {{title=Attack}} {{roll=[[1d20+@{strength_mod}]]}}
```

### Sheet-level Whisper Toggle

```html
<select name="attr_whisper">
  <option value="">Public</option>
  <option value="/w gm ">Whisper GM</option>
</select>

<button type="roll" name="roll_attack"
  value="@{whisper}&{template:basic} {{roll=[[1d20+@{str_mod}]]}}">
  Attack
</button>
```

---

## Sources

* [Building Character Sheets - Roll20 Wiki](https://wiki.roll20.net/Building_Character_Sheets)
* [Sheet Worker Scripts - Roll20 Wiki](https://wiki.roll20.net/Sheet_Worker_Scripts)
* [Character Sheet Development/Repeating Section - Roll20 Wiki](https://wiki.roll20.net/Character_Sheet_Development/Repeating_Section)
* [Roll Templates - Roll20 Wiki](https://wiki.roll20.net/Roll_Templates)
* [Button - Roll20 Wiki](https://wiki.roll20.net/Button)
* [Character Sheet Enhancement - Roll20 Wiki](https://wiki.roll20.net/Character_Sheet_Enhancement)
* [Character Sheet Translation - Roll20 Wiki](https://wiki.roll20.net/Character_Sheet_Translation)
* [Complete Guide to Macros & Rolls - Roll20 Wiki](https://wiki.roll20.net/Complete_Guide_to_Macros_%26_Rolls)
