import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events  } from 'ionic-angular';
import {ClubmodalPage} from '../clubmodal/clubmodal';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import {HostProvider} from '../../providers/host/host';

@IonicPage()
@Component({
  selector: 'page-clubmgmt',
  templateUrl: 'clubmgmt.html',
})
export class ClubmgmtPage {

  advisors:any;

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
    this.getAdvisors();
  }

   unsubscribe(){
    this.events.unsubscribe('reloadClub');
  }
    ionViewDidLeave(){
    //this.events.unsubscribe('reloadClub');
  }

  detail(data){
   this.navCtrl.push(ClubmodalPage,{
    data:data
   });
  }

  loadClubs(){
    console.log("came here");
    this.http.get("http://"+this.host+"/cms-scms-server/loadClubs.php").map(resp=>resp.json()).subscribe(data=>{
      this.clubs = data;
    });
  }

 showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Create a new club',
      message: "Enter a name for this club",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Create',
          handler: data => {

            this.createClub(data.name);
          }
        }
      ]
    });
    prompt.present();
  }

   showAlert(title,subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
       buttons: [{
    text: 'Ok',
    handler: () => {
      // user has clicked the alert button
      // begin the alert's dismiss transition
      const navTransition = alert.dismiss();

  
        navTransition.then(() => {
          this.loadClubs();
        });

      return false;
    }
  }]
    });
    alert.present();
  }

  createClub(name){
    this.http.post("http://"+this.host+"/cms-scms-server/create_club.php",{name:name})
    .subscribe(data=>{
        var resp = data.text().trim();
        if(resp == "good"){
          this.showAlert("Club Created","You can further edit the club details");

        }else{
           this.showAlert("Database error","Please refer to Kenny");
        }
    });
  }

   showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('List of advisors');

    for(var i=0;i<this.advisors.length;i++){
      if(i==0){
    alert.addInput({
      type: 'checkbox',
      label: this.advisors[i].name,
      value: this.advisors[i].id,
      checked: true
    });
      }else{
      alert.addInput({
      type: 'checkbox',
      label: this.advisors[i].name,
      value: this.advisors[i].id,
      checked: false
    });
      }
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
      
        
      }
    });
    alert.present();
  }


  getAdvisors(){
    this.http.get("http://"+this.host+"/cms-scms-server/getAdvisors.php").map(resp => resp.json())
    .subscribe(data => {
      this.advisors = data;
    });
  }



}
