import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Book, CategorieBook} from "../interfaces/books.interface";

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

//utilizar principios de responsabilidad unica
  //sacar categori y colocarlo en otro servicio


}
