import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, NavParams, AlertController, Events } from 'ionic-angular';
import { MSHttpProvider } from '../../app/http.provider'
import { MSLiteList } from '../../app/litelist.service'
import { MSConstant } from '../../logic/MSConstant'

@IonicPage({
	segment: 'list'
})

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {

	public list: Array<any> = [];

	public occurHttpError: boolean = false;

	msLiteList: MSLiteList;

	loadFinished: boolean = false

	constructor(public navCtrl: NavController, public httpProvider: MSHttpProvider, private toastCtrl: ToastController, public navParams: NavParams) {
		this.msLiteList = new MSLiteList('/list', {}, this.httpProvider);
	}

	ionViewWillUnload() {
	}

	ionViewDidLoad() {
		this.loadList()
	}

	doInfinite(infiniteScroll) {
		this.loadList(infiniteScroll);
	}

	private loadList(infiniteScroll = null) {
		this.occurHttpError = false;

		this.msLiteList.loadList().then((res) => {
			for (let item of res.rows) {
				this.list.push(item) // 节省内存开销，避免全部加载到内存的计算
			}

			if (infiniteScroll) {
				infiniteScroll.complete(); // 通知组建加载完毕	
			}
			this.loadFinished = true
		}, (reject) => {
			this.occurHttpError = true;
			this.loadFinished = true

			let toast = this.toastCtrl.create({
				message: '加载出现异常',
				duration: 3000,
				position: 'top'
			});

			toast.present();
		})
	}

	public onErrorRefresh(): void {
		this.msLiteList.reset();

		this.loadList();
	}

}
