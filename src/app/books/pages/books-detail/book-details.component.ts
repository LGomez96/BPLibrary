import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Book } from '../../interfaces/books.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;

  constructor(private bookService: BooksService,
              private activatedRouted: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRouted.params
    .pipe(
      switchMap(({id})=> this.bookService.getBookById(id))
    )
    .subscribe( res => this.book = res)
  }


}
