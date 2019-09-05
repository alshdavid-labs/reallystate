import { QueryAction, QueryProcessor, DefaultProcessor } from "./defaults";

interface Storer {
  commit(update: any, actionName: string): void
  getValue(): any
}

export class Query {
  private actionName: string = QueryAction
  private queryProcessor: QueryProcessor = DefaultProcessor
  private storer: Storer | undefined

  engine(engine: Storer) {
    this.storer = engine
    return this
  }

  processor(processor: QueryProcessor) {
    this.queryProcessor = processor
    return this
  }

  as(actionName: string) {
    this.actionName = actionName
    return this
  }

  query(runnable: any) {
    if (this.storer === undefined) {
      return
    }
    const state = this.storer.getValue()
    const result = this.queryProcessor(state, runnable)
    this.storer.commit(result, this.actionName)
  }
}