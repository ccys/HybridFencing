import { Injectable } from '@angular/core';
import { MSStorage } from '../logic/MSStorage';

/**
 * 用户的model
**/
@Injectable()
export class MSUser {

	private code: string = ''; // 用户的code

	private userData: any = {}; // 用户信息

	private initedFromStorage: boolean = false; // 是否已经从缓存中加载 

	private lastLoginTime: number = 0; // 最后登录时间

	private static msStorageId: string = 'ms_hybrid_user';

	constructor(private msStorage: MSStorage) {
	}

	// 保存用户数据信息
	public save(code: string, userData = {}): Promise<any> {
		let deferred = this.defer();

		this.initedFromStorage = false; // 从本地重新加载

		this.msStorage.setItem(MSUser.msStorageId, {code: code, userData: userData}).then(() => {
			this.code = code;
			this.userData = userData;

			deferred.resolve({})
		}, (e) => {
			deferred.reject({})
		})

		return deferred.promise
	}

	// 是否需要登录
	public isNeedLogin(): boolean {
		return !this.getToken();
	}

	public getToken(): string {
		return this.code
	}

	public getName(): string {
		return this.userData.name || '游客'
	}

	public getSavePath(): string {
		return this.userData.savePath || 'assets/imgs/user.png'
	}

	// 最后登录时间
	public getLastLoginTime(): number {
		return this.lastLoginTime;
	}

	// 退出
	public quit(): Promise<any> {
		let deferred = this.defer()

		this.msStorage.remove(MSUser.msStorageId).then(() => {
			this.code = ''
			this.userData = {}

			deferred.resolve({})
		}, () => {
			deferred.reject({})
		})


		return deferred.promise
	}

	// 从本地初始化属性
	public initAndGet(): Promise<any> {
		let deferred = this.defer()

		if (this.initedFromStorage) {
			deferred.resolve({})
		} else {
			this.msStorage.getItem(MSUser.msStorageId).then(
				data => {
					this.initedFromStorage = true;
					
					if (data && data.code) {
						this.code = data.code
						this.userData = data.userData
					}
					
					deferred.resolve({})
				},
				error => {
					deferred.resolve({})
				}
			);
		}


		return deferred.promise
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
}