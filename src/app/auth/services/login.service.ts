import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {UserInfo, UserLogin, Username} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl+'users/login'

    user: Username = {
      username: sessionStorage.getItem('username')!,
      userId: sessionStorage.getItem('userId')!,

    }

  loginUser( body:UserLogin): Observable<UserInfo>{
    return this.http.post<UserInfo>(this.apiUrl, body)
  }
}
