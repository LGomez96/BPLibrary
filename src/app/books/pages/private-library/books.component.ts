import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book, CategorieBook, FilterBook} from "../../interfaces/books.interface";
import {BooksService, FilterBooks} from "../../services/books.service";
import {CategoriesService} from "../../../service/categories.service";
import {
  debounce,
  debounceTime,
  filter,
  lastValueFrom,
  Observable,
  pluck,
  Subject,
  Subscription,
  switchMap,
  take, takeLast, takeUntil
} from "rxjs";
import {FormControl} from '@angular/forms';
import {identifierName} from '@angular/compiler';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = []
  //categories: CategorieBook[] = []
  bookName = '';
  loading: boolean = false;
  errorMsg: boolean = false;

  search = new FormControl();// creo un control y lo enlazo al html


  categories$!: Observable<CategorieBook[]>


  // Observables - Subjects - BehaviorSubjects

  destroy$: Subject<boolean> = new Subject<boolean>()


  constructor(private categoryService: CategoriesService,
              private bookService: BooksService,) {

    this.categories$ = this.categoryService.getCategory()


    // Emite un valor
    // this.destroy$.next()

    // this.destroy$.subscribe()
    // this.destroy$.unsubscribe()

    // Obtener un Observable
    // this.destroy$.asObservable()


  }

  ngOnInit(): void {
    this.getBooksOwnerList();
    this.getCategoriesBook();
    this.observerChangeSearch();
  }

  ngOnDestroy() {
    this.destroy$.next(false)
    this.destroy$.unsubscribe()
  }


  observerChangeSearch() {
    //obtengo el cambio de los valores

    this.search.valueChanges    //me suscribo a esos cambios
      .pipe(
        debounceTime(500),

        switchMap<string, Observable<FilterBooks>>((value) => {
          return this.bookService.filterBooks({
            title: value,
            category: [57]
          })
        }),

        pluck('items'),

        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (books) => {

          this.books = books
        },
      })


  }

  getCategoriesBook() {
    // this.categoryService.getCategory()
    //   .subscribe({
    //     next: (res: CategorieBook[]) => {
    //       this.categories = res
    //       console.log(res, 'respuestaCategorias')
    //     }
    //   })
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
    // this.errorMsg = false
    // this.loading = true;
    this.bookService.getBooksOwner()
      .subscribe({
        next: (res: Book[]) => {
          const arrayBooksFilter = res.filter((element: any) => element.title.includes(value))
          this.books = arrayBooksFilter;
          // this.loading = false;
        },
        error: (err) => {
          // this.errorMsg = true;
        }
      })
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


