import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpAngularProvider {
	constructor(public http: HttpClient) { }

	public get(url: string, params?: any, options: any = {}) {
		options.params = params;
		// options.withCredentials = true;

		return this.http.get(url, options).toPromise();
	}

	public post(url: string, params?: any, options: any = {}) {
		// options.withCredentials = true;
		let serializeParam = (new HttpParams({ fromObject: params })).toString()

		return this.http.post(url, serializeParam, options).toPromise();
	}

	public uploadFile(url: string, body: any, headers: any, filePath: string, name: string) {
		// TODO
		return new Promise((resolve, reject) => reject())
	}

}
@Injectable()
export class HttpNativeProvider {
	constructor(public http: HTTP) { }

	public get(url: string, params?: any, options: any = {}) {
		for (let key in params) {
			if (typeof params[key] !== 'string') {
				params[key] = params[key].toString()
			}
		}
		// params 值必须为string
		return this.http.get(url, params, options.headers || {})
			.then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));
	}

	public post(url: string, params?: any, options: any = {}) {
		return this.http.post(url, params, options.headers || {})
			.then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));
	}

	public uploadFile(url: string, body: any, headers: any, filePath: string, name: string) {
		return this.http.uploadFile(url, body, headers, filePath, name)
	}
}
