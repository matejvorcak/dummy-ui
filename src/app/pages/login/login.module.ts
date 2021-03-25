import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';
import { LoginRouterModule } from './login-router.module';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, LoginRouterModule]
})
export class LoginModule {}
