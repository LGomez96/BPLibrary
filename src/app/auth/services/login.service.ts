import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, mapTo, Observable, of, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserInfo, UserLogin, Username} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  apiUrl = environment.apiUrl + 'users/login'

  user: Username = {
    username: sessionStorage.getItem('username')!,
    userId: sessionStorage.getItem('userId')!,

  }

  loginUser(body: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, body)
      .pipe(

        tap({
          next: (response: any) => {
            sessionStorage.setItem('access_token', response.access_token)
            sessionStorage.setItem('userId', response.user.userId);
            sessionStorage.setItem('username', response.user.username);

            this.user = response.user;
          }
        }),

        mapTo({
          status: true,
          message: 'Bienvenido'
        }),

        catchError(() =>
          of({
            status: false,
            message: 'Error al autenticar'
          })
        ),

        tap(console.log),

      )
  }
}


export interface LoginResponse {
  status: boolean,
  message: string,
}
