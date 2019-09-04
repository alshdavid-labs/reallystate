import { Engine as OGEngine } from './engine'
import { Create } from './create'

export const State = {
  Create,
  Engine: OGEngine
}

export declare module State {
  export type Engine = OGEngine
}
