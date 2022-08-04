import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';
import {Book} from '../../interfaces/books.interface';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;

  constructor(private bookService: BooksService,
              private activatedRouted: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRouted.params
      .pipe(
        switchMap(({id}) => this.bookService.getBookById(id))
      )
      .subscribe(res => this.book = res)
  }

  get bookTitle() {
    return this.book?.title
    // return (this.book && this.book.title) ? this.book.title : null
  }

  //get bookTitle() { return (this.book && this.book.title) ? this.book.title : null }
  get bookImage() {
    return (this.book && this.book.image) ? this.book.image : null
  }

  get bookAuthor() {
    return (this.book && this.book.author) ? this.book.author : null
  }

  get bookUrl() {
    return (this.book && this.book.url) ? this.book.url : null
  }

  get bookResume() {
    return (this.book && this.book.resume) ? this.book.resume : null
  }

  get bookCategory() {
    return (this.book && this.book.category) ? this.book.category : null
  }

}
