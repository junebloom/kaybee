export function normalizeKeyName(key) {
  return key
    .toLowerCase() // Make all names lowercase.
    .replace(/^arrow/, "") // Remove prefix for arrow keys.
    .replace(/(^\s$)|spacebar/, "space"); // Give space a reasonable name.
}

export function start({
  element = window, // The element to listen for KeyboardEvents on.
  renameKeys = true, // Whether to normalize key names.
  enableRepeat = false, // Whether to call onKeyDown on "repeat" key events.
  onKeyDown = () => {}, // Called when a key is pressed.
  onKeyUp = () => {}, // Called when a key is released.
}) {
  // Private API
  const keys = new Set();
  const codes = new Set();

  function handleKeyDown({ key, code, repeat }) {
    const keyName = renameKeys ? normalizeKeyName(key) : key;
    if (repeat && !enableRepeat) return;
    keys.add(keyName);
    codes.add(code);
    onKeyDown({ key: keyName, code, repeat });
  }

  function handleKeyUp({ key, code }) {
    const keyName = renameKeys ? normalizeKeyName(key) : key;
    keys.delete(keyName);
    codes.delete(code);
    onKeyUp({ key: keyName, code });
  }

  function clear() {
    keys.clear();
    codes.clear();
  }

  element.addEventListener("keydown", handleKeyDown);
  element.addEventListener("keyup", handleKeyUp);
  element.addEventListener("blur", clear);
  if (element !== window) window.addEventListener("blur", clear);

  // Public API
  return {
    stop() {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("keyup", handleKeyUp);
      element.removeEventListener("blur", clear);
      if (element !== window) window.removeEventListener("blur", clear);
    },
    getKey: (key) => keys.has(key),
    getCode: (code) => codes.has(code),
  };
}

export default { normalizeKeyName, start };
