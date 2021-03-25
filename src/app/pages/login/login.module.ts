import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';
import { LoginRouterModule } from './login-router.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, SharedModule, LoginRouterModule]
})
export class LoginModule {}
