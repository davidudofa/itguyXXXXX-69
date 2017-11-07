import { Component } from '@angular/core';
import { ViewController, NavParams, ModalController, NavController } from 'ionic-angular';
import { ModalProfilePage } from '../../popovers/profile/modal';
import { UserprofileService } from '../../providers/appservice/appservice';
@Component({
  templateUrl: 'editreview.html'
})

export class EditReviewContentPage {
  profile : any = [];
constructor(public viewCtrl: ViewController, public nav: NavController, public params: NavParams, public modalCtrl: ModalController, public userservice: UserprofileService) {}
close() {
    this.viewCtrl.dismiss();
  }

  ionViewWillLoad(){
    this.profile = this.params.get('profile');
  }


    editprofile(){
      let newmodal = this.modalCtrl.create(ModalProfilePage, {'profile': this.profile});
      newmodal.present();
    }

    logout(){
      this.userservice.setItGuy(null);
      this.userservice.setProfileName(null);
      this.userservice.setUserName(null);
      this.userservice.setUserMail(null);
      this.userservice.setUserImage(null);
      this.userservice.setUserPhone(null);
      this.nav.push('LoginPage');
    }


}
