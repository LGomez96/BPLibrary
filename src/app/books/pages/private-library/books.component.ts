import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Book, CategorieBook, FilterBook} from "../../interfaces/books.interface";
import {BooksService, FilterBooks} from "../../services/books.service";
import {CategoriesService} from "../../../service/categories.service";
import {
  debounceTime,
  Observable,
  pluck,
  Subject,
  switchMap,
  takeUntil, tap
} from "rxjs";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = []
  bookName = '';
  loading: boolean = false;
  errorMsg: boolean = false;
  selectedCategoriesValue!: string;
  category = new FormControl();
  word!: any;
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
           this.books = books;
        }}
      )



   }

  filterByCategory(description: any) {
    this.selectedCategoriesValue = this.category.value;

    const data: FilterBook = { 
      title: description,
      category: [ parseInt(this.selectedCategoriesValue)]
    };
    console.log(data)
    return this.bookService.filterBooks( {
      title: data.title,
      category: data.category
    })
    .pipe( pluck('items'),

    takeUntil(this.destroy$))
    .subscribe(
      {
        next:(books: Book[]) =>{
        this.books = books;
          console.log(books)
    }})    
  }


}


