import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {UserInfo, UserLogin, Username} from '../interfaces/my-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    user: Username = {
      username: sessionStorage.getItem('username')!,
      userId: sessionStorage.getItem('userId')!,

    }

  loginUser( body:UserLogin): Observable<UserInfo>{
    return this.http.post<UserInfo>(environment.apiUrl+'users/login', body)
  }
}
