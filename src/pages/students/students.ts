import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers,RequestOptions} from '@angular/http'; 
import 'rxjs/add/operator/map';
import {StudentmodalPage} from '../studentmodal/studentmodal';



@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage {
  students:any;
  host:any="192.168.0.2";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  }

  ionViewDidLoad() {
    this.loadStudents();
  }


onInput(event){
  
}


loadStudents(){
  this.http.get("http://"+this.host+"/cms-scms-server/loadstudents.php").map(resp => resp.json())
  .subscribe(data=>{
    this.students = data;
  });
}

detail(data){
  this.navCtrl.push(StudentmodalPage,{
    data:data
  });
}


}
