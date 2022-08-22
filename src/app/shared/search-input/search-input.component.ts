// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormControl } from "@angular/forms";
// import { debounceTime, Observable, pluck, Subject, switchMap, takeUntil, tap } from "rxjs";
// import { BooksService, FilterBooks } from "../../books/services/books.service";
// import { Book, CategorieBook } from "../../books/interfaces/books.interface";
// import { CategoriesService } from "../../service/categories.service";

// @Component({
//   selector: 'app-search-input',
//   templateUrl: './search-input.component.html',
//   styleUrls: ['./search-input.component.scss']
// })
// export class SearchInputComponent implements OnInit {
//   search = new FormControl();// creo un control y lo enlazo al html
//   book!: string;
//   books$!: Observable<Book[]>;
//   destroy$: Subject<boolean> = new Subject<boolean>()
//   categories$!: Observable<CategorieBook[]>
//   @Output() onEnter: EventEmitter<string> = new EventEmitter();



//   constructor(private bookService: BooksService,
//     private categoryService: CategoriesService
//   ) {
//     this.categories$ = this.categoryService.getCategory();


//   }

//   ngOnInit(): void {
//     // this.observerChangeSearch()
//   }

//   // observerChangeSearch() {
//   //   //obtengo el cambio de los valores
//   //   this.search.valueChanges    //me suscribo a esos cambios
//   //     .pipe(
//   //       debounceTime(500),

//   //       switchMap<string, Observable<FilterBooks>>((value) => {
//   //         return this.bookService.filterBooks({
//   //           title: value.toLocaleLowerCase(),  //agg para que no sea case sensitive*
//   //           category: [57]
//   //         })
//   //       }),

//   //       pluck('items'),
//   //       tap(console.log),

//   //       takeUntil(this.destroy$)
//   //     ).subscribe(
//   //       books => {
//   //         this.books$ = books;
//   //       } 
//   //     )



//   //  }

//   searchBooks(){
//     this.onEnter.emit(this.book)
//     console.log(this.book)
//   }
 
// }
