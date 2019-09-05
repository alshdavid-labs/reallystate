import { Engine } from "./engine";
import { QueryProcessor, RunnableFn } from "./defaults";
import { Collection } from "./collection";

export interface CreateCollectionProps {
  store: Engine<any, any>,
  collectionName: string,
  initialValue?: any,
  defaultProcessor?: QueryProcessor,
}

export const CreateCollection = <T, T2 = RunnableFn<T>>({
  store,
  collectionName,
  initialValue = {},
  defaultProcessor,
}: CreateCollectionProps): Collection<T, T2> => {
  if (!defaultProcessor) {
    defaultProcessor = store.defaultProcessor
  }
  const col = new Collection<T, T2>(
    store,
    collectionName,
    initialValue,
    defaultProcessor,
  )
  return col
}