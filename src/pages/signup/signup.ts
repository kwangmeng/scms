import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HostProvider} from '../../providers/host/host';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public host:HostProvider) {
    this.host = this.host.getHost();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
