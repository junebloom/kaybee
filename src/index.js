const options = {
  renameKeys: true,
  enableRepeat: false
}

const pressedKeys = {}
const pressedCodes = {}

function isKeyDown (key) {
  return pressedKeys[key] || false
}

function isCodeDown (code) {
  return pressedCodes[code] || false
}

function transformKeyName (key) {
  return key.toLowerCase()
    .replace(/^arrow/, '')
    .replace(/(^\s$)|spacebar/, 'space')
}

const keybee = { options, isKeyDown, isCodeDown, transformKeyName }
export default keybee

document.addEventListener('keydown', event => {
  if (!options.enableRepeat && event.repeat) return
  const key = options.renameKeys ? transformKeyName(event.key) : event.key
  const code = event.code

  pressedKeys[key] = true
  pressedCodes[code] = true

  if (keybee.onKeyDown) keybee.onKeyDown(key, code)
})

document.addEventListener('keyup', event => {
  const key = options.renameKeys ? transformKeyName(event.key) : event.key
  const code = event.code

  pressedKeys[key] = false
  pressedCodes[code] = false

  if (keybee.onKeyUp) keybee.onKeyUp(key, code)
})
