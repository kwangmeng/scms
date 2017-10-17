import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-studentmodal',
  templateUrl: 'studentmodal.html',
})
export class StudentmodalPage {
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("data");
  }

  ionViewDidLoad() {
 
  }

}
