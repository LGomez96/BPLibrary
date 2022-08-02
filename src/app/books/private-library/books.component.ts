import { Component, OnInit } from '@angular/core';
import {Book, CategorieBook} from "../interfaces/books.interface";
import {BooksService} from "../services/books.service";
import {LoginService} from "../../service/login.service";
import {CategoriesService} from "../../service/categories.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  username = this.loginService.user.username;
  books: Book[] = []
  categories: CategorieBook[]= []
  constructor( private categoryService: CategoriesService, private bookService: BooksService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getBooksOwnerList();
      this.getCategoriesBook()
  }

  getCategoriesBook(){
  this.categoryService.getCategory()
    .subscribe({
      next: (res: CategorieBook[] ) => {
        this.categories= res
        console.log(res, 'respuestaCategorias')
      }
    })
  }

  getBooksOwnerList(){
    this.bookService.getBooksOwner()
      .subscribe({
        next: (res)=>{
          res = this.books;
          console.log(res, 'respuestas book')
        }
      })
    if(this.books.length == 0 )
    {
      setTimeout(()=>{
        alert('Aún no se han registrado libros')
      }, 1000)
    }
  }
}
