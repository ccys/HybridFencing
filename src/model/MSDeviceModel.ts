import { Injectable } from '@angular/core';
import { MSStorage } from '../logic/MSStorage'
import { MSHttpProvider } from '../app/http.provider'
import { MSConstant } from '../logic/MSConstant'
import { MSUser } from '../model/MSUser'
import { Device } from '@ionic-native/device';
import { MSDevice } from '../logic/MSDevice'
import { MSApp } from '../native/app-mgr'

declare const window: any;

@Injectable()
export class MSDeviceModel {
	private static msDeviceStorageId: string = 'ms_hybird_device';

	public static INTERVAL_STATUS_MILLI = 90 * 1000; // 120s发送一次

	private serialNo: string = ''; // 设备号码

	private version: string = ''; // 设备版本

	private platform: string = ''; // 平台

	private deviceType: string = ''; // 获取设备类型,mobile：手机、tv：电视、pad: 平板

	public static TYPE_DEVICE_MOBILE = 'mobile'; // 手机

	public static TYPE_DEVICE_TV = 'tv'; // 电视

	public static TYPE_DEVICE_PAD = 'pad'; // pad版

	constructor(public msStorage: MSStorage, public device: Device, private msApp: MSApp, private msDevice: MSDevice, private msHttpProvider: MSHttpProvider, private msUser: MSUser) {
	}

	// 获取设备号
	public getSerialNo(): string {
		return this.serialNo;
	}

	// 从远程进行检查
	public checkFromRemote(): Promise<any> {
		let deferred = this.defer();

/*		this.msHttpProvider.httpGet(MSConstant.MS_URL_CHECK, {
			'device': this.serialNo,
			'model': this.platform,
			'version': this.version,
			'unionId': this.msUser.getWeChatUnionId(),
			// 此处的目的在于：如果在服务器端处理，那么有可能会出现后台成功，但是提示前台失败的情况，会造成干扰，所以统一在前台发送请求
			'lastLoginTime': this.msUser.getLastLoginTime()
		}, false).then(() => {
			deferred.resolve({});
		}, (checkError) => {
			if (checkError && checkError.status == MSConstant.STATUS_OFFLINE) {
				deferred.reject(checkError);
			} else {
				deferred.resolve({});
			}
		})
*/
		return deferred.promise;
	}

	public bootstrap(): Promise<any> {
		let deferred = this.defer();

		this.loadDeviceFromLocal().then(() => {
			if (this.serialNo) {
				deferred.resolve({});

				return deferred.promise;
			}
		}, () => {
		})

		this.initDeviceToLocal().then(() => {
			let jsonData = {
				serialNo: this.serialNo,
				version: this.version,
				platform: this.platform
			};
			let jsonStr = JSON.stringify(jsonData);

			if (this.msDevice.isCordova()) {
				this.msStorage.setItem(MSDeviceModel.msDeviceStorageId, jsonStr).then(() => {
					deferred.resolve({})
				}, () => {
					deferred.resolve({})
				})
			} else {
				window.localStorage.setItem(MSDeviceModel.msDeviceStorageId, jsonStr);

				deferred.resolve({})
			}
		}, () => {
			deferred.reject({});
		})

		return deferred.promise;
	}

	// 加载本地设备信息到本地存储
	private initDeviceToLocal(): Promise<any> {
		let deferred = this.defer()

		if (this.msDevice.isCordova()) {
			this.platform = this.device.platform;
			this.serialNo = this.device.uuid;
			this.version = this.device.version;

			deferred.resolve({});
		} else {
		}

		return deferred.promise
	}

	// 从本地进行加载
	private loadDeviceFromLocal(): Promise<any> {
		let deferred = this.defer()

		if (this.msDevice.isCordova()) {
			this.msStorage.getItem(MSDeviceModel.msDeviceStorageId).then(
				data => {
					if (!data) {
						deferred.reject({});
					} else {
						this.jsonToProperty(JSON.parse(data))

						deferred.resolve({})
					}
				},
				error => {
					deferred.reject({})
				}
			);
		} else {
			let data = window.localStorage.getItem(MSDeviceModel.msDeviceStorageId);
			if (!data) {
				deferred.reject({});
			} else {
				this.jsonToProperty(JSON.parse(data))

				deferred.resolve({})
			}

		}

		return deferred.promise
	}

	private jsonToProperty(jsonData: any) {
		this.serialNo = jsonData && jsonData.serialNo ? jsonData.serialNo : '';

		this.version = jsonData && jsonData.version ? jsonData.version : '';

		this.platform = jsonData && jsonData.platform ? jsonData.platform : '';
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