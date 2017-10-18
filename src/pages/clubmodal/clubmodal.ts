import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events, AlertController} from 'ionic-angular';
import {Chart} from 'chart.js';
import {Http, Headers,RequestOptions} from '@angular/http'; 
import 'rxjs/add/operator/map';
import {HostProvider} from '../../providers/host/host';

@IonicPage()
@Component({
  selector: 'page-clubmodal',
  templateUrl: 'clubmodal.html',
})
export class ClubmodalPage {
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  options:any="stats";
  data:any;
 
  fileList:any;
  complete:any={"type":"application"};
  advisors:any;
  member:any;
  members:any;
  memberlist:any;
  size:any=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public events:Events, public alertCtrl:AlertController, public host:HostProvider) {
    this.events.publish('reloadClub');
    this.data = this.navParams.get("data");
    console.log(this.data);
    this.host = this.host.getHost();
  }

  ionViewDidLoad() {
  this.getDetails();
  this.getAdvisors();

  this.doughnutChart = this.getDoughnutChart();
  }

    loadStats(){
      
      setTimeout(() => {
       this.doughnutChart = this.getDoughnutChart();
    }, 500);
     
    }


  getDoughnutChart() {
    let data = {
      labels: ["Total Students", "Total Activities"],
      datasets: [{
        label: 'Overall Stats',
        data: [this.data.amt, this.data.actamt],
        backgroundColor: [
          '#7b003d',
          '#551a8b',
        ],
        hoverBackgroundColor: ["#FF6384", "#551a8b"]
      }]
    };
 
    return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
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

         this.http.post("https://"+this.host+"/cms-scms-server/image.php", formData, options)
              .subscribe(
                data => {
                  this.data.image = data.text().trim();
                });
    }
}
  getDetails(){
    this.http.post("https://"+this.host+"/cms-scms-server/clubdetails.php",{id:this.data.id}).map(resp=>resp.json())
    .subscribe(data=>{
      this.complete = data;
      console.log(data);
        this.loadMembers();
    });
  }

  getAdvisors(){
     this.http.get("https://"+this.host+"/cms-scms-server/getAdvisors.php").map(resp => resp.json())
    .subscribe(data => {
      this.advisors = data;
        console.log(data);
    });
  }

  updateClub(data){
      this.http.post("https://"+this.host+"/cms-scms-server/updateclub.php",{
        id:data.clubid,
        agm:data.agm_date,
        advisor:data.advisor,
        applicant:data.applicant_name,
        budget:data.budget,
        constitution:data.constitution,
        description:data.description,
        fee:data.fee,
        mobile:data.mobile_num,
        name:data.name,
        objectives:data.objectives
      }).subscribe(data=>{
         console.log(data);
         var resp = data.text().trim();
      if(resp == "good"){
         this.showAlert("Club details updated","Club details updated successfully");
      }else{
         this.showAlert("Error !","Please refer to kenny ");
      }
 
    });
  }

  loadMembers(){
    this.http.post("https://"+this.host+"/cms-scms-server/loadmembers.php",{id:this.complete.clubid}).
    map(resp=>resp.json()).subscribe(data=>{
      this.members = data;
      console.log(data);
      this.size = this.members.length;
      console.log(this.size);
    });
  }

  addMember(data){
    console.log(data);
       this.http.post("https://"+this.host+"/cms-scms-server/addmembers.php",{id:this.complete.clubid,members:data}).subscribe(data=>{
         console.log(data);
         var resp = data.text().trim();
      if(resp == "good"){
         this.showAlert("Members Added","Members added successfully");
      }else{
         this.showAlert("Error !","Please refer to kenny ");
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
          this.loadMembers();
          this.getDetails();
          this.getAdvisors();
        });

      return false;
    }
        }
      ]
    });
    prompt.present();
  }

  delete(event){
    var str = "";
    for(var i=0;i<this.memberlist.length;i++){
      
      if(i == this.memberlist.length - 1){
         str += this.memberlist[i];
      }else{
        str += this.memberlist[i]+",";
      }
    }

     this.http.post("https://"+this.host+"/cms-scms-server/removemembers.php",{members:str}).subscribe(data=>{
         console.log(data);
         var resp = data.text().trim();
      if(resp == "good"){
         this.showAlert("Members Removed","Members removed successfully");
      }else{
         this.showAlert("Error !","Please refer to kenny ");
      }

    
  });
  }

     doRefresh(refresher) {
 

      this.getDetails();
      refresher.complete();
  
  }

  archive(){
     this.http.post("https://"+this.host+"/cms-scms-server/delete.php",{id:this.complete.clubid})
      .subscribe(data=>{
        console.log(data);
        var resp = data.text().trim();
        if(resp == "good"){
          this.showAlert("Club archived","The club is archived now.");
        }else{
          this.showAlert("Server error","Please refer to kenny for this matter");
        }
      });
  }

}
