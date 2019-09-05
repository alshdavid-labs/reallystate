import { Engine as OGEngine } from './engine'
import { Create } from './create'
import { CreateCollection } from './create-collection'
import { Wrap } from './wrap'
import { Collection as OGCollection } from './collection'
import { RunnableObj as OGRunnableObj, RunnableFn as OGRunnableFn} from './defaults'

export const Store = {
  Create,
  CreateCollection,
  Wrap,
  Engine: OGEngine,
  Collection: OGCollection
}

export default Store

export declare module Store {
  export type Engine<T, T2> = OGEngine<T, T2>
  export type Collection<T, T2> = OGCollection<T, T2>
  export type RunnableObj = OGRunnableObj
  export type RunnableFn<T> = OGRunnableFn<T>
}
