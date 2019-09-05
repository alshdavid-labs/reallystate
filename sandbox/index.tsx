import { State } from '../src'

const store = State.Create({ useReduxTools: true })

store.subscribe(value => console.log(value))

store.query(() => ({ number: 1 }))
store.query(() => ({ number: store.value.number + 1 }))

console.log(store.value)