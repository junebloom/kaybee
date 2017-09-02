![kaybee](http://i.imgur.com/ngOrZvG.png)
# kaybee
A very small library for getting key state. Intended for use in combination with [fae](https://github.com/sambrosia/fae), but it's generic enough to be used for any project.

# Installation
`npm i -S kaybee`

# Usage
Kaybee will keep track of which keys are pressed at any given time. You can query key state like so:

```javascript
import Kaybee from 'kaybee'
const kb = new Kaybee({/* options */})
```

```javascript
// ...somewhere in a gameloop perhaps
if (kb.isKeyDown('f')) {
  // do something
}

if (kb.isCodeDown('KeyW')) {
  // do something else
}
```

Take a peek at the source to see what exactly is going on.

## Events
Kaybee extends [EventEmitter](https://github.com/primus/eventemitter3), and emits `'keydown'` and `'keyup'` events.

```javascript
kb.on('keydown', (key, code) => {
  // respond to the keydown event
})

kb.on('keyup', (key, code) => {
  // respond to the keyup event
})
```

## Options
You can configure kaybee's behavior by passing an `options` object to the Kaybee constructor. There is currently only one option:

### `renameKeys`
If `true` (default), key name strings (but not key *code* strings) are transformed to more sensible values. All key names become lowercase, arrow keys are unprefixed, and the space key is given a real value.

`'A'` -> `'a'`

`'ArrowLeft'` -> `'left'`

`' '` -> `'space'`

## Using with fae
If you want to add key events to your fae game, it's fairly simple:

```javascript
import fae from 'fae'
import Kaybee from 'kaybee'

const app = new fae.Application()
const kb = new Kaybee()

kb.on('keydown', (key, code) => app.event.emit('keydown', key, code))
kb.on('keyup', (key, code) => app.event.emit('keyup', key, code))
```
