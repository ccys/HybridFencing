import { ErrorHandler } from '@angular/core';

/**
 * 自定义错误处理，避免出现默认的错误页面，带来不好的影响。
**/
export class MSErrorHandler implements ErrorHandler {
  handleError(err: any): void {
     console.log(err)
  }
}