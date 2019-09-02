import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { MSHttpProvider } from './http.provider';
import { HttpAngularProvider, HttpNativeProvider } from '../logic/MSHttp';
import { MSStorage } from '../logic/MSStorage';
import { MSUser } from '../model/MSUser';
import { MessageService } from '../logic/MessageService'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Brightness } from '@ionic-native/brightness';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeStorage } from '@ionic-native/native-storage';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { MSApp } from '../native/app-mgr/index'
import { MSErrorHandler } from './MSErrorHandler'

import { MSDevice } from '../logic/MSDevice'
import { MSDeviceModel } from '../model/MSDeviceModel'
import { HTTP } from '@ionic-native/http'
import { ServerTabPage } from '../pages/tab/tab'

@NgModule({
  declarations: [
    MyApp,
    ServerTabPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      tabsHideOnSubPages: true,
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ServerTabPage,
  ],
  providers: [
    StatusBar,
    SplashScreen, HTTP, MSHttpProvider, PhotoViewer, ScreenOrientation, Brightness, PhotoLibrary, AppVersion,
    StreamingMedia, InAppBrowser, NativeStorage, MSStorage, MSUser, MSApp, MessageService, Device, MSDevice, MSDeviceModel,
    HttpAngularProvider, HttpNativeProvider,
    { provide: ErrorHandler, useClass: MSErrorHandler }
  ]
})
export class AppModule { }
