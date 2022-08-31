import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/auth.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'users/'; //save private

  constructor(private http: HttpClient) { }

  registerUser( body:User): Observable<any>{
    return this.http.post<any>( this.apiUrl, body) //no directo
  }

 
  existEmail(email:string):Observable<any>{
    return this.http.get<any>( this.apiUrl +'exist-email='+ email)
  }
  existUserName(username: string):Observable<any>{ //interface de la respuesta para el observable
    return this.http.get<any>(this.apiUrl + '/exist-name/'+ username)

  }
}



