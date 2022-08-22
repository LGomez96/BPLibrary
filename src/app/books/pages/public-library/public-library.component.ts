import {Component, OnInit, Input} from '@angular/core';
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
  search = new FormControl();
  destroy$: Subject<boolean> = new Subject<boolean>()
  books$!: Observable<Book[]>;
  categories$ !: Observable<CategorieBook[]>

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
    this.getBooksPublicList()
  }
  ngOnDestroy() {
    this.destroy$.next(false)
    this.destroy$.unsubscribe()
  }

 

  getBooksPublicList(){
   this.booksService.filterBooks({
     title: '',  //agg para que no sea case sensitive*
     category: [57]
   }).pipe(
     pluck('items')
   ).subscribe(
     {next: (books) => {
         console.log(books)
         const filterPublicBooks = books.filter( book => book.public).slice(0,30)
          this.publicListOfBooks = filterPublicBooks;
       }}
   )
  }

  observerChangeSearch() {
    //obtengo el cambio de los valores
    this.search.valueChanges    //me suscribo a esos cambios
      .pipe(
        debounceTime(500),

        switchMap<string, Observable<FilterBooks>>((value) => {
          return this.booksService.filterBooks({
            title: value.toLocaleLowerCase(),  //agg para que no sea case sensitive*
            category: [57]
          })
        }),

        pluck('items'),
        tap(console.log),

        takeUntil(this.destroy$)
      ).subscribe(
        {next: (books: Book[]) => {
          console.log(books)
          const filterPublicBooks = books.filter( book => book.public).slice(0,30)
           this.publicListOfBooks = filterPublicBooks;
        }}
      )



   }

}
