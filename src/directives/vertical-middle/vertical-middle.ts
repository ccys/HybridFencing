import { Directive, Input, ElementRef } from '@angular/core';

/**
 * Generated class for the VerticalMiddleDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[vertical-middle]' // Attribute selector
})
export class VerticalMiddleDirective {
  constructor(private el: ElementRef) {
  }

  @Input('vertical-middle') 
  set enterText( text: string ) {
  	 let parentNodeHeight = this.el.nativeElement.parentNode.offsetHeight;
  	 
  	 setTimeout( () => {
  	 	let offsetTop = (parentNodeHeight - this.el.nativeElement.offsetHeight) / 2;

  	 	this.el.nativeElement.style.marginTop = offsetTop > 0 ? offsetTop + 'px' : 0;
  	 }, 5)
  }



}
