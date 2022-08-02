import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BooksComponent} from "./private-library/books.component";
import {AddBooksComponent} from "./add-books/add-books.component";
import {BookDetailsComponent} from "./books-detail/book-details.component";
import {PublicLibraryComponent} from "./public-library/public-library.component";

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
        path: 'book-details',
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
