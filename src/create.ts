import { Engine } from "./engine";
import { DefaultProcessor, QueryProcessor, RunnableFn } from "./defaults";

export interface CreateProps {
  useReduxTools?: boolean,
  initialValue?: any,
  defaultProcessor?: QueryProcessor,
}

export const Create = <T = Record<any, any>, T2 = RunnableFn<T>>({
  useReduxTools = false,
  initialValue = {},
  defaultProcessor = DefaultProcessor,
}: CreateProps = {}): Engine<T, T2> => {
  const engine = new Engine<T, T2>(initialValue)
  engine.setProcessor(defaultProcessor)
  if (
    useReduxTools && 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ) {
    engine.enableDevTools((window as any).__REDUX_DEVTOOLS_EXTENSION__)
  }
  return engine
}