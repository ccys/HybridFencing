import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MSUser } from '../model/MSUser';
import { MSApp } from '../native/app-mgr/index'
import { MSConstant } from '../logic/MSConstant'
import { MSDeviceModel } from '../model/MSDeviceModel'
import { MessageService } from '../logic/MessageService'
import { ServerTabPage } from '../pages/tab/tab'

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = ServerTabPage;

    private checkInterrupt: boolean = false; // 检查是否中断

    constructor(platform: Platform, private alertCtrl: AlertController, statusBar: StatusBar, splashScreen: SplashScreen, private msUser: MSUser, private msApp: MSApp, private deviceModel: MSDeviceModel, private msgService: MessageService) {
        platform.ready().then(() => {

            this.msUser.initAndGet().then(() => {
                statusBar.styleDefault();
                splashScreen.hide();  // 用户数据初始化结束后才关掉欢迎页面


                /**
                this.bootstrapCheck(); // 启动唯一性检查

                this.addEventListener(); // 添加登录事件的监听

                this.msApp.checkBrowser();
                **/
            })


            // this.msApp.checkUpdate(MSConstant.MS_URL_APK).then((sucessRet) => { // 静默进行版本检测，只警告错误信息
            // }, (rejectRet) => {
            //     if (rejectRet == -2) {
            //         let alert = this.alertCtrl.create({
            //             title: '提示',
            //             subTitle: '下载最新版失败！',
            //             buttons: ['确定']
            //         });

            //         alert.present();
            //     }
            // });

        });
    }

    private addEventListener(): void {
        this.msgService.subscribe(MSConstant.MS_EVENT_TOPIC_LOGIN, (ret) => {
            this.deviceModel.checkFromRemote(); // 登录后立即发送一次请求

            if (!this.checkInterrupt) {
                return; // 检查没有中断，不做处理
            }

            this.checkInterrupt = false;
            this.checkAppStatus();
        });

    }

    private bootstrapCheck(): void {
        this.deviceModel.bootstrap().then(() => {
            this.checkAppStatus();
        }, () => {
            this.checkAppStatus();
        })
    }

    // 检查app状态
    private checkAppStatus(): void {

        this.deviceModel.checkFromRemote().then(() => {
            setTimeout(() => {
                this.checkAppStatus();
            }, MSDeviceModel.INTERVAL_STATUS_MILLI)
        }, (err) => {
            this.checkInterrupt = true; // 检查中断

            this.msUser.quit();

            let tipMsg: string = ""
            if (!err._body) {
                tipMsg = err.error;
            } else {
                tipMsg = err._body
            }

            try {
                tipMsg = JSON.parse(tipMsg)
            } catch (ignore) { }

            let alert = this.alertCtrl.create({
                title: '提示',
                subTitle: tipMsg,
                enableBackdropDismiss: false,
                buttons: [{
                    text: '确定',
                    handler: confirmDataRet => {
                        // this.msUser.login();
                    }
                }]
            });

            alert.present();
        });
    }
}
