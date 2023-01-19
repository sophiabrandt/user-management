import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import 'cross-fetch/polyfill';
import {
  catchError,
  EMPTY,
  from,
  Observable,
  shareReplay,
  throwError,
} from 'rxjs';
import { PocketBaseUser } from '../interfaces/user';
import { POCKETBASE_CLIENT } from '../tokens/tokens';

const TESTING = process.env['NODE_ENV'] === 'test';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private pb = inject(POCKETBASE_CLIENT, { optional: true });

  getAll(): Observable<PocketBaseUser[]> {
    if (this.pb) {
      const userRecords: Promise<PocketBaseUser[]> = this.pb
        .collection('usrm_users')
        .getFullList(200, {
          sort: '-created',
        });

      return from(userRecords).pipe(
        shareReplay({ refCount: true, bufferSize: 1 }),
        catchError(this.handleError)
      );
    } else {
      if (!TESTING) console.error('NO POCKETBASE CLIENT');
      return EMPTY;
    }
  }

  getbyId(id: string): Observable<PocketBaseUser> {
    if (this.pb) {
      const userRecords: Promise<PocketBaseUser> = this.pb
        .collection('usrm_users')
        .getFirstListItem('id="112vm9hpm58icwv"');

      return from(userRecords).pipe(
        shareReplay({ refCount: true, bufferSize: 1 }),
        catchError(this.handleError)
      );
    } else {
      if (!TESTING) console.error('NO POCKETBASE CLIENT');
      return EMPTY;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned status ${error.status}: ${error.message}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
