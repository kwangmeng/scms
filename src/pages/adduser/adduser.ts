import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import {UserPage} from '../user/user';
import {HostProvider} from '../../providers/host/host';

@IonicPage()
@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  
  users:any;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public http:Http, public events:Events, public host:HostProvider) {
     this.events.subscribe('reloadUsers',() => {
  
        this.loadUsers();
        this.unsubscribe();
    
});

this.host = this.host.getHost();

  }

  ionViewDidLoad() {
    this.loadUsers();
  }

  unsubscribe(){
    this.events.unsubscribe('reloadUsers');
  }

  add(){
     let prompt = this.alertCtrl.create({
      title: 'Create a new user',
      message: "Enter email and password for this user",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
      
        },{
           name: 'password',
          placeholder: 'Password',
   
        }
        ,{
           name: 'firstname',
          placeholder: 'First Name',
  
        },{
           name: 'lastname',
          placeholder: 'Last Name',

        },
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

            this.adduser(data);
          }
        }
      ]
    });
    prompt.present();
  }


  adduser(data){
     this.http.post("https://"+this.host+"/cms-scms-server/adduser.php",{email:data.email,password:data.password,firstname:data.firstname,lastname:data.lastname}).subscribe(data=>{
        var resp = data.text().trim();

        if(resp == "good"){
            this.showAlert("User Created","User created successfully");
        }else{
           this.showAlert("Error","Please refer to kenny");
        }

        


    });
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
          this.loadUsers();
        });

      return false;
    }
  }]
    });
    alert.present();
  }

  loadUsers(){
    this.http.get("https://"+this.host+"/cms-scms-server/loadusers.php").map(resp=>resp.json()).subscribe(data=>{
      this.users = data;
      console.log(data);
    });
  }

  detail(data){
    this.navCtrl.push(UserPage,{
      data:data
    });
  }

}
