import { LoadingController, App, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { MSConstant } from '../logic/MSConstant';
import { MSUser } from '../model/MSUser'
import { HttpAngularProvider, HttpNativeProvider } from '../logic/MSHttp'
// import { InAppBrowser } from '@ionic-native/in-app-browser';

import 'rxjs/add/operator/toPromise';
import { MSDevice } from '../logic/MSDevice';


@Injectable()
export class MSHttpProvider {
	private http: HttpNativeProvider | HttpAngularProvider;

	constructor(public loadingCtrl: LoadingController, public msUser: MSUser, private ionicApp: App,private msDevice: MSDevice,
		private angularHttp: HttpAngularProvider, private nativeHttp: HttpNativeProvider) {

		this.http = this.msDevice.isCordova() ? this.nativeHttp : this.angularHttp;
	}

	// 获取文件
	public fetchFile(path: string): Promise<any> {
		return this.angularHttp.get(path)
	}

	public getActualUrl(url) {
		let actualUrl = url;
		if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
			actualUrl = MSConstant.MS_HTTP_BASE_URL + url;
		}
		return actualUrl
	}

	public httpGet(url: string, params = {}, loader: boolean = true): Promise<any> {
		let loading: Loading = null;

		if (loader) {
			loading = this.loadingCtrl.create({
				content: '努力加载中...'
			});

			loading.present();
		}

		return new Promise((resolve, reject) => {
			this.msUser.initAndGet().then(() => {
				this.http.get(this.getActualUrl(url), params, {
					headers: {
						MSCODE: this.msUser.getToken(),
					}
				}).then(res => {
					if (loader) {
						loading.dismiss();
					}

					resolve(res)
				}, async error => {
					if (loader) {
						await loading.dismiss()
					}

					this.handleError(error)
					
					reject(error)
				});
			})
		})
	}
	public httpPost(url: string, params = {}, loader: boolean = true): Promise<any> {
		let loading: any = null;

		if (loader) {
			loading = this.loadingCtrl.create({
				content: '努力加载中...'
			});

			loading.present();
		}

		return new Promise((resolve, reject) => {
			this.msUser.initAndGet().then(() => {

				this.http.post(this.getActualUrl(url), params, {
					headers: {
						MSCODE: this.msUser.getToken(),
						'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				}).then(res => {
					if (loader) {
						loading.dismiss();
					}

					resolve(res)
				}, error => {
					if (loader) {
						loading.dismiss();
					}

					this.handleError(error)

					reject(error)
				});
			})
		})
	}

	// 上传文件
	public uploadFile(url: string, params = {}, filePath: string, name: string): Promise<any> {
		let loading: any = this.loadingCtrl.create({
			content: '上传中...'
		});

		loading.present();
		return new Promise((resolve, reject) => {
			this.nativeHttp.uploadFile(MSConstant.MS_HTTP_BASE_URL + url, params, {
				MSCODE: this.msUser.getToken(),
			}, filePath, name).then((res:any) => {
				loading.dismiss();

				try {
					let ret = JSON.parse(res.data)

					resolve(ret)
				} catch (ignore) {
					reject(res)
				}
			}).catch(error => {
				loading.dismiss();

				reject(error)
			});
		})
	}

	private handleError(error: any): string {
		switch (error.status) {
			case MSConstant.STATUS_NO_AUTH:
				// this.msLoginAuth.login();
				return;

			default:
				return;
		}
	}

}
