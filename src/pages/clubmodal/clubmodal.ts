import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-clubmodal',
  templateUrl: 'clubmodal.html',
})
export class ClubmodalPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  options:any="stats";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  this.doughnutChart = this.getDoughnutChart();
  }

    loadStats(){
      console.log("reached here");
      setTimeout(() => {
       this.doughnutChart = this.getDoughnutChart();
    }, 500);
     
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

}
