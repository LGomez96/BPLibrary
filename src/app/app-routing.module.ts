import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from "./shared/error-page/error-page.component";
import {CanloadGuard} from "./guards-load/canload.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module.module')
      .then(m => m.AuthModuleModule),
    //load sirve para no cargar modulos
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module')
      .then(m => m.BooksModule),
    canLoad: [CanloadGuard],
    //canactive
    //aqui puede ir una guarda canActivecChild?
    //canLoad = se carga a necesidad.
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
