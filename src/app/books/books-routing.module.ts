import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BooksComponent} from "./pages/private-library/books.component";
import {AddBooksComponent} from "./pages/add-books/add-books.component";
import {BookDetailsComponent} from "./pages/books-detail/book-details.component";
import {PublicLibraryComponent} from "./pages/public-library/public-library.component";

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: '',
        component: BooksComponent
      },
      {
        path: 'add-books',
        component: AddBooksComponent
      },
      {
        path: ':id',
        component: BookDetailsComponent
      },
      {
        path: 'public-library',
        component: PublicLibraryComponent
      },
      {
        path: '**',
        redirectTo: 'books'
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class BooksRoutingModule { }
