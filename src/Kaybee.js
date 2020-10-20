export function normalizeKeyName(key) {
  return key
    .toLowerCase() // Make all names lowercase.
    .replace(/^arrow/, "") // Remove prefix for arrow keys.
    .replace(/(^\s$)|spacebar/, "space"); // Give space a reasonable name.
}

export class Kaybee {
  constructor(options) {
    this.options = {
      renameKeys: true, // Whether to normalize key names.
      repeat: true, // Whether to call onKeyDown on "repeat" key events.
      onKeyDown: () => {}, // Called when a key is pressed.
      onKeyUp: () => {}, // Called when a key is released.
      ...options,
    };

    // Map of key states by key name.
    this.keys = {};

    // Map of key states by key code.
    this.codes = {};

    this.start();
  }

  start() {}

  stop() {}

  handleKeyEvent() {}
}

export default Kaybee;
