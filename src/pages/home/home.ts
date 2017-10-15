import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Chart} from 'chart.js';
import {ClubPage} from '../club/club';
import {ClubmgmtPage} from '../clubmgmt/clubmgmt';
import {ActivityPage} from '../activity/activity';
import {StudentsPage} from '../students/students';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  data:any={"clubamt":0,"studentamt":0,"activityamt":0,"applyamt":0};
  host:any="192.168.0.2";
  loader:any;
  constructor(public navCtrl: NavController,public http:Http, public loadingCtrl:LoadingController) {

  }


  ionViewDidLoad(){
    // this.presentLoading();
    this.loadData();
    this.doughnutChart = this.getDoughnutChart();
    
  }

  getDoughnutChart() {
    let data = {
      labels: ["Clubs", "Applications", "Total Students", "Total Activities"],
      datasets: [{
        label: 'Overall Stats',
        data: [this.data.clubamt, this.data.applyamt, this.data.studentamt, this.data.activityamt],
        backgroundColor: [
          '#7b003d',
          '#551a8b',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: ["#FF6384", "#551a8b", "#36A2EB", "#FFCE56"]
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


  goPage(page){
    if(page == 1){
      this.navCtrl.push(ClubmgmtPage);
    }else if(page == 2){
      this.navCtrl.push(ClubPage)
    }else if(page == 3){
      this.navCtrl.push(StudentsPage);
    }else if(page == 4){
      this.navCtrl.push(ActivityPage);
    }
  }


  loadData(){
    this.http.get("http://"+this.host+"/cms-scms-server/loadhome.php").map(resp => resp.json())
    .subscribe(data => {
      this.data = data;
     // this.loader.dismiss();
     console.log(data);
     this.doughnutChart = this.getDoughnutChart();
    });
  }

   presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Initialising Data .."
    });
    this.loader.present();
  }

}
