import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { SubmittedDataComponent } from './submitted-data/submitted-data.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    MainPage,
    ProfileFormComponent,
    SubmittedDataComponent,
    UserProfileComponent
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule]
})
export class MainModule {}
