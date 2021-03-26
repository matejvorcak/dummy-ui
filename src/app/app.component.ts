import { Component, HostBinding, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONSTANTS, IConstants } from '@core';
import { AuthService, LocalStorageService } from '@core/services';
import { Observable } from 'rxjs';
import { User } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostBinding('class.dark') isDarkMode = false;
  user$: Observable<User>;
  title = 'dummy-ui';

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    @Inject(APP_CONSTANTS) private constants: IConstants
  ) {
    if (this.localStorageService.check(this.constants.darkModeStoragKey)) {
      this.isDarkMode =
        this.localStorageService.get(this.constants.darkModeStoragKey) ===
        'true';
    } else {
      this.localStorageService.set(this.constants.darkModeStoragKey, 'false');
      this.isDarkMode = false;
    }
    this.user$ = this.authService.loggedUser;
  }

  /** Updates dark mode preferences */
  setDarkModePreferences(isEnabled: boolean): void {
    this.localStorageService.set(
      this.constants.darkModeStoragKey,
      isEnabled ? 'true' : 'false'
    );
    this.isDarkMode = isEnabled;
  }

  /** performs logout function */
  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
