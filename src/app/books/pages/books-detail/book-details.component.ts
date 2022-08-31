import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import {Book, CategorieBook} from '../../interfaces/books.interface';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  categories$!: Observable<CategorieBook[]>
  categories: CategorieBook[] = [];


  //book$!: Observable<Book>
  constructor(
              private activatedRouted: ActivatedRoute,
              private categoryService: CategoriesService,
  ) {
    this.getCategory()
  }

  ngOnInit(): void {
    this.activatedRouted.data
      .pipe(
        tap(console.log),
      )

     .subscribe( ({bookID}) => {
      this.book = bookID;
       
    })
  }

   getCategory(){
    return  this.categoryService.getCategory()
    .subscribe(res => {
     this.categories = [ ...res]
     this.categories.filter(        
        category => {          
          this.book.category.find(id => category.id === id) }
        )}
      )
           
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
