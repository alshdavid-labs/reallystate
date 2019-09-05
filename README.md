<img align="left" width="350px" src="https://www.getfilecloud.com/blog/wp-content/uploads/2014/01/building-blocks.jpg">

## Features

⭐️ Use functions as queries

⭐️ Full Redux tooling support

⭐️ Support for rxjs operators

⭐️ Lightweight and extensible

<br><br>
 
## Example

```javascript
import { Store } from 'reallystate' // 4kb

const store = Store.Create({ useReduxTools: true })

store.subscribe(console.log)

store.query(() => ({ number: 1 }))
store.query(() => ({ number: store.value.number + 1 }))
```

## Installation

```bash
# npm
npm install --save reallystate

# Yarn
yarn add reallystate
```

## Live Sandbox

### Vanilla

https://stackblitz.com/edit/react-ts-vfxmsk?file=index.tsx

### Vanilla with `immutability-helper`

https://stackblitz.com/edit/react-ts-3hlqhf?file=index.tsx

## Tooling

Familiar tooling experience using Redux dev tools and time travel. 
Features compatibility with rxjs operators if you want to `.map/.filter` your way to functional success.

<img width="520px" src="https://cdn.davidalsh.com/github/reallystate.sample.gif">

## Action Alias

To apply an action name for the redux devtools, use the `as` method.

```javascript
store
  .as('INCREMENT')
  .query(() => ({ number: state.value.number + 1 }))
```

## Collections

You can group concerns by key using a "collection"

```typescript
import { Store } from 'reallystate'

interface CountState {
  value: number
}

const store = Store.Create({ useReduxTools: true })
const collection = Store.CreateCollection({
  store,
  collectionName: 'myCollection'
})

collection.subscribe(console.log)

collection
  .as('Initial')
  .query(() => ({ value: 1 }))

const increment = () => {
  collection
    .as('Increment')
    .query(p => ({ value: p.value + 1 }))
}

const decrement = () => {
  collection
    .as('Decrement')
    .query(p => ({ value: p.value - 1 }))
}
```

### Additional Query Processors

If you don't want to use simple javascript to traverse an object tree for modifying your state, you can use third party packages to introduce the desired query syntax.

#### Using `immutability-helper`

```javascript
import { Store } from 'reallystate'
import immutabilityHelper from 'immutability-helper';

const store = Store.Create({
  defaultProcessor: immutabilityHelper
})

state.query({ myList: $push: ['item'] }))
```

#### Using `immer`
Or you can use Immer, or whatever

```javascript
import { Store } from 'reallystate'
import immer from 'immer';

const store = Store.Create({
  defaultProcessor: immer
})

state.query(draftState => {
  draftState.items.push('Hello')
}))
```

### Custom query processors

As long as your processor matches the following signature, it can be used as a query processor.

```javascript
function runnable(state, effect) {
  return state
}
```

As an example both `immer` and `immutability-helpe` use this signature.

```javascript
import immer from 'immer';

let state = {}
state = immer(state, draftState => {
  draftState.hello = 'world'
})
```

```javascript
import update from 'immutability-helper';

let state = {}
state = update(state, { hello: { $set: 'world' }})
```