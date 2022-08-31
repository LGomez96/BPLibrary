import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Book, FilterBook, ResponseBook} from "../interfaces/books.interface";

export interface FilterBooks {
  count: number,
  items: Book[]
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = environment.apiUrl + 'books/';
  @Output() dispachtBooks = new EventEmitter();

  constructor(private http: HttpClient) {
  }



  getBooksOwner(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + 'owner')
  }

  addBookOwner(body: Book): Observable<ResponseBook> {
    return this.http.post<ResponseBook>(this.apiUrl + 'owner', body)
  }

  filterBooks(filter: FilterBook): Observable<FilterBooks> {
    return this.http.post<any>(this.apiUrl + 'filter', filter);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}owner/${id}`)
      .pipe(
        tap(console.log)
      )
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}owner/${id}`, book)}

//utilizar principios de responsabilidad unica
//los componentes deben estar dentro de pages si tienen varios


}
