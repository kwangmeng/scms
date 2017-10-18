import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import {HostProvider} from '../../providers/host/host';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {


  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public events:Events, public alertCtrl:AlertController, public host:HostProvider) {
     
     this.data = this.navParams.get("data");
     this.host = this.host.getHost();
  }

  ionViewDidLoad() {
 
  }

  updateUser(data){
       this.http.post("http://"+this.host+"/cms-scms-server/updateuser.php",{id:data.id,email:data.email,password:data.password,firstname:data.firstname,lastname:data.lastname,role:data.role}).subscribe(data=>{
        var resp = data.text().trim();

        if(resp == "good"){
            this.showAlert("User Updated","User updated successfully","update");
        }else{
           this.showAlert("Error","Please refer to kenny","update");
        }
    });
  }


  deleteUser(){
     let alert = this.alertCtrl.create({
      title: 'Delete User',
      subTitle: 'Are you sure to delete this user?',
       buttons: [{
    text: 'Cancel',
    handler: () => {

    }
  },{
    text: 'Yes',
    handler: () => {
      // user has clicked the alert button
      // begin the alert's dismiss transition
      const navTransition = alert.dismiss();

  
        navTransition.then(() => {
            this.deleteUser1();
        });

      return false;
    }
  }]
    });
    alert.present();
  
  }

  deleteUser1(){
    this.http.post("http://"+this.host+"/cms-scms-server/deleteuser.php",{id:this.data.id}).subscribe(data=>{
        var resp = data.text().trim();

        if(resp == "good"){
            this.showAlert("User deleted","User deleted successfully","delete");
        }else{
           this.showAlert("Error","Please refer to kenny","delete");
        }
    });
  }


  showAlert(title,subtitle,type) {
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
          this.events.publish('reloadUsers');
          if(type == "delete"){
            this.navCtrl.pop();
          }
        });

      return false;
    }
  }]
    });
    alert.present();
  }

}
