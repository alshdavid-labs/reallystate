import { Engine } from "./engine";

export const Create = ({
  useReduxTools = false,
  initialValue = {},
} = {}): Engine => {
  let reduxTools
  if (useReduxTools) {
    reduxTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect()
  }
  return new Engine(
    initialValue,
    reduxTools,
  )
}