import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../auth/services/login.service";

@Injectable({
  providedIn: 'root'
})
export class CanloadGuard implements CanLoad {
  constructor(private loginService: LoginService, private route: Router) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('guarda can load*******')
    //insertar lógica para que si no se loguea este modulo no se cargue
    if (!this.loginService.user || !sessionStorage.getItem('access_token')) {
      this.route.navigate(['**']);
      return false;
    } else {
      return true;
    }
  }
}
