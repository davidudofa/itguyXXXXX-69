import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { ProfileService } from '../../providers/profile-service/profileservice';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ModalProfilePage } from '../../popovers/profile/modal';
import { EditReviewContentPage } from '../../popovers/dashboard/editreview';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  title: string;
  itguy: any;
  profile: any = [];
  customer = false;
  tags: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public profileservice: ProfileService, public userservice: UserprofileService,
  public modalCtrl: ModalController,
  public popoverCtrl: PopoverController) {
  }

  ionViewWillLoad() {
    this.title = "Profile Page";
    this.itguy = this.userservice.getItGuy();
    this.profileservice.profile(this.itguy).subscribe(response=> {
      this.profile = response;
      if (this.profile.rating===null){
        this.profile.rating = '0';
      }else{
        this.profile.rating = Math.round(this.profile.rating * 10)/10;
      }
      if (response.itguy === '0'){
        this.customer = true;
        this.profile.type = "Customer";
      }else{
        this.customer = false;
        this.profile.type = "IT Guy";
        //get tags
        //get tips and tricks
        // get ratings
        // get requests
      }
    }, error=>{
      console.log(error);
    })

    this.profileservice.getSkills(this.itguy).subscribe(response=>{
      for (var tag in response){
        this.tags[tag] = response[tag].skillname;
      }
      console.log(this.tags);
    })
  }

  openmore(myEvent, profile){
    console.log(profile);
    let popover = this.popoverCtrl.create(EditReviewContentPage, {'profile': profile});
    popover.present({
      ev: myEvent
    });
  }

  editprofile(profile){
    let newmodal = this.modalCtrl.create(ModalProfilePage, {'profile': profile});
    newmodal.present();
  }

}
