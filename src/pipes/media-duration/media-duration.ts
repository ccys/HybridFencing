import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MediaDurationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'mediaDuration',
})
export class MediaDurationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    if (!value) {
    	 return '00:00'
    }

    if (value < 3600) {
        let m = Math.floor((value / 60 % 60)),
            s = Math.floor((value % 60));

        return ('00' + m).slice(-2) + ':' + ('00' + s).slice(-2)
    } else {
        let h = Math.floor((value / 3600)),
            m = Math.floor((value / 60 % 60)),
            s = Math.floor((value % 60));

        return ('00' + h).slice(-2) + ':' + ('00' + m).slice(-2) + ':' + ('00' + s).slice(-2)
    }
  }
}
