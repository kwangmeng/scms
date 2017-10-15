import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js';
import {Http, Headers,RequestOptions} from '@angular/http'; 


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
  host:any="192.168.0.2";
  fileList:any;
  complete:any;
  advisors:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.data = this.navParams.get("data");

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

}
