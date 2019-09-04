import { State } from "../src";
import { map } from 'rxjs/operators'

export const MathWiz = (state: State.Engine) => {
  // Selector
  const currentNumber = state.pipe(map((cur: any) => cur.value))

  const getValue = () => state.value.value

  state
    .as('MATH_WIZ_INITIAL')
    .query(() => ({ value: 1 }))

  const increment = () => {
    const update = getValue() + 1
    state
      .as('MATH_WIZ_INCREMENT')
      .query(() => ({ value: update }))
  }

  const decrement = () => {
    const update = getValue() - 1
    state
      .as('MATH_WIZ_DECREMENT')
      .query(() => ({ value: update }))
  }

  return {
    currentNumber,
    increment,
    decrement,
  }
}