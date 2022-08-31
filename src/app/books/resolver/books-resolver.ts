import { Injectable } from '@angular/core';
import {Book} from "../interfaces/books.interface";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, Observable, of, tap} from "rxjs";
import {BooksService} from "../services/books.service";

@Injectable({
  providedIn: 'root'
})
export class BooksResolver implements Resolve<Book>{

  constructor( private booksService: BooksService, route: Router) { }

  resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> | Promise<Book> | Book =>
  {
       return this.booksService.getBookById(route.paramMap.get('id')as string)
    
  };
}
