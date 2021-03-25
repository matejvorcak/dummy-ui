import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../core/guards/isLoggedIn/is-logged-in.guard';
import { IsNotLoggedInGuard } from '../core/guards/isNotLoggedIn/is-not-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [IsNotLoggedInGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'page-not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
