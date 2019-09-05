import { Store } from '../index'
import { MockDevtools } from './mock-devtools';
import { QueryAction } from '../defaults';

it('Should run a few times', () => {
  interface State {
    value: number
  }

  const onUpdate = jest.fn()
  const store = Store.Create<State>()

  store.subscribe(state => onUpdate(state.value))

  store.query(() => ({ value: 1 }))
  store.query(() => ({ value: 2 }))
  store.query(() => ({ value: 3 }))

  expect(onUpdate).nthCalledWith(1, undefined)
  expect(onUpdate).nthCalledWith(2, 1)
  expect(onUpdate).nthCalledWith(3, 2)
  expect(onUpdate).nthCalledWith(4, 3)
})

it('Should merge and modify values', () => {
  interface State {
    value: number
  }

  const store = Store.Create<State>()

  store.query(() => ({ value: 1 }))
  expect(store.value).toEqual({ value: 1 })

  store.query(() => ({ anotherValue: 2 }))
  expect(store.value).toEqual({ value: 1, anotherValue: 2 })

  store.query(() => ({ anotherValue: 1 }))
  expect(store.value).toEqual({ value: 1, anotherValue: 1 })
})

it('Should shallow merge values', () => {
  const state = Store.Create()

  state.query(() => ({ one: { two: { value: 1 }} }))
  expect(state.value).toEqual({ one: { two: { value: 1 }} })

  state.query(() => ({ one: { two: { update: 1 }} }))
  expect(state.value).toEqual({ one: { two: { update: 1 }} })

  state.query(() => ({ two: 'hi' }))
  expect(state.value).toEqual({ two: 'hi', one: { two: { update: 1 }} })
})

it('Should notify devtools on updates', () => {
  const sendSpy = jest.fn()

  const mockDevtools = new MockDevtools({ sendSpy })
  const state = new Store.Engine({})
  state.enableDevTools(mockDevtools)

  state.query(() => ({ value: 1 }))
  expect(sendSpy).toBeCalledWith(QueryAction, { value: 1 })

  state.as('CUSTOM_MESSAGE').query(() => ({ value: 2 }))
  expect(sendSpy).toBeCalledWith('CUSTOM_MESSAGE', { value: 2 })

  state.query(() => ({ valueB: 1 }))
  expect(sendSpy).toBeCalledWith(QueryAction, { value: 2, valueB: 1 })
  
  mockDevtools.destroy()
})