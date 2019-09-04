import React from 'react'
import ReactDOM from 'react-dom'
import { useSubscribe } from 'use-subscribe'
import { State } from '../src'
import { MathWiz } from './math-wiz';

const state = State.Create({ useReduxTools: true })

const wiz = MathWiz(state)

const App = () => {
  const count = useSubscribe(wiz)

  return <>
    <h1>{count.current}</h1>
    <div>
      <button 
        onClick={() => wiz.increment()}>
        Add
      </button>
      <button 
        onClick={() => wiz.decrement()}>
        Subtract
      </button>
    </div>
  </>
}

ReactDOM.render(<App />, document.getElementById('app'))