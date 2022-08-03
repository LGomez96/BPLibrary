import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ErrorPageComponent} from "./shared/error-page/error-page.component";
import { RouterModule } from '@angular/router';
import { InterceptorsService } from './books/interceptor/interceptors';
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    //HeaderComponent
  ]
})
export class AppModule { }
