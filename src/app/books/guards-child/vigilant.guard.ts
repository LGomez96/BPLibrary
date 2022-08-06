import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AddBooksComponent} from "../pages/add-books/add-books.component";

@Injectable({
  providedIn: 'root'
})
export class VigilantGuard implements CanDeactivate<AddBooksComponent> {
  canDeactivate(
    component: AddBooksComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canBack();
    //cambiar videos
  }

}
