import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, ToastController } from 'ionic-angular';
import { DashPopoverContentPage } from '../../popovers/dashboard/popover';
import { ItGuyService } from '../../providers/itguy-service/itguyservice';
import { UserprofileService } from '../../providers/appservice/appservice';
import { UserInfo } from '../../providers/appointment-service/appointmentservice';
import { ModalContentPage } from '../../popovers/chats/modal';
import { ModalAppointPage } from '../../popovers/newappointments/modal';
import { ModalItguyPage } from '../../popovers/itguy/modal';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  itguys: any = [];
  newchat: any = [];
  itguy: any;
  user: UserInfo;
  username: any;
  usermail: any;
  article = {id: '', title: '', author: '', date: '', image: '', like: ''};
  searchQuery: string = '';

  constructor(public nav: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl: ModalController, private userservice: UserprofileService, private itguyservice: ItGuyService, private toastCtrl: ToastController) {
    this.user = {
      id: this.userservice.getItGuy(),
      name: this.userservice.getUserName(),
      mail: this.userservice.getUserMail()
    }
    if (this.user.id== null){
      this.nav.push('LoginPage');
    }
  }

  openModal(chat) {
    this.newchat.name = chat.name;
    this.newchat.email = chat.email;
    let modal = this.modalCtrl.create(ModalContentPage, {'chatData': this.newchat});
    modal.onDidDismiss(()=> {
      this.ionViewWillEnter();
    })
    modal.present();
  }

  ionViewWillEnter() {
    this.itguy = this.userservice.getItGuy();
    this.username = this.userservice.getUserName();
    this.usermail = this.userservice.getUserMail();
    localStorage.getItem('itGuy');
    localStorage.getItem('userName');
    localStorage.getItem('userMail');
    if (this.itguy == null && localStorage.getItem('itGuy') == null){
      this.nav.push('LoginPage');
    }
    this.itguyservice.itguy(this.itguy).subscribe(response => {
      if (response && response.status != 'Failed') {
        this.itguys = response;
      } else {
        this.showError("No It-Guys available.");
      }
    },
      error => {
        this.showError("Sorry we couldn't connect to the server. Please try again");
      });
  }

  showError(text) {
    //this.loading.dismiss();

    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    alert.present();
  }

  doLike(artId){
    this.article.like = '1';
  }
  dounLike(artId){
    this.article.like = '';
  }

  newAppointment(itguy){
    let newmodal = this.modalCtrl.create(ModalAppointPage, {'itguy': itguy});
    newmodal.present();
  }

  openitguy(itguy){
    let newmodal = this.modalCtrl.create(ModalItguyPage, {'itguy': itguy});
    newmodal.present();
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(DashPopoverContentPage);
    popover.present({
      ev: myEvent
    });
  }

}
