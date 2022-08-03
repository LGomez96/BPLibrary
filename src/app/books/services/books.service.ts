import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Book,  FilterBook, ResponseBook} from "../interfaces/books.interface";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.apiUrl + 'books/';



  getBooksOwner(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + 'owner')
  }
  addBookOwner(body:Book): Observable< ResponseBook>{
    return this.http.post< ResponseBook>(this.apiUrl + 'owner', body)
  }
  filterBooks(filter: FilterBook): Observable<any> {
    return this.http.post<any>(this.apiUrl+ 'filter', filter);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}owner/${id}`);
  }

//utilizar principios de responsabilidad unica

  //los componentes deben estar dentro de pages si tienen varios


}
