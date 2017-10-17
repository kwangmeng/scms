import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import {Http, Headers,RequestOptions} from '@angular/http'; 
import 'rxjs/add/operator/map';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl:AlertController, public events:Events) {
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
          text: 'Submit',
          handler: data => {
            this.rejectProcess(data.title);
          }
        }
      ]
    });
    prompt.present();
  }


  rejectProcess(data){
    this.http.post("http://"+this.host+"/cms-scms-server/reject.php",{id:this.complete.clubid,comment:data})
      .subscribe(data=>{
        var resp = data.text().trim();
        if(resp == "good"){
          this.showAlert("Club Application Rejected","The reject is successful");
        }else{
          this.showAlert("Server error","Please refer to kenny for this matter");
        }
      });
  }

     showAlert(title,subtitle) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: subtitle,
      buttons: [
        {
          text: 'OK',
           handler: () => {
      // user has clicked the alert button
      // begin the alert's dismiss transition
      const navTransition = prompt.dismiss();

  
        navTransition.then(() => {
          this.events.publish('reloadClub');
          this.navCtrl.pop();
        });

      return false;
    }
        }
      ]
    });
    prompt.present();
  }

    approveClub(){
      
      let prompt = this.alertCtrl.create({
      title: 'Approve Club?',
      message: "Press confirm to approve the club.",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            
           this.submitApprove();

          }
        }
      ]
    });
    prompt.present();


  }


  submitApprove(){
    this.http.post("http://"+this.host+"/cms-scms-server/approve.php",{id:this.complete.clubid})
    .subscribe(data=>{

      var resp = data.text().trim();
      if(resp == "good"){
         this.showAlert("Club Application Approved","The approval is successful");
      }else{
         this.showAlert("Error !","Please refer to kenny ");
      }

    });
  }

}
