import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreModule } from '../../core.module';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: CoreModule
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /** Allow page only for logged users */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!!this.authService.loggedUser.value) {
      return true;
    } else {
      return this.authService.me().pipe(
        map(() => true),
        catchError(() => {
          void this.router.navigate(['/login']);
          return of(false);
        })
      );
    }
  }
}
