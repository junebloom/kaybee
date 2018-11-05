import EventEmitter from 'eventemitter3'

class Kaybee extends EventEmitter {
  constructor(options = { renameKeys: true }) {
    super()

    this.options = options
    this.pressedKeys = {}
    this.pressedCodes = {}

    document.addEventListener('keydown', this.handleKeyEvent.bind(this))
    document.addEventListener('keyup', this.handleKeyEvent.bind(this))
  }

  isKeyDown(key) {
    return this.pressedKeys[key] || false
  }

  isCodeDown(code) {
    return this.pressedCodes[code] || false
  }

  handleKeyEvent(event) {
    if (event.repeat) return
    const pressed = event.type === 'keydown'
    const key = this.options.renameKeys
      ? Kaybee.transformKeyName(event.key)
      : event.key
    const code = event.code

    this.pressedKeys[key] = pressed
    this.pressedCodes[code] = pressed

    this.emit(event.type, key, code)
  }

  static transformKeyName(key) {
    return key
      .toLowerCase()
      .replace(/^arrow/, '')
      .replace(/(^\s$)|spacebar/, 'space')
  }
}

export default Kaybee
