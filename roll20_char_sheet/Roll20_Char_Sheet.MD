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

## Best Practices

These are general best practice guidelines to help increase consistency among sheet authors, in order to make more maintainable code repository for the community. Some of these are generic, while others are specific to how the Roll20 Character Sheet Framework functions.

### Attributes/Inputs

* **Attribute names should be lowercase.** For the sake of consistency & to avoid some quirks related to sheetworkers, it's best to always give lowercase attribute names, such as `attr_strength`, `attr_strength_mod`, which will then be called in macros and sheetworkers as `strength`, `strength_mod`. It might be a good idea to limit them to alphanumerical + `_` and `-`.
* **RPGs have weird words.** Utilize `spellcheck="false"` for text inputs and `<textarea>`, to prevent the browser from indicating spell errors.
* **Use fewer Attributes & Inputs.** The more attributes and inputs you have the slower the sheet will load. This is not a concern for the average sheet but robust sheets such as the D&D 5E Sheet by Roll20 or the Pathfinder (Community) sheets — large amounts of attributes & inputs can lead to performance issues if left unmanaged. If sheetworkers need to process many attributes often, or the game relies on characters having many entries in Repeating Sections, it might impact performance.
* **Spans over disabled inputs.** Attribute-backed spans are more efficient than disabled inputs.

### Sheetworkers & Roll Templates

* **Avoid Asynchronous cascades.** Whenever possible avoid asynchronous cascades for sheet workers. An example of this is: `getAttrs` -> calculations -> `setAttrs` -> `getAttrs` -> calculations -> `setAttrs`… A better way to do this is `getAttrs` for everything you'll need, then do all necessary calculations before finally using a single `setAttrs`.
* **Use Sheetworkers over Auto Calculated attributes.** Sheetworkers only trigger when events happen, which improves performance for character sheets over auto calculated attributes since these events occur less frequently.
* **Place Roll Templates and sheetworker code at the bottom of the HTML page.** It's considered best practice to place JavaScript at the end of pages. This also means the rolltemplates won't mess with the Preview Pane if you're using the Sheet Editor.

### Other Roll20-specific

* **Include a minimum width.** Including a minimum width on the sheet will help with resizing. Try to not exceed the default width when a sheet opens for the first time, approximately 800px–900px. Character sheets with an NPC view may be smaller and elaborate PC sheets are sometimes bigger. Currently [May 2022] it's not possible to change the default width of the char sheet window, so if your sheet is much wider than the window, it might be annoying for users to have to resize them each time they are opened.
* **Use Supported Fonts.** Either use the five named fonts (Arial, Patrick Hand, Contrail One, Shadows Into Light, and Candal), or Google Fonts. Roll20 also comes with some Icon Fonts, and it's possible to use Google's Material Icons.
* **Use `^{ }` for translations in button macros.** In your button macros using `^{key}` will insert the appropriate key from the appropriate language's `translation.json`. This makes roll templates more adaptable to other languages, and avoids hardcoding words.
* **(Applies to Legacy Sheet, not CSE) Don't include `sheet-` for CSS class names in the HTML.** `sheet-` is automatically added to the CSS classes in the HTML, so it's redundant to repeat it there. Leaving it out also increases readability if lots of classes are used.
  * For example in the HTML, instead of `class="sheet-strRow"`, just do `class="strRow"`.
  * **WARNING:** the above is untrue for classes of `<rolltemplate>` elements. For those, you do need to specify the full class name (i.e. starting with `sheet-`) or your rolltemplates will simply stop working.

### General

* **Avoid using `!important` in CSS.** Whenever possible try to avoid using `!important` in CSS as it can create a cascading effect of needing to use ever more `!important` to fix things.
* **Follow general HTML/CSS best practices.** Google's HTML/CSS Style Guide is a good one to follow. Roll20's sheet framework is less forgiving than HTML/CSS in general, so following the style guide is a good way to avoid several minor pitfalls.
