import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, NavController, ViewController, ToastController } from 'ionic-angular';
import { ChatServiceProvider, ChatMessage, UserInfo } from '../../providers/chat-service/chatservice';
import { UserprofileService } from '../../providers/appservice/appservice';
import { Events, Content, TextInput } from 'ionic-angular';

@Component({
  selector: 'modal-chat',
  templateUrl: 'modal.html',
  //styleUrl: 'modal.scss'
})

export class ModalContentPage {
  @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: any = [];
    chatdata: any = [];
    user: UserInfo;
    toUser: any = [];
    editorMsg = '';
    showEmojiPicker = false;
    checknewmsg: any;
    itguy: any;
    usermail: any;
    username: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    private userservice: UserprofileService,
    private chatservice: ChatServiceProvider,
    public viewCtrl: ViewController,
    public nav: NavController,
    public events: Events,
    private toastCtrl: ToastController
  ) {
    this.chatdata = this.params.get('chatData');
    this.toUser = {
      name: this.chatdata.name,
      mail: this.chatdata.email,
    }
    this.user = {
      id: this.userservice.getItGuy(),
      name: this.userservice.getProfileName(),
      mail: this.userservice.getUserMail()
    }

  }

  ionViewWillLeave() {
        // unsubscribe
        clearInterval(this.checknewmsg);
        this.events.unsubscribe('chat:received');
    }



  showError(text) {
    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    alert.present();
  }

  ionViewWillLoad() {
        //get message list
        this.getMsg();
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })


          this.checknewmsg = setInterval(() => { this.getMsg(); }, 3000);
    }


    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = true;//!this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.content.resize();
        this.scrollToBottom();
    }


    /**
         * @name getMsg
         * @returns {Promise<ChatMessage[]>}
         */
    getMsg() {
      //this.loading.dismiss();
      this.itguy = this.userservice.getItGuy();
      this.username = this.userservice.getUserName();
      this.usermail = this.userservice.getUserMail();
      localStorage.getItem('itGuy');
      localStorage.getItem('userName');
      localStorage.getItem('userMail');
      if (this.itguy == null && localStorage.getItem('itGuy') == null){
        this.nav.push('LoginPage');
      }
      this.chatservice.chat(this.itguy, this.usermail, this.toUser.mail).subscribe(response => {
        if (response!=null) {
          this.msgList = response;
          this.scrollToBottom();
        }
      },
        error => {
          this.showError(error);
        });
    }

    /**
    * @name sendMsg
    */
   sendMsg() {
       if (!this.editorMsg.trim()){
          return;
       }
       // Mock message
       //const id = Date.now().toString();
       let newMsg: ChatMessage = {
           id: Date.now().toString(),
           from_mail: this.user.mail,
           to_mail: this.toUser.mail,
           message: this.editorMsg,
           time: Date.now(),
           status: '0'
       };

       this.pushNewMsg(newMsg);
       this.editorMsg = '';

       if (!this.showEmojiPicker) {
           this.messageInput.setFocus();
       }

      // this.chatservice.sendMsg(newMsg)
       //.subscribe(() => {

       //})
   }
   /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        this.chatservice.mockNewMsg(msg).subscribe(response => {
          if (response) {
            //this.msgList = response;

              this.msgList.push(msg);
            this.scrollToBottom();
            let index = this.getMsgIndexById(msg.id);
            if (index !== -1) {
                this.msgList[index].status = '0';
            }
          } else {
            this.showError("No chats available.");
          }
        },
          error => {
            this.showError("Server error. Please try again");
          });

        //}
        //this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.id === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }


  dismiss() {
    this.viewCtrl.dismiss();
  }
}
