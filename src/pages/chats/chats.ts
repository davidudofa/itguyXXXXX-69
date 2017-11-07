import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, ModalController, LoadingController, Loading } from 'ionic-angular';
import { ChatServiceProvider } from '../../providers/chat-service/chatservice';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ModalContentPage } from '../../popovers/chats/modal';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  itguy: any;
  usermail: any;
  username: any;
  profilename: any;
  loading: Loading;
  chats: any = [];

  constructor(public nav: NavController, public navParams: NavParams, private userservice: UserprofileService, private chatservice: ChatServiceProvider, public modalCtrl: ModalController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  openModal(chat) {
    let modal = this.modalCtrl.create(ModalContentPage, {'chatData': chat});
    modal.present();
  }

  ionViewWillLoad() {
    //this.showLoading();
    this.itguy = this.userservice.getItGuy();
    this.username = this.userservice.getUserName();
    this.profilename = this.userservice.getProfileName();
    this.usermail = this.userservice.getUserMail();
    if (this.itguy == null && localStorage.getItem('itGuy') == null){
      this.nav.push('LoginPage');
    }
    this.chatservice.chats(this.usermail).subscribe(response => {
      if (response && response.status != 'Failed') {
        this.chats = response;
        //this.hideLo
      } else {
        this.showError("No chats available.");
      }
    },
      error => {
        this.showError("Sorry we couldn't connect to the server. Please try again");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    //this.loading.dismiss();

    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    alert.present();
  }

}
