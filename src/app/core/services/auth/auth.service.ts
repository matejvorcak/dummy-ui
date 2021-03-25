import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { login } from 'src/dummFakeBackend';
import { User } from '../../models';
import { catchError, map, take, tap } from 'rxjs/operators';
import { me } from 'src/dummFakeBackend/api';
import { CoreModule } from '../../core.module';
import { APP_CONSTANTS, IConstants } from '../../constants';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  loggedUser = new BehaviorSubject<User>(null);
  token: string;

  constructor(
    @Inject(APP_CONSTANTS) private constants: IConstants,
    private localStorageService: LocalStorageService
  ) {
    this.token = this.localStorageService.get(this.constants.tokenStorageKey);
  }

  /** Executes API call and gets users token. */
  login(username: string, password: string): Observable<string> {
    return from(login(username, password)).pipe(
      map(data => data.token),
      take(1)
    );
  }

  /** Executes API call and gets users data */
  me(): Observable<User> {
    // update token
    this.token = this.localStorageService.get(this.constants.tokenStorageKey);
    return from(me(this.token)).pipe(
      map(data => data.user),
      tap(user => this.loggedUser.next(user)),
      catchError(error => {
        this.logout();
        throw error;
      })
    );
  }

  /** clears all users data */
  logout(): void {
    this.loggedUser.next(null);
    this.token = null;
    this.localStorageService.remove(this.constants.tokenStorageKey);
  }
}
