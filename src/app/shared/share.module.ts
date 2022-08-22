import { NgModule } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {CommonModule} from "@angular/common";
//import {SearchInputComponent} from "./search-input/search-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations:[
    HeaderComponent,
    //SearchInputComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    HeaderComponent,
    //SearchInputComponent
  ]
})
export class SharedModule {
}
