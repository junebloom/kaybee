# Kaybee 🐝

A very tiny keyboard input library for games.

- Built on the [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) API.
- Zero dependencies.
- < 0.4kb compressed.

# Getting Started

via package manager:

`yarn add kaybee` or `npm i -S kaybee`

```js
import { start } from "kaybee";
```

via CDN:

```js
// Use your preferred CDN; here we use jspm.
import { start } from "https://jspm.dev/kaybee/dist/kaybee.js";
```

# Usage

```javascript
// Start listening for KeyboardEvents and tracking key state.
const kb = start({
  // These are the available options and their default values.
  element: window, // The element to listen for KeyboardEvents on.
  renameKeys: true, // Whether to normalize key names.
  enableRepeat: false, // Whether to call onKeyDown on "repeat" key events.
  onKeyDown: ({ key, code, repeat }) => {}, // Called when a key is pressed.
  onKeyUp: ({ key, code }) => {}, // Called when a key is released.
});
```

```js
// Query key state by key name.
if (kb.getKey("f")) {
  // Do something.
}

// Query key state by key code.
if (kb.getCode("KeyW")) {
  // Do something else.
}
```

```js
// Clean up the DOM event listeners when your game is finished.
kb.stop();
```

If `renameKeys` is `true`, then key names are transformed to more useful values using three simple rules:

- All key names become lowercase. `"A"` -> `"a"`
- Arrow keys are unprefixed. `"ArrowLeft"` -> `"left"`
- And the space key is given a real value. `" "` -> `"space"`

> Only the `key` name is changed by this option. The `code` name is unaffected.

This is recommended because the names given by the browser can be less than ideal for games. For example, "a" and "A" are given as two different `key` names.

See MDN's [key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) and [code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) pages for more info on names in the [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) API.
