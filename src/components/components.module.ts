import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MsPromptComponent } from './ms-prompt/ms-prompt';
@NgModule({
	declarations: [
		MsPromptComponent,
	],
	imports: [
		IonicModule
	],
	exports: [
		MsPromptComponent,
	]
})
export class ComponentsModule { }
