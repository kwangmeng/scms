import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HostProvider} from '../../providers/host/host';


@IonicPage()
@Component({
  selector: 'page-chatmodal',
  templateUrl: 'chatmodal.html',
})
export class ChatmodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public host:HostProvider) {
    this.host = this.host.getHost();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatmodalPage');
  }

}
