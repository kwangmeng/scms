import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ClubPage} from '../pages/club/club';
import {ClubmgmtPage} from '../pages/clubmgmt/clubmgmt';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';
import {ActivityPage} from '../pages/activity/activity';
import {StudentsPage} from '../pages/students/students';
import {ProfilePage} from '../pages/profile/profile';
import {AdduserPage} from '../pages/adduser/adduser';
import {ChatPage} from '../pages/chat/chat';
import {HostProvider} from '../providers/host/host';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage:any;
  pages: Array<{title: string, component: any, icon: any}>;
  resp:any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public host:HostProvider, public events:Events) {
    this.initializeApp();
    this.resp = this.host.checkLogin();
    this.getPages(this.resp);
      this.events.subscribe('checkLogin',() => {
        console.log("invoked");
      this.resp = this.host.checkLogin();
      console.log(this.resp);
      this.getPages(this.resp);
      this.unsubscribe();
});
  
  
    

   
  }

  getPages(flag){
     if(flag){
      this.rootPage = HomePage;
      this.pages = [
      { title: 'Dashboard', component: HomePage,icon: "home" },
      { title: 'Club Applications', component: ClubPage,icon: "checkbox-outline" },
      {title: 'Clubs Management', component: ClubmgmtPage,icon: "build" },
      {title: 'Activities', component: ActivityPage,icon: "calendar" },
      {title: 'Students List', component: StudentsPage,icon: "people" },
      {title: 'Users', component: AdduserPage,icon: "person" },
      {title: 'Chats', component: ChatPage,icon: "chatbubbles" },
      {title: 'Log Out', component: SigninPage,icon: "log-out" },
    ];
    }else{
      this.rootPage = SigninPage;
      this.pages = [
      { title: 'Dashboard', component: HomePage,icon: "home" },
      { title: 'Club Applications', component: ClubPage,icon: "checkbox-outline" },
      {title: 'Clubs Management', component: ClubmgmtPage,icon: "build" },
      {title: 'Activities', component: ActivityPage,icon: "calendar" },
      {title: 'Students List', component: StudentsPage,icon: "people" },
      {title: 'Users', component: AdduserPage,icon: "person" },
      {title: 'Chats', component: ChatPage,icon: "chatbubbles" },
    ];
  }

   this.activePage = this.pages[0];
  }

  unsubscribe(){
    this.events.unsubscribe('checkLogin');
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == "Log Out"){
        this.host.removeLogin();
        this.nav.setRoot(SigninPage);
    }else{
        this.nav.setRoot(page.component);
        this.activePage = page;
    }
      
  
  
  }
  checkActive(page){
    return page == this.activePage;
  }
}
