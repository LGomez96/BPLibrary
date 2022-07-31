import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebaScreenComponent } from './screens/prueba-screen/prueba-screen.component';



@NgModule({
  declarations: [
    PruebaScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PruebaScreenComponent
  ]
})
export class PruebaModule { }
