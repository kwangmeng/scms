import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events  } from 'ionic-angular';
import {ModalPage} from '../modal/modal';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
})
export class ClubPage {
 host:any="192.168.0.2";
  clubs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public http:Http, public events:Events) {
    
    this.events.subscribe('reloadClub',() => {
       this.events.publish('reloadHome');
      this.loadClubs();
      this.unsubscribe();
});
    
  }

  ionViewDidLoad() {
 this.loadClubs();
  }

     unsubscribe(){
    this.events.unsubscribe('reloadClub');
  }

  ionViewDidLeave(){
  //  this.events.unsubscribe('reloadClub');
  }

  loadClubs(){
    console.log("came here");
    this.http.get("http://"+this.host+"/cms-scms-server/loadapplication.php").map(resp=>resp.json()).subscribe(data=>{
      this.clubs = data;
    });
  }

    detail(data){
   this.navCtrl.push(ModalPage,{
    data:data
   });
  }

}
