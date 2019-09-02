import {MSHttpProvider} from './http.provider'

/**
 * 下拉加载
*/
export class MSLiteList {
	private page: number = 1; // 当前页

	private moreData: boolean = true; // 是否有更多数据

	constructor ( private url: string,  private params: any = {}, private msHttpProvider: MSHttpProvider ) {

	}

	private defer() {
        let deferred: any = {
        	resolve: null,
        	reject: null
        };

        let promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        })

        deferred.promise = promise;
        return deferred;
    }

    // 上拉加载数据
	public loadList( loadParams: any = {} ) {
		let deferred = this.defer()

        Object.assign(this.params, loadParams, {
        	page: this.page
        })

		this.msHttpProvider.httpGet(this.url, this.params, this.page <= 1 ).then( (res) => {
  	  	   this.moreData = Math.ceil( res.total / res.pageSize ) > res.page

  	  	   this.page = ++res.page

  	  	   deferred.resolve(res);
  	  	}, (reject ) => {
  	  		deferred.reject(reject)
  	  	})

  	  	return deferred.promise
	}

	// 重置
	public reset(): void {
		this.page = 1

		this.moreData = true
	}

	// 是否有更多数据
	public hasMoreData(): boolean {
		return this.moreData;
	}

	public getLoadTip(): string {
		if ( this.moreData ) {
			return '正在加载中...';
		} else {
			return '已全部加载.'
		}
	}
}