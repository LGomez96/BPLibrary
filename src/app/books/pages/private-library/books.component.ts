import { Component, OnInit } from '@angular/core';
import { Book, CategorieBook, FilterBook } from "../../interfaces/books.interface";
import { BooksService } from "../../services/books.service";
import { CategoriesService } from "../../../service/categories.service";
import { debounce, debounceTime, filter, lastValueFrom, Subscription } from "rxjs";
import { FormControl } from '@angular/forms';
import { identifierName } from '@angular/compiler';

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
  errorMsg: boolean = false;

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


  getBooksOwnerList() {
    if (this.books.length == 0) {
      this.bookService.getBooksOwner()
        .subscribe(
          (res: Book[]) => {
            this.books = res;
            console.log(res, 'respuestas book')
          });
    }

  }

  //volver a dejar la funcion de arriba como antes y preguntar por el error

  searchBook(value: string) {
    this.errorMsg = false
    this.loading = true;
    this.bookService.getBooksOwner()
      .subscribe({
        next: (res) => {
          const arrayBooksFilter = res.filter((element: any) => element.title.includes(value))
          this.books = arrayBooksFilter;
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = true;
        }
      })


  }

  blurEvent() {
    console.log('your blur evenet')
  }

  filterBySelect(event: any) {
  //comparar el evento con el category.description si es igual, 
    
  //llamar al servicio y filtrar por si es igual al numero de category del servicio
  //   const categoryDescription = [  ...this.categories]
  //   const value = event.target.value

  //   const map = categoryDescription.map((el)=>{
  //       const obj = {
  //       description: el.description,
  //       id: el.id
  //     }
  //     return obj
  //   })
  //   const filterCategorie = map.filter((el)=>el.description == value)

  //   console.log(filterCategorie)
  //   this.errorMsg = false
  //   this.loading = true;
  //   this.bookService.getBooksOwner()
  //     .subscribe({
  //       next: (res) => {
  //         const arrayBooksFilter = res.filter((element: any) => element.category == filterCategorie.id)
  //         console.log(arrayBooksFilter)
  //         this.books = arrayBooksFilter;
  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         this.errorMsg = true;
  //         [] = err;
  //       }

  //     })
  }


}


