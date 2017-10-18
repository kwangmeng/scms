import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HostProvider {
  host:any="192.168.0.2";
  constructor(public http: Http) {

  }

  getHost(){
    return this.host;
  }

  setLogin(){
    localStorage.setItem("login","login");
  }

  removeLogin(){
     localStorage.setItem("login","guest");
  }

  checkLogin(){
    var login = localStorage.getItem("login");
    if(login == "login"){
      return true;
    }else{
      return false;
    }
  }

}
