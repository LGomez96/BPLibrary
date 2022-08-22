import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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
  take, takeLast, takeUntil, tap
} from "rxjs";
import {FormControl} from '@angular/forms';

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

  books$!: Observable<Book[]>;
  categories$!: Observable<CategorieBook[]>


  // Observables - Subjects - BehaviorSubjects

  destroy$: Subject<boolean> = new Subject<boolean>()


  constructor(private categoryService: CategoriesService,
              private bookService: BooksService,) {

    this.categories$ = this.categoryService.getCategory();
    this.books$ = this.bookService.getBooksOwner();


    // Emite un valor
    // this.destroy$.next()

    // this.destroy$.subscribe()
    // this.destroy$.unsubscribe()

    // Obtener un Observable
    // this.destroy$.asObservable()


  }

  ngOnInit(): void {
      // this.observerChangeSearch();
  }

  ngOnDestroy() {
    this.destroy$.next(false)
    this.destroy$.unsubscribe()
  }


  // observerChangeSearch() {
  //   //obtengo el cambio de los valores
  //   this.search.valueChanges    //me suscribo a esos cambios
  //     .pipe(
  //       debounceTime(500),

  //       switchMap<string, Observable<FilterBooks>>((value) => {
  //         return this.bookService.filterBooks({
  //           title: value.toLocaleLowerCase(),  //agg para que no sea case sensitive*
  //           category: [57]
  //         })
  //       }),

  //       pluck('items'),
  //       tap(console.log),

  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe({
  //       next: (books) => {
  //         this.books = books;
  //       },
  //     })


  //}


}


