export type RunnableObj = Record<any, any>
export type RunnableFn<T> = (state: T, operator: any) => any

export type QueryProcessor = (state: any, ...args: any[]) => any

export const QueryAction = 'QUERY_EXEC'

export const DefaultProcessor = (state: any, fn: any) => {
  const update = { ...state, ...fn(state) }
  return update
}
