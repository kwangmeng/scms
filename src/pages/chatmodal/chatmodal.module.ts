import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatmodalPage } from './chatmodal';

@NgModule({
  declarations: [
    ChatmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatmodalPage),
  ],
})
export class ChatmodalPageModule {}
