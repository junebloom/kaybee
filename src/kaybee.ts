export function normalizeKeyName(key: string): string {
  return key
    .toLowerCase() // Make all names lowercase.
    .replace(/^arrow/, "") // Remove prefix for arrow keys.
    .replace(/(^\s$)|spacebar/, "space"); // Give space a reasonable name.
}

interface Kaybee {
  readonly stop: () => void;
  readonly getKey: (key: string) => boolean;
  readonly getCode: (code: string) => boolean;
}

interface KaybeeEvent {
  readonly key: string;
  readonly code: string;
  readonly repeat?: boolean;
}

interface KaybeeOptions {
  readonly target?: EventTarget;
  readonly renameKeys?: boolean;
  readonly enableRepeat?: boolean;
  readonly onKeyDown?: (event: KaybeeEvent) => void;
  readonly onKeyUp?: (event: KaybeeEvent) => void;
}

export function start({
  target = window, // The target to listen for KeyboardEvents on.
  renameKeys = true, // Whether to normalize key names.
  enableRepeat = false, // Whether to call onKeyDown on "repeat" key events.
  onKeyDown = () => {}, // Called when a key is pressed.
  onKeyUp = () => {}, // Called when a key is released.
}: KaybeeOptions = {}): Kaybee {
  // Private API
  const keys = new Set();
  const codes = new Set();

  function handleKeyDown({ key, code, repeat }: KeyboardEvent) {
    const keyName = renameKeys ? normalizeKeyName(key) : key;
    if (repeat && !enableRepeat) return;
    keys.add(keyName);
    codes.add(code);
    onKeyDown({ key: keyName, code, repeat });
  }

  function handleKeyUp({ key, code }: KeyboardEvent) {
    const keyName = renameKeys ? normalizeKeyName(key) : key;
    keys.delete(keyName);
    codes.delete(code);
    onKeyUp({ key: keyName, code });
  }

  function clear() {
    keys.clear();
    codes.clear();
  }

  target.addEventListener("keydown", handleKeyDown as EventListener);
  target.addEventListener("keyup", handleKeyUp as EventListener);
  target.addEventListener("blur", clear);
  if (target !== window) window.addEventListener("blur", clear);

  // Public API
  return {
    stop() {
      target.removeEventListener("keydown", handleKeyDown as EventListener);
      target.removeEventListener("keyup", handleKeyUp as EventListener);
      target.removeEventListener("blur", clear);
      if (target !== window) window.removeEventListener("blur", clear);
    },
    getKey: (key) => keys.has(key),
    getCode: (code) => codes.has(code),
  };
}

export default { normalizeKeyName, start };
