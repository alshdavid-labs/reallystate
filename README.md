# State for humans

<img align="left" width="300px" src="https://payxintl.com/wp-content/uploads/2011/09/Revolution-Fist.jpg">

## Features

⭐️ Use functions as queries

⭐️ Full Redux tooling support

⭐️ Support for rxjs operators

⭐️ Lightweight and extensible

<br><br>

## Example

```javascript
import { State } from '@homework/state'

const store = State.Create({ useReduxTools: true })

store.subscribe(console.log)

store.query(() => ({ number: 1 }))
store.query(() => ({ number: store.value.number + 1 }))
```

## Installation

```bash
npm install --save @homework/state
```

## Tooling

Familiar tooling experience using Redux dev tools and time travel. 
Features compatibility with rxjs operators if you want to `.map/.filter` your way to functional success.

<img width="520px" src="/sample.gif">

## Action Alias

To apply an action name for the redux devtools, use the `as` method.

```javascript
state
  .as('INCREMENT')
  .query(() => ({ number: state.value.number + 1 }))
```

## Collections

You can group concerns by key using a "collection"

```typescript
import { State } from '@homework/state'

interface CountState {
  value: number
}

const store = State.Create({ useReduxTools: true })
const collection = new State.Collection<CountState>(store, 'Count')

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

## Ethos

On the back end, we often have a database which we can work with. Our business logic lives in units which consume a database connection and commit the results once they have been processed.

This aims to bring that paradigm to the front end

### Example

On the server we would prepare a DB statement
```javascript
const addPersonQuery = (db, person) => 
  db.prepare(
    'INSERT INTO people VALUES ?', person
  )
```
Then commit it to the DB
```javascript
const addJenny = addPersonQuery(db, 'Jenny')
await addJenny.commit()
```

#### This project allows for similar syntax

We are working with simple JavaScript objects here, so
there is no query syntax you would get with SQL or Mongo.

There for, a query is simply a function that takes state
and modfies it.

Below we prepare a query
```javascript
export const addPersonQuery = person => state => {
  return {
    people: [ ...state.people, person ]
  }
}
```

We then pass the query into the state engine for execution

```javascript
import { State } from '@homework/state'
import { addPersonQuery } from './query'

const state = State.Create({ useReduxTools: true })

state.query(addPersonQuery('Penny'))
```

### Additional Query Syntax

If you don't want to use simple javascript to traverse an object tree for modifying your state, you can use third party packages to introduce the desired query syntax.

As an example, the package `immutability-helper` is quite nice.

```javascript
import update from 'immutability-helper';
const state = State.Create()

state.query(state => update(state, { myList: $push: ['item'] }))
```
