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
