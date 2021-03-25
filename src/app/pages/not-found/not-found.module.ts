import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found.page';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPage
  }
];

@NgModule({
  declarations: [NotFoundPage],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [NotFoundPage]
})
export class NotFoundModule {}
