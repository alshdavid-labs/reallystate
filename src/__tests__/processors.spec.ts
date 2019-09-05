import { Store } from '../';
import immutabilityHelper from 'immutability-helper'
import immer from 'immer'
import { RunnableObj } from '../defaults';


it('Should run with immutability-helper as processor', () => {
  const store = Store.Create<any, RunnableObj>({
    defaultProcessor: immutabilityHelper
  })

  store.query({ $set: { value: 1 }})
  expect(store.value).toEqual({ value: 1 })

  store.query({ $set: { value: 2 }})
  expect(store.value).toEqual({ value: 2 })

  store.query({ $set: { value: 3 }})
  expect(store.value).toEqual({ value: 3 })
})

it('Should run with collections and immutability-helper as processor', () => {
  interface Collection {
    value: number
  }

  const store = Store.Create({
    defaultProcessor: immutabilityHelper
  })

  const col = Store.CreateCollection<Collection, RunnableObj>({
    store,
    initialValue: {},
    collectionName: 'test'
  })

  col.query({ $set: { value: 1 }})
  expect(store.value).toEqual({ test: { value: 1 }})

  col.query({ $set: { value: 2 }})
  expect(store.value).toEqual({ test: { value: 2 }})

  col.query({ $set: { value: 3 }})
  expect(store.value).toEqual({ test: { value: 3 }})
})

it('Should run with immer as processor', () => {
  interface State {
    value: number
  }

  const store = Store.Create<State>({
    defaultProcessor: immer
  })

  store.query(state => { state.value = 1 })
  expect(store.value).toEqual({ value: 1 })

  store.query(state => { state.value = 2 })
  expect(store.value).toEqual({ value: 2 })

  store.query(state => { state.value = 3 })
  expect(store.value).toEqual({ value: 3 })
})

it('Should work with immer and collection', () => {
  interface Collection {
    value: number
  }

  const store = Store.Create({
    defaultProcessor: immer
  })

  const col = Store.CreateCollection<Collection>({
    store,
    initialValue: {},
    collectionName: 'test'
  })

  col.query(state => { state.value = 1 })
  expect(store.value).toEqual({ test: { value: 1 }})

  col.query(state => { state.value = 2 })
  expect(store.value).toEqual({ test: { value: 2 }})

  col.query(state => { state.value = 3 })
  expect(store.value).toEqual({ test: { value: 3 }})
})