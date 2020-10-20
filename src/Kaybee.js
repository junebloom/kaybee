import EventEmitter from "eventemitter3";

class Kaybee extends EventEmitter {
  constructor(options = {}) {
    super();

    this.options = Object.assign(
      { renameKeys: true, repeat: true, listen: true },
      options
    );
    this.pressedKeys = {};
    this.pressedCodes = {};

    if (document && this.options.listen) {
      document.addEventListener("keydown", this.handleKeyEvent.bind(this));
      document.addEventListener("keyup", this.handleKeyEvent.bind(this));
    }
  }

  isKeyDown(key) {
    return this.pressedKeys[key] || false;
  }

  isCodeDown(code) {
    return this.pressedCodes[code] || false;
  }

  handleKeyEvent(event) {
    if (!this.options.repeat && event.repeat) return;
    const pressed = event.type === "keydown";
    const key = this.options.renameKeys
      ? Kaybee.transformKeyName(event.key)
      : event.key;
    const code = event.code;

    this.pressedKeys[key] = pressed;
    this.pressedCodes[code] = pressed;

    this.emit(event.type, key, code, event.repeat);
  }

  static transformKeyName(key) {
    return key
      .toLowerCase()
      .replace(/^arrow/, "")
      .replace(/(^\s$)|spacebar/, "space");
  }
}

export default Kaybee;
