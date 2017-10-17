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


onInput(ev:any){
      // Reset items back to all of the items

    var resp = [];
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.students.filter((item) => {
        console.log(item);
        var lol = (item.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
        console.log(lol);
        if(lol == true){
          resp.push(item);
        }
      });
    }else{
      this.loadStudents();
    }
    this.students = resp;
}


loadStudents(){
  this.http.get("http://"+this.host+"/cms-scms-server/loadstudents.php").map(resp => resp.json())
  .subscribe(data=>{
    this.students = data;
    console.log(data);
  });
}

detail(data){
  this.navCtrl.push(StudentmodalPage,{
    data:data
  });
}

 

}
