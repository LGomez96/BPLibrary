import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {mapTo, Observable, tap} from 'rxjs';
import {LoginService} from "../services/login.service";
import {UserLogin} from "../interfaces/auth.interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  body!: UserLogin;
  constructor(private loginService: LoginService, private route: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    if (!sessionStorage.getItem('username') || !sessionStorage.getItem('access_token')||!sessionStorage.getItem('userId')) {
      this.route.navigate(['**']); //login
      return false;
    } else {
      return true;
    }
  }

  //crear en los interceptores header personalizados para los servicios
//guardar en enums o en enviroment para evitar errores de tipeo y tomar otra palabra clave accidentalmente
}
