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
  const key = transformKeyName(event.key)
  const code = event.code

  pressedKeys[key] = true
  pressedCodes[code] = true
})

document.addEventListener('keyup', event => {
  const key = transformKeyName(event.key)
  const code = event.code

  pressedKeys[key] = false
  pressedCodes[code] = false
})

export default { isKeyDown, isCodeDown }
