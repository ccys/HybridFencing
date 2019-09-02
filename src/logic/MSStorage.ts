import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { MSDevice } from '../logic/MSDevice'

/**
 * 本地存储，使用源生存储，浏览器存储会有性能、兼容性、存储量的缺陷
**/
@Injectable()
export class MSStorage {

	private isCordova = this.msDevice.isCordova()

	constructor(private nativeStorage: NativeStorage, private msDevice: MSDevice) {

	}

	public useNativeStorage(): boolean {
		return this.isCordova
	}

	// 设置指定项
	public setItem(itemKey: string, itemValue: any): Promise<any> {
		if (this.useNativeStorage()) {
			return this.nativeStorage.setItem(itemKey, itemValue);

		} else {
			window.localStorage.setItem(itemKey, itemValue);

			return Promise.resolve()
		}
	}

	// 获取指定项
	public getItem(itemKey: string): Promise<any> {
		if (this.useNativeStorage()) {
			return this.nativeStorage.getItem(itemKey);

		} else {
			window.localStorage.getItem(itemKey);

			return Promise.resolve()
		}
	}

	// 移除指定的key
	public remove(itemKey: string): Promise<any> {
		if (this.useNativeStorage()) {
			return this.nativeStorage.remove(itemKey);

		} else {
			window.localStorage.removeItem(itemKey);

			return Promise.resolve()
		}
	}

	// 清除所有存储
	public clear(): Promise<any> {
		if (this.useNativeStorage()) {
			return this.nativeStorage.clear();

		} else {
			window.localStorage.clear();

			return Promise.resolve()
		}
	}
}