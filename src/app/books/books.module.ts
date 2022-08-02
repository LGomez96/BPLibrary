import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from "./private-library/books.component";
import {ImgBrokeDirective} from './directives/img-broke.directive';
import {AddBooksComponent} from './add-books/add-books.component';
import {BookDetailsComponent} from './books-detail/book-details.component';
import {PublicLibraryComponent} from './public-library/public-library.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BooksRoutingModule} from "./books-routing.module";


@NgModule({
  declarations: [
    BooksComponent,
    ImgBrokeDirective,
    AddBooksComponent,
    BookDetailsComponent,
    PublicLibraryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BooksRoutingModule
  ],
  exports: [ ]
})
export class BooksModule {
}
