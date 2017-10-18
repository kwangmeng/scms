import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events  } from 'ionic-angular';
import {ModalPage} from '../modal/modal';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import {HostProvider} from '../../providers/host/host';
@IonicPage()
@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
})
export class ClubPage {

  clubs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public http:Http, public events:Events, public host:HostProvider) {
    
    this.events.subscribe('reloadClub',() => {
       this.events.publish('reloadHome');
      this.loadClubs();
      this.unsubscribe();
});
    this.host = this.host.getHost();
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
