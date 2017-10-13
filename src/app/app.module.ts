import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ClubPage} from '../pages/club/club';
import {ClubmgmtPage} from '../pages/clubmgmt/clubmgmt';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';

import {ClubPageModule} from '../pages/club/club.module';
import {ClubmgmtPageModule} from '../pages/clubmgmt/clubmgmt.module';
import {SigninPageModule} from '../pages/signin/signin.module';
import {SignupPageModule} from '../pages/signup/signup.module';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      mode: 'md'
    }),
    ClubmgmtPageModule,
    ClubPageModule,
    SigninPageModule,
    SignupPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ClubmgmtPage,
    ClubPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
