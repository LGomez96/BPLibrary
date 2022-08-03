import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/auth.interfaces';

//utilizar intefaces en archivos separados por modulos = empaquetador {declaraciones, import, export, directivas, servicios, etc}

//rutas const
//revisar enums en typescript
//documentar los parametros que envío y que recibo, para saber que hace cada cosa
//leer jsDocs
//lazy loading, carga  perezosa para cada modulo (te dirige a las vistas/register/login etc) solo carga ese modulo
//getters
//errores son objetos

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = environment.apiUrl+'users/'; //save private

  constructor(private http: HttpClient) { }

  registerUser( body:User): Observable<any>{
    return this.http.post<any>( this.apiUrl, body) //no directo
  }

  existUserName(username: string):Observable<any>{ //interface de la respuesta para el observable
    return this.http.get<any>(this.apiUrl + 'exist-name/'+ username)

  }
  existEmail(email:string):Observable<any>{
    return this.http.get<any>( this.apiUrl +'exist-email='+ email)
  }

}



