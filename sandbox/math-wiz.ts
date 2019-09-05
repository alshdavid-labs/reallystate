import { State } from "../src";
import update from 'immutability-helper';
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";

interface CountState {
  current: number
}

export const MathWiz = (state: State.Engine) => {
  const collection = new State.Collection<CountState>(state, 'Count')
  const subscribe = collection.subscribe.bind(collection)
  const getValue = collection.getValue.bind(collection)

  collection
    .as('Initial')
    .query(() => ({ current: 1 }))

  const increment = () => {
    collection
      .as('Increment')
      .query(p => ({ current: p.current + 1 }))
  }


  const decrement = () => {
    collection
      .as('Decrement')
      .query(p => ({ current: p.current - 1 }))
  }

  return {
    subscribe,
    getValue,
    increment,
    decrement,
  }
}

//  // Wrapping immutability-helper
// const query = (a, q) => state.as(`MATH_WIZ_${a}`).query(s => update(s, { count: q }))