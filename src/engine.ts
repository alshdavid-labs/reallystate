import { BehaviorSubject } from 'rxjs'
import { DefaultProcessor, QueryProcessor, QueryAction, RunnableFn } from './defaults';
import { Query } from './query';

export interface DevTools {
  connect(): DevTools
  send(action: string, state: any): void
  subscribe(cb: (data: any) => void): void
  init(value: any): void
}

export class Engine<T = RunnableFn<any>> {
  private tools: DevTools | undefined
  private store: BehaviorSubject<Record<string, any>>

  public get value() {
    return this.store.value;
  }

  public get getValue() {
    return this.store.getValue.bind(this.store);
  }

  public get subscribe() {
    return this.store.subscribe.bind(this.store);
  }

  public get pipe() {
    return this.store.pipe.bind(this.store);
  }

  constructor(
    private initialValue: Record<string, any> = {},
    public defaultProcessor: QueryProcessor = DefaultProcessor
  ) {
    this.store = new BehaviorSubject(initialValue)
  }

  setProcessor(processor: QueryProcessor) {
    this.defaultProcessor = processor
  }

  enableDevTools(devTools: DevTools) {
    this.tools = devTools.connect()
    this.tools!.subscribe((this.debugOnUpdate))
    this.tools!.init(this.initialValue)
  }

  public as(actionName: string) {
    return new Query()
      .engine(this)
      .processor(this.defaultProcessor)
      .as(actionName)
  }
  
  public query(runnable: T) {
    return new Query()
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

