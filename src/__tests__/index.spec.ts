import { State } from '../index'
import { MockDevtools } from './mock-devtools';
import { QueryAction } from '../defaults';

it('Should run', () => {
  const onUpdate = jest.fn()
  const state = State.Create()

  state.subscribe(state => onUpdate(state.value))

  state.query(() => ({ value: 1 }))
  state.query(() => ({ value: 2 }))
  state.query(() => ({ value: 3 }))

  expect(onUpdate).nthCalledWith(1, undefined)
  expect(onUpdate).nthCalledWith(2, 1)
  expect(onUpdate).nthCalledWith(3, 2)
  expect(onUpdate).nthCalledWith(4, 3)
})

it('Should merge and modify values', () => {
  const state = State.Create()

  state.query(() => ({ value: 1 }))
  expect(state.value).toEqual({ value: 1 })

  state.query(() => ({ anotherValue: 2 }))
  expect(state.value).toEqual({ value: 1, anotherValue: 2 })

  state.query(() => ({ anotherValue: 1 }))
  expect(state.value).toEqual({ value: 1, anotherValue: 1 })
})

it('Should shallow merge values', () => {
  const state = State.Create()

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
  const state = new State.Engine({}, mockDevtools)

  state.query(() => ({ value: 1 }))
  expect(sendSpy).toBeCalledWith(QueryAction, { value: 1 })

  state.as('CUSTOM_MESSAGE').query(() => ({ value: 2 }))
  expect(sendSpy).toBeCalledWith('CUSTOM_MESSAGE', { value: 2 })

  state.query(() => ({ valueB: 1 }))
  expect(sendSpy).toBeCalledWith(QueryAction, { value: 2, valueB: 1 })
  
  mockDevtools.destroy()
})