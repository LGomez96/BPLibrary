import {Component, OnInit} from '@angular/core';
import {Book, CategorieBook} from "../../interfaces/books.interface";
import {BooksService, FilterBooks} from "../../services/books.service";
import {CategoriesService} from "../../../service/categories.service";
import {FormControl} from "@angular/forms";
import {debounceTime, filter, map, Observable, pluck, Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-public-library',
  templateUrl: './public-library.component.html',
  styleUrls: ['./public-library.component.scss']
})
export class PublicLibraryComponent implements OnInit {
  publicListOfBooks: Book[] = [];
  privateBooklist: Book[] =[] //traer con un observable el getowner books 
  ownerLibrary: Book[] = [];
  search = new FormControl();
  categories$!: Observable<CategorieBook[]>
  destroy$: Subject<boolean> = new Subject<boolean>()
  books$!: Observable<Book[]>;

  constructor(
    private booksService: BooksService,
    private categoryService: CategoriesService
  ) {
    this.categories$ = this.categoryService.getCategory();
    this.books$ = this.booksService.getBooksOwner()
    .pipe(
      map(books =>
        books.slice(0,5))
    )

  }

  ngOnInit(): void {
    this.observerChangeSearch()
     // this.getBooksOwnerList()
  }
  ngOnDestroy() {
    this.destroy$.next(false)
    this.destroy$.unsubscribe()
  }

  observerChangeSearch() {
    //obtengo el cambio de los valores
    this.search.valueChanges    //es un observable
      .pipe(
        debounceTime(500),
        switchMap<string, Observable<FilterBooks>>((value) => { //transformo un observable
          return this.booksService.filterBooks({          //traigo mi peticion para recibir la palabra
            title: value,                                      //mi petición es un objeto por lo que le asigno el value
            category: [57]                                    //al que necesito capturar
          })
        }),

        pluck('items'),                       //extraigo y empujo mis items (como un push) xq voy a usarlo

        takeUntil(this.destroy$)                        //le digo que se suscriba hasta que destroy pase un valor
      )                                                 //cierro mi pipe y me subscribo al observable
      .subscribe({
        next: (books) => {
          const publicsBooks = books.filter((book: Book) => book.public).slice(0, 30)     //le digo que si existe rpta positiva los filtre
          this.publicListOfBooks = publicsBooks
          console.log(this.publicListOfBooks)
        },
      })
  }

  // getBooksOwnerList() {
  //   if (this.publicListOfBooks.length == 0) {
  //     this.booksService.getBooksOwner()
  //       .subscribe(
  //         (res: Book[]) => {

  //           const publicsBooks = res.filter((book: Book) => book.public).slice(0, 5)
  //           this. privateBooklist = publicsBooks
  //           console.log(res, 'respuestas book publics')
  //         });
  //   }
  // }
}
