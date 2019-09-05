import { Engine } from "./engine";
import { DefaultProcessor, QueryProcessor } from "./defaults";

export interface CreateProps {
  useReduxTools?: boolean,
  initialValue?: any,
  defaultProcessor?: QueryProcessor,
}

export const Create = <T>({
  useReduxTools = false,
  initialValue = {},
  defaultProcessor = DefaultProcessor,
}: CreateProps = {}): Engine<T> => {
  const engine = new Engine<T>(initialValue)
  engine.setProcessor(defaultProcessor)
  if (
    useReduxTools && 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ) {
    engine.enableDevTools((window as any).__REDUX_DEVTOOLS_EXTENSION__)
  }
  return engine
}