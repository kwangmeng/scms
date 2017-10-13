import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Chart} from 'chart.js';


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

}
