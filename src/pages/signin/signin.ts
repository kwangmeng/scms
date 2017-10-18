import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { SignupPage} from '../signup/signup';
import {HomePage} from '../home/home';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import {HostProvider} from '../../providers/host/host';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  input:any={"email":"","password":""};
  loading:any;
  host1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public host:HostProvider, public loadingCtrl:LoadingController, public toastCtrl:ToastController, public events:Events) {
    this.host1 = this.host.getHost();
  }

  ionViewDidLoad() {
   
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  login(data){
    this.presentLoading();
    this.http.post("http://"+this.host1+"/cms-scms-server/login.php",{email:data.email,password:data.password}).subscribe(data=>{
        this.loading.dismiss();
        var resp = data.text().trim();
        console.log(resp);
        if(resp == "good"){
            this.presentToast("Authenticated, you are logged in.");
        }else{
           this.presentToast("Invalid email or password.");
        }
    });
  }

    presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Processing ..",
      
    });
    this.loading.present();
  }

  presentToast(title) {
  const toast = this.toastCtrl.create({
    message: title,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
      this.host.setLogin();
      this.events.publish("checkLogin");
      this.navCtrl.setRoot(HomePage);
  });

  toast.present();
}



}
