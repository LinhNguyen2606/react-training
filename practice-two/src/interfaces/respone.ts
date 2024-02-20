export interface ApiResponse<T> {
  data: T | null;
  errMsg: string | null;
}
