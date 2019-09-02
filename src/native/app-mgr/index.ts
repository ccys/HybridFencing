import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';

@Plugin({
  pluginName: 'MSApp',
  plugin: 'com.mansuo.plugins',
  pluginRef: 'AppMgr',
  platforms: ['Android']
})

@Injectable()
export class MSApp extends IonicNativePlugin {
   @Cordova({
   	 callbackOrder: 'reverse'
  	})
  	checkUpdate( url: string ): Promise<any> { return; }

  	@Cordova()
  	getVersion(): Promise<number> {return ;}

    @Cordova()
    checkBrowser(): Promise<number> {return ;}

    @Cordova()
    getDeviceType(): Promise<string> {return ;}
}