import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, Observable, switchMap, tap} from 'rxjs';
import {Book} from '../../interfaces/books.interface';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  //book$!: Observable<Book>
  constructor(private bookService: BooksService,
              private activatedRouted: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRouted.data
      .pipe(
        tap(console.log),
      )

    // this.activatedRouted.params
    //   .pipe(
    //     switchMap(({id}) => this.bookService.getBookById(id))
    //   )
  //.subscribe( (book) => this.book = book )

    .subscribe( ({bookID}) => this.book = bookID )
  }

  get bookTitle() {
    return this.book?.title
    // return (this.book && this.book.title) ? this.book.title : null
  }
  get bookId(){
    return this.book?.id
  }

  get bookImage() {
    return this.book?.image
  }

  get bookAuthor() {
    return this.book?.author
  }

  get bookUrl() {
    return this.book?.url
  }

  get bookResume() {
    return this.book?.resume
  }

  get bookCategory() {
    return this.book?.category
  }

}
