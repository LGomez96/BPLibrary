import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from "./shared/error-page/error-page.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module.module')
      .then(m => m.AuthModuleModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module')
      .then(m => m.BooksModule)
  },

  // img/book/view
  // img/book/edit

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
