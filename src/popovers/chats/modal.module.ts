import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContentPage } from './modal';
import { ChatServiceProvider } from "../../providers/chat-service/chatservice";
import { RelativeTime } from "../../pipes/relative-time";
import { EmojiPickerComponentModule } from "../../popovers/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../providers/emoji";

@NgModule({
  declarations: [
    ModalContentPage,
    RelativeTime
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(ModalContentPage),
  ],
  exports: [
    ModalContentPage
  ],
  providers:[
    ChatServiceProvider,
    EmojiProvider
  ]
})
export class ChatModule {}
