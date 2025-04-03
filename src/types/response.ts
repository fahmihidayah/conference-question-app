export interface ResponseAction<T> {
  error: boolean;
  message: string;
  data: T;
}
