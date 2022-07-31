import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLogin, Username } from '../interfaces/my-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    user = {
      userId: sessionStorage.getItem('userId'),
      username: sessionStorage.getItem('username')
    }

  loginUser( body:UserLogin): Observable<any>{
    return this.http.post<any>(environment.apiUrl+'users/login', body)
  }
}
