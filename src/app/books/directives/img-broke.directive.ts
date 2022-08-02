import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appImgBroke]'
})
export class ImgBrokeDirective {


  constructor( private elementRef: ElementRef) { }

  @HostListener('error')
  imageByDefault(){
     const img = this.elementRef.nativeElement
     img.src = 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2020/02/error-404-1862483.jpg?itok=OUXEJayy'
  }

}
