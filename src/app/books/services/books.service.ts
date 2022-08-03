import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Book, CategorieBook, FilterBook, ResposeBook} from "../interfaces/books.interface";

@Injectable({
  providedIn: 'root'
})
export class BooksService implements HttpInterceptor {
  //cambiarlo y dejarlo solo
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = sessionStorage.getItem('access_token')
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return next.handle(newReq);
  }

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.apiUrl + 'books/';


  getBooksOwner(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + 'owner')
  }
  addBookOwner(body:Book): Observable< ResposeBook>{
    return this.http.post< ResposeBook>(this.apiUrl + 'owner', body)
  }
  filterBooks(filter: FilterBook): Observable<any> {
    return this.http.post<any>(this.apiUrl+ 'filter', filter);
  }
  
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}owner${id}`);
  }

//utilizar principios de responsabilidad unica
  //sacar categori y colocarlo en otro servicio
  //los componentes deben estar dentro de pages si tienen varios


}
