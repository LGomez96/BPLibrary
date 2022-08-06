import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BooksComponent} from "./pages/private-library/books.component";
import {AddBooksComponent} from "./pages/add-books/add-books.component";
import {BookDetailsComponent} from "./pages/books-detail/book-details.component";
import {PublicLibraryComponent} from "./pages/public-library/public-library.component";
import {BooksResolver} from "./resolver/books-resolver";
import {AuthGuard} from "../auth/guards/auth.guard";
import {VigilantGuard} from "./guards-child/vigilant.guard";

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: 'private-library',
        component: BooksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add-books',
        component: AddBooksComponent,
        canActivate: [AuthGuard],
        canDeactivate: [VigilantGuard]
      },
      {
        path: 'add-books/:id',
        component: AddBooksComponent,
        canActivate: [AuthGuard],
        canDeactivate: [VigilantGuard]
      },
      {
        path: ':id',
        component: BookDetailsComponent,
        resolve: {
          bookID: BooksResolver
        },
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: PublicLibraryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'books',
        canActivate: [AuthGuard]
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ],
  // providers: [
  //   {
  //     provide: 'BooksResolver',
  //     useValue: (route: ActivatedRouteSnapshot,
  //                state: RouterStateSnapshot) => myHero
  //   }
  // ]
})
export class BooksRoutingModule { }
