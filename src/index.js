export default class Kaybee {
  constructor (options) {
    this.options = {
      renameKeys: options.renameKeys || true
    }

    this.pressedKeys = {}
    this.pressedCodes = {}

    document.addEventListener('keydown', this.handleKeyEvent)
    document.addEventListener('keyup', this.handleKeyEvent)
  }

  isKeyDown (key) { return this.pressedKeys[key] || false }
  isCodeDown (code) { return this.pressedCodes[code] || false }

  handleKeyEvent (event) {
    if (event.repeat) return
    const pressed = event.type === 'keydown'
    const key = this.getKeyName(event.key)
    const code = event.code

    this.pressedKeys[key] = pressed
    this.pressedCodes[code] = pressed
  }

  getKeyName (key) {
    if (this.options.renameKeys) return Kaybee.transformKeyName(key)
    else return key
  }

  static transformKeyName (key) {
    return key
      .toLowerCase()
      .replace(/^arrow/, '')
      .replace(/(^\s$)|spacebar/, 'space')
  }
}
