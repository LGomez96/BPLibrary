import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


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
    return this.http.post<any>(environment.apiUrl+'users/', body)
  }

  existUserName(username: string):Observable<any>{
    return this.http.get<any>(environment.apiUrl + 'users/exist-name/'+ username)

  }
  existEmail(email:string):Observable<any>{
    return this.http.get<any>( environment.apiUrl+'/users/exist-email='+ email)
  }
  
}



