import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {BooksComponent} from "./books/private-library/books.component";
import {ErrorPageComponent} from "./shared/error-page/error-page.component";
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth-module.module')
      .then( m=> m.AuthModuleModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module')
      .then( m => m.BooksModule)
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
export class AppRoutingModule { }
