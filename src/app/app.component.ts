import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage:any;
  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage,icon: "home" },
      { title: 'Club Applications', component: ClubPage,icon: "checkbox-outline" },
      {title: 'Clubs Management', component: ClubmgmtPage,icon: "build" },
      {title: 'Activities', component: ActivityPage,icon: "calendar" },
      {title: 'Students List', component: StudentsPage,icon: "people" },
      {title: 'Add User', component: AdduserPage,icon: "add" },
      {title: 'Profile', component: ProfilePage,icon: "person" },
      {title: 'Sign In', component: SigninPage,icon: "log-in" },
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  checkActive(page){
    return page == this.activePage;
  }
}
