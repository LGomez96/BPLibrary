import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CategorieBook} from "../books/interfaces/books.interface";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
apiUrl = environment.apiUrl;
  getCategory(): Observable<CategorieBook[]> {
    return this.http.get<CategorieBook[]>(this.apiUrl + 'category')
  }
}
