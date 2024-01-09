export interface APIResponse<T> {
  data: T | null,
  errMsg: string | null
}