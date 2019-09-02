import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class MSDevice {
	constructor( public platfrom: Platform ) {

	}

	// 是否为桌面版本的app
	public isDesktopApp(): boolean {
		return this.platfrom.is('core');
	}

	// 是否为安卓
	public isAndroid(): boolean {
		return this.platfrom.is('android');
	}

	// 是否为ios
	public isIOS(): boolean {
		return this.platfrom.is('ios');
	}

	// 是否为cordova环境
	public isCordova(): boolean {
		return this.platfrom.is('cordova');
	}
}