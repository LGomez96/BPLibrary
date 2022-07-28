import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User{
  username: string,
  email: string,
  password: string,
  category: any [],
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'https://cangular-api.herokuapp.com/';

  constructor(private http: HttpClient) { }

  registerUser( body:User): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}users/` , body)
  }

  categoryOfBooks():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}category`)
  }
}



