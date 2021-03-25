import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
