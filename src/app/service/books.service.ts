import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor( private http: HttpClient) { }

  private apiUrl = environment.apiUrl;


  getBooks():Observable<any>{
    return this.http.get<any>( this.apiUrl +'owner')
  }

  //https://cangular-api.herokuapp.com/books/owner
}
