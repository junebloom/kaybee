const options = {
  renameKeys: true
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

document.addEventListener('keydown', event => {
  if (event.repeat) return
  const key = options.renameKeys ? transformKeyName(event.key) : event.key
  const code = event.code

  pressedKeys[key] = true
  pressedCodes[code] = true
})

document.addEventListener('keyup', event => {
  const key = options.renameKeys ? transformKeyName(event.key) : event.key
  const code = event.code

  pressedKeys[key] = false
  pressedCodes[code] = false
})

export default { options, isKeyDown, isCodeDown, transformKeyName }
