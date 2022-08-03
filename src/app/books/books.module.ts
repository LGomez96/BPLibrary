import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from "./pages/private-library/books.component";
import {ImgBrokeDirective} from './directives/img-broke.directive';
import {AddBooksComponent} from './pages/add-books/add-books.component';
import {BookDetailsComponent} from './pages/books-detail/book-details.component';
import {PublicLibraryComponent} from './pages/public-library/public-library.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BooksRoutingModule} from "./books-routing.module";
import {SharedModule} from "../shared/share.module";
import { RouterModule } from '@angular/router';


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
        BooksRoutingModule,
        SharedModule,
        RouterModule
    ],
  exports: [ ]
})
export class BooksModule {
}
