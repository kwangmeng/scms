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
import {ActivityPage} from '../pages/activity/activity';
import {StudentsPage} from '../pages/students/students';
import {ClubmodalPage} from '../pages/clubmodal/clubmodal';
import {StudentmodalPage} from '../pages/studentmodal/studentmodal';
import {ModalPage} from '../pages/modal/modal';
import {AdduserPage} from '../pages/adduser/adduser';
import {ProfilePage} from '../pages/profile/profile';
import {UserPage} from '../pages/user/user';
import {ChatPage} from '../pages/chat/chat';
import {ChatmodalPage} from '../pages/chatmodal/chatmodal';

import {ClubPageModule} from '../pages/club/club.module';
import {ClubmgmtPageModule} from '../pages/clubmgmt/clubmgmt.module';
import {SigninPageModule} from '../pages/signin/signin.module';
import {SignupPageModule} from '../pages/signup/signup.module';
import {StudentsPageModule} from '../pages/students/students.module';
import {ActivityPageModule} from '../pages/activity/activity.module';
import {ClubmodalPageModule} from '../pages/clubmodal/clubmodal.module';
import {StudentmodalPageModule} from '../pages/studentmodal/studentmodal.module';
import {ModalPageModule} from '../pages/modal/modal.module';
import {AdduserPageModule} from '../pages/adduser/adduser.module';
import {ProfilePageModule} from '../pages/profile/profile.module';
import {UserPageModule} from '../pages/user/user.module';
import {ChatPageModule} from '../pages/chat/chat.module';
import {ChatmodalPageModule} from '../pages/chatmodal/chatmodal.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule} from '@angular/http';
import { HostProvider } from '../providers/host/host';

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
    SignupPageModule,
    StudentsPageModule,
    ActivityPageModule,
    ClubmodalPageModule,
    StudentmodalPageModule,
    ModalPageModule,
    HttpModule,
    AdduserPageModule,
    ProfilePageModule,
    UserPageModule,
    ChatmodalPageModule,
    ChatPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ClubmgmtPage,
    ClubPage,
    SigninPage,
    SignupPage,
    StudentsPage,
    ActivityPage,
    ClubmodalPage,
    StudentmodalPage,
    ModalPage,
    AdduserPage,
    ProfilePage,
    UserPage,
    ChatPage,
    ChatmodalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HostProvider
  ]
})
export class AppModule {}
