import { HttpErrorResponse } from '@angular/common/http';

export interface HttpRequestState<T> {
  isLoading: boolean;
  value?: T;
  error?: HttpErrorResponse | Error;
}
