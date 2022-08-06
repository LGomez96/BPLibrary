import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {CategorieBook} from "../books/interfaces/books.interface";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  categories$!: Observable<CategorieBook[]>

  constructor(private http: HttpClient) {
  }

  getCategory(): Observable<CategorieBook[]> {
    return this.http.get<CategorieBook[]>(this.apiUrl + 'category')
      .pipe(
        map(categories =>
          categories.slice(0, 15)
        )
      )
  }
}
