import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HostProvider} from '../../providers/host/host';


@IonicPage()
@Component({
  selector: 'page-studentmodal',
  templateUrl: 'studentmodal.html',
})
export class StudentmodalPage {
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public host:HostProvider) {
    this.data = this.navParams.get("data");
    this.host = this.host.getHost();
  }

  ionViewDidLoad() {
 
  }

}
