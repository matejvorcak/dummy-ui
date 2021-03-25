import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreModule } from '../../core.module';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: CoreModule
})
export class IsNotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /** Allow page only for not logged users */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.loggedUser.value && !this.authService.token) {
      return true;
    } else {
      return this.authService.me().pipe(
        map(() => {
          void this.router.navigate(['/']);
          return false;
        }),
        catchError(() => of(true))
      );
    }
  }
}
