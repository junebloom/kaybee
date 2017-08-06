(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.kaybee = factory());
}(this, (function () { 'use strict';

const options = {
  renameKeys: true,
  enableRepeat: false
};

const pressedKeys = {};
const pressedCodes = {};

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

const kaybee = { options, isKeyDown, isCodeDown, transformKeyName };
document.addEventListener('keydown', event => {
  if (!options.enableRepeat && event.repeat) return
  const key = options.renameKeys ? transformKeyName(event.key) : event.key;
  const code = event.code;

  pressedKeys[key] = true;
  pressedCodes[code] = true;

  if (kaybee.onKeyDown) kaybee.onKeyDown(key, code);
});

document.addEventListener('keyup', event => {
  const key = options.renameKeys ? transformKeyName(event.key) : event.key;
  const code = event.code;

  pressedKeys[key] = false;
  pressedCodes[code] = false;

  if (kaybee.onKeyUp) kaybee.onKeyUp(key, code);
});

return kaybee;

})));
//# sourceMappingURL=kaybee.js.map
