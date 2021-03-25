import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  APP_CONSTANTS,
  AuthService,
  LocalStorageService,
  IConstants
} from '@core';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {
  isLoginInProgress = false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    @Inject(APP_CONSTANTS) private constants: IConstants,
    private router: Router
  ) {}

  /** Handle login */
  onLogin(): void {
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.valid) {
      this.isLoginInProgress = true;
      this.authService
        .login(
          this.loginForm.controls.username.value,
          this.loginForm.controls.password.value
        )
        .subscribe(
          token => {
            this.localStorageService.set(this.constants.tokenStorageKey, token);
            void this.router.navigate(['/']);
          },
          errors => {
            this.loginForm.setErrors(errors.errors);
            this.isLoginInProgress = false;
          }
        );
    }
  }
}
