import { Component, Input,  ElementRef, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the MsPromptComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ms-prompt',
  templateUrl: 'ms-prompt.html'
})
export class MsPromptComponent {
  private errormsg: string = '发生错误，请点击重试！';

  constructor(private el: ElementRef) {
  }

  @Output() onErrorRefresh: EventEmitter<any> = new EventEmitter();


  @Input('empty')
  set showEmptyVal( showVal: string ) {
  	 this.initShowEmptyStatus( showVal )
  }

  @Input('error')
  set showError( errorVal: string ) {
    this.initShowErrorStatus( errorVal ); // 如果有错误信息，那么也要显示
  }

  private initShowErrorStatus( errorVal: string ) {
    let showError = errorVal == 'true' || errorVal == '1';

    if ( showError ) {
      this.initShowEmptyStatus('0');

      this.el.nativeElement.querySelector('div.error').style.display = 'block';
    } else {
      this.el.nativeElement.querySelector('div.error').style.display = 'none';
    }
  }

  private initShowEmptyStatus( emptyVal: string ) {
     let showEmpty = emptyVal == 'true' || emptyVal == '1';
     if ( showEmpty ) {
       this.initShowErrorStatus('0');
       this.el.nativeElement.querySelector('div.empty').style.display = 'block';
     } else {
       this.el.nativeElement.querySelector('div.empty').style.display = 'none';
     }
  }

  public refreshEvent( $event ): void {
     this.onErrorRefresh.emit( $event )
  }

}
