import { Engine } from "./engine";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { QueryAction, DefaultProcessor, QueryProcessor } from "./defaults";
import { Query } from "./query";

export class Collection<T, T2> {
  public onUpdate: Observable<T>

  public get value(): T {
    return this.store.value[this.collectionName];
  }

  public get pipe() {
    return this.onUpdate.pipe.bind(this.onUpdate);
  }

  constructor(
    private store: Engine<any, any>,
    private collectionName: string,
    initialValue: T,
    public defaultProcessor: QueryProcessor = DefaultProcessor
  ) {
    this.commit(initialValue, 'INIT')
    this.onUpdate = this.store
      .pipe(map((state: any) => state[this.collectionName]))
  }

  public subscribe = (cb: (value: T) => void) => this.onUpdate.subscribe(cb)
  public getValue = (): T => this.value

  public setProcessor(processor: QueryProcessor) {
    this.defaultProcessor = processor
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
      .as(QueryAction)
      .query(runnable)
  }

  public commit(newState: any, actionName: string = QueryAction) {
    this.store.commit(
      { [this.collectionName]: newState },
      `[${this.collectionName}] ${actionName}`
    )
  }
}
