import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface UserLogin{
  username: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser( body:UserLogin): Observable<any>{
    return this.http.post<any>(environment.apiUrl+'users/login', body)
  }
}
