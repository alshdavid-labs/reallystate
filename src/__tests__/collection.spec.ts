import { Store } from "../";

it('Should work with collection', () => {
  interface Collection {
    one: { two: { value: number }}
  }
  
  const store = Store.Create()
  const col = Store.CreateCollection<Collection>({
    store,
    collectionName: 'test'
  })

  col.query(() => ({ one: { two: { value: 1 }} }))
  expect(col.value).toEqual({ one: { two: { value: 1 }} })

  col.query(() => ({ one: { two: { update: 1 }} }))
  expect(col.value).toEqual({ one: { two: { update: 1 }} })

  col.query(() => ({ two: 'hi' }))
  expect(col.value).toEqual({ two: 'hi', one: { two: { update: 1 }} })
})