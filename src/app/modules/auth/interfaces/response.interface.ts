export interface Response<T> {
  payload: T | null;
  message?: string;
  timestamp: number;
}
