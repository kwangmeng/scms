import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Chart} from 'chart.js';
import {ClubPage} from '../club/club';
import {ClubmgmtPage} from '../clubmgmt/clubmgmt';
import {ActivityPage} from '../activity/activity';
import {StudentsPage} from '../students/students';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  constructor(public navCtrl: NavController) {

  }


  ionViewDidLoad(){
    this.doughnutChart = this.getDoughnutChart();
  }

  getDoughnutChart() {
    let data = {
      labels: ["Clubs", "Applications", "Total Students", "Total Activities"],
      datasets: [{
        label: 'Overall Stats',
        data: [6, 6, 200, 50],
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

}
