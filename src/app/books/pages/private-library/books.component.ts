import { Component, OnInit } from '@angular/core';
import { Book, CategorieBook } from "../../interfaces/books.interface";
import { BooksService } from "../../services/books.service";
import { CategoriesService } from "../../../service/categories.service";
import { debounce, debounceTime, lastValueFrom } from "rxjs";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = []
  categories: CategorieBook[] = []
  bookName = '';
  loading: boolean = false;
  constructor(private categoryService: CategoriesService,
    private bookService: BooksService,
  ) {
  }

  ngOnInit(): void {
    this.getBooksOwnerList();
    this.getCategoriesBook();
    this.observerChangeSearch();
  }

  search = new FormControl;// creo un control y lo enlazo al html
  observerChangeSearch() {
    //obtengo el cambio de los valores
    this.search.valueChanges    //me suscribo a esos cambios
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        value => this.searchBook(value) //obtengo los valores que hay en el input
      )
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
    if (this.books.length == 0) {
      await lastValueFrom(
        this.bookService.getBooksOwner())
        .then(
          (res: Book[]) => {
            this.books = res;
            console.log(res, 'respuestas book')
          });
    }

  }
//volver a dejar la funcion de arriba como antes y preguntar por el error

  searchBook(value: string) {
    this.loading = true;
    this.bookService.getBooksOwner()
      .subscribe({
        next: (res) => {
          const arrayBooksFilter = res.filter((element: any) => element.title.includes(value))
          this.books = arrayBooksFilter;

          this.loading = false;
        }
      })


  }

  blurEvent() {
    console.log('your blur evenet')
  }

}


