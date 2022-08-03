import {Component, OnInit} from '@angular/core';
import {Book, CategorieBook} from "../../interfaces/books.interface";
import {BooksService} from "../../services/books.service";
import {CategoriesService} from "../../../service/categories.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = []
  categories: CategorieBook[] = []

  constructor(private categoryService: CategoriesService,
              private bookService: BooksService,
              ) {
  }

  ngOnInit(): void {
    this.getBooksOwnerList();
    this.getCategoriesBook()
  }

  getCategoriesBook() {
    this.categoryService.getCategory()
      .subscribe({
        next: (res: CategorieBook[]) => {
          this.categories = res
          console.log(res, 'respuestaCategorias')
        }
      })
  }

   async getBooksOwnerList() {
    if(this.books.length == 0){
      await lastValueFrom(
        this.bookService.getBooksOwner())
          .then(
            (res:Book[]) => {
              this.books = res;
              console.log(res, 'respuestas book')
            });
    }

  }


}


