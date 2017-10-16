import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Chart} from 'chart.js';
import {Http, Headers,RequestOptions} from '@angular/http'; 


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
 
 
  doughnutChart: any;
  options:any="mgmt";
  data:any;
  host:any="192.168.0.2";
  fileList:any;
  complete:any={"type":"application"};
  advisors:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl:AlertController) {
    this.data = this.navParams.get("data");
    console.log(this.data);
  }

  ionViewDidLoad() {
  this.getDetails();
  this.getAdvisors();

  }




  fileChange(event) {
    this.fileList = event.target.files;
    console.log(this.fileList);
}

upload(){

   if(this.fileList.length > 0) {
        let file: File = this.fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('club_id',this.data.id);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

         this.http.post("http://"+this.host+"/cms-scms-server/image.php", formData, options)
              .subscribe(
                data => {
                  this.data.image = data.text().trim();
                });
    }
}
  getDetails(){
    this.http.post("http://"+this.host+"/cms-scms-server/clubdetails.php",{id:this.data.id}).map(resp=>resp.json())
    .subscribe(data=>{
      this.complete = data;
      console.log(data);
    });
  }

  getAdvisors(){
     this.http.get("http://"+this.host+"/cms-scms-server/getAdvisors.php").map(resp => resp.json())
    .subscribe(data => {
      this.advisors = data;
        console.log(data);
    });
  }

  updateClub(data){
    console.log(data);
  }

   reject() {
    let prompt = this.alertCtrl.create({
      title: 'Reject Comment',
      message: "Enter a comment on why you reject the club application",
      inputs: [
        {
          name: 'title',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }



}
