import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClubmodalPage} from '../clubmodal/clubmodal';


@IonicPage()
@Component({
  selector: 'page-clubmgmt',
  templateUrl: 'clubmgmt.html',
})
export class ClubmgmtPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

  detail(){
   this.navCtrl.push(ClubmodalPage);
  }
}
