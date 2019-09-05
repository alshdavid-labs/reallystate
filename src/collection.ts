import { Engine } from "./engine";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { QueryAction } from "./defaults";

export class Collection<T = Record<string, any>> {
  onUpdate: Observable<T>

  public get value(): T {
    return this.store.value[this.collectionName];
  }

  public get subscribe() {
    return this.onUpdate.subscribe.bind(this.onUpdate);
  }

  public get pipe() {
    return this.onUpdate.pipe.bind(this.onUpdate);
  }
  
  constructor(
    private store: Engine,
    private collectionName: string,
  ) {
    this.onUpdate = this.store
      .pipe(map((state: any) => state[this.collectionName]))
  }

  getValue(): T {
    return this.value
  }

  query = (fn: (value: T, ...args: any[]) => T, ...args: any[]) => {
    const update = fn(this.value, ...args)
    this.store
      .as(`[${this.collectionName}] ${QueryAction}`)
      .query(() => ({ [this.collectionName]: update }))
  }

  as = (alias: string) => {
    const prepared = this.store
      .as(`[${this.collectionName}] ${alias}`)
    
    return {
      query: (fn: (value: T, ...args: any[]) => T, ...args: any[]) => {
        const update = fn(this.value, ...args)
        prepared
          .query(() => ({ [this.collectionName]: update }))
      }
    }
  }
}