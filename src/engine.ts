import { BehaviorSubject } from 'rxjs'
import { DefaultProcessor, QueryProcessor, QueryAction, RunnableFn } from './defaults';
import { Query } from './query';

export interface DevTools {
  connect(): DevTools
  send(action: string, state: any): void
  subscribe(cb: (data: any) => void): void
  init(value: any): void
}

export class Engine<T, T2 = RunnableFn<any>> {
  private tools: DevTools | undefined
  private store: BehaviorSubject<T>

  public get value() {
    return this.store.value;
  }

  public get getValue() {
    return this.store.getValue.bind(this.store);
  }

  public get pipe() {
    return this.store.pipe.bind(this.store);
  }

  constructor(
    private initialValue: T,
    public defaultProcessor: QueryProcessor = DefaultProcessor
  ) {
    this.store = new BehaviorSubject(initialValue)
  }

  public subscribe = (cb: (value: T) => void) => this.store.subscribe(cb)

  setProcessor(processor: QueryProcessor) {
    this.defaultProcessor = processor
  }

  enableDevTools(devTools: DevTools) {
    this.tools = devTools.connect()
    this.tools!.subscribe((this.debugOnUpdate))
    this.tools!.init(this.initialValue)
  }

  public as(actionName: string) {
    return new Query<T2>()
      .engine(this)
      .processor(this.defaultProcessor)
      .as(actionName)
  }
  
  public query(runnable: T2) {
    return new Query<T2>()
      .engine(this)
      .processor(this.defaultProcessor)
      .query(runnable)
  }

  public commit(newState: any, action: string = QueryAction) {
    this.store.next(newState)
    this.debugLog(action)
  }

  private debugOnUpdate = ({ type, state }: any) => {
    if (type !== 'DISPATCH') {
      return
    }
    this.store.next(JSON.parse(state))
  }

  private debugLog(
    action: string, 
  ) {
    if (!this.tools) {
      return
    }
    this.tools.send(action, this.store.getValue())
  }
}

