import { Component } from '@angular/core';
import { NavController, IonicPage, App } from 'ionic-angular';
import { MSHttpProvider } from '../../app/http.provider'
import { MSUser } from '../../model/MSUser'
import { MSDevice } from '../../logic/MSDevice'
import { AppVersion } from '@ionic-native/app-version'
declare const window: any;

@IonicPage()

@Component({
	selector: 'page-mine',
	templateUrl: 'mine.html'
})
export class MinePage {
	menu = [
		{
			name: '当前版本',
			icon: 'icon-bumen',
			version: '1.0.0'
		}
	]

	constructor(public navCtrl: NavController, public httpProvider: MSHttpProvider, public User: MSUser, private app: App, private msDevice: MSDevice,
		private appVersion: AppVersion) {
		this.initAppVersion();
	}

	gotoMenu(path) {
		!!path && this.navCtrl.push(path)
	}

	logout() {
		this.User.quit().then(() => {
			this.app.getRootNavs()[0].push('LoginPage')
			// let rootCtrl = this.navCtrl.parent.parent
			// rootCtrl.setRoot(LoginPage).then(() => {
			// 	rootCtrl.popToRoot()
			// })
		})
	}

	// 初始化app
	private initAppVersion(): void {
		if (this.msDevice.isCordova()) { // 如果是cordova环境，则使用版本
			this.appVersion.getVersionNumber().then((pluginVersion) => {
				this.menu[0].version = pluginVersion;
			});
		} else if (this.msDevice.isDesktopApp()) {
			let electron = window.require('electron');

			if (electron.remote.app) {
				this.menu[0].version = electron.remote.app.getVersion();
			}
		}
	}

}
