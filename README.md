# kaybee
A very small library for getting key state. Intended for use in combination with [fae](https://github.com/sambrosia/fae), but it's generic enough to be used for any project.

# Installation
`npm i -S kaybee`

# Usage
Kaybee will keep track of which keys are pressed at any given time. You can query key state using the following functions:

```javascript
import kb from 'kaybee'

// ...somewhere in a gameloop perhaps
if (kb.isKeyDown('f')) {
  // do something
}

if (kb.isCodeDown('KeyW')) {
  // do something else
}
```

Take a peek at the source to see what exactly is going on.

## Options
You can configure kaybee's behavior with the `kb.options` object. There is currently only one option, but there may be more in the future. That option is:

### `renameKeys: true`
If true, key name strings (but not key code strings) are transformed to more sensible values. All key names become lowercase, arrow keys are unprefixed, and the space key is given a real value.

`'A'` -> `'a'`
`'ArrowLeft'` -> `'left'`
`' '` -> `'space'`

## Using with fae
If you want to add key events to your fae game, it's fairly simple:

```javascript
import kb from 'kaybee'
import fae from 'fae'

const app = new fae.Application()

document.addEventListener('keydown', event => {
  const key = kb.options.renameKeys ? kb.transformKeyName(event.key) : event.key
  const code = event.code
  app.event.emit('keydown', key, code)
})

document.addEventListener('keyup', event => {
  const key = kb.options.renameKeys ? kb.transformKeyName(event.key) : event.key
  const code = event.code
  app.event.emit('keyup', key, code)
})
```

I may add an event emitter to kaybee to make this even simpler.
