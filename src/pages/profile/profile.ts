import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, ToastController } from 'ionic-angular';
import { ProfileService } from '../../providers/profile-service/profileservice';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ModalProfilePage } from '../../popovers/profile/modal';
import { EditReviewContentPage } from '../../popovers/dashboard/editreview';
import { ModalReviewPage } from '../../popovers/reviews/modal';
import { ItGuyService } from '../../providers/itguy-service/itguyservice';

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
  reviews: any=[];
  viewall = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public profileservice: ProfileService, public userservice: UserprofileService,
  public modalCtrl: ModalController,
  public popoverCtrl: PopoverController,
  public toastCtrl: ToastController,
  public itguyservice: ItGuyService) {
  }

  ionViewDidEnter() {
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
        this.profileservice.getSkills(this.itguy).subscribe(resp=>{
          if (resp != null){
            var alltags = resp.skillname;
            this.tags = alltags.split(",");
          }
        });
        this.itguyservice.reviews(this.itguy).subscribe(response2 => {
          if (response2 && response2.status != 'Failed') {
            var usermail = this.userservice.getUserMail();
            this.reviews = response2.filter(function(element){ return element.rev_mail != usermail });
            if (response2.length >= 2){
              this.viewall = true;
            }
          }
        },
          error => {
            this.showError("Sorry we couldn't connect to the server. Please try again");
          });
        //get tags
        //get tips and tricks
        // get ratings
        // get requests
      }
    }, error=>{
      this.showError("There was a problem connecting to the server. please try again");
    })

  }

  openmore(myEvent, profile){
    let popover = this.popoverCtrl.create(EditReviewContentPage, {'profile':profile});
    popover.present({
      ev: myEvent
    });
  }

  openreviews(reviews, rating){
    let modal = this.modalCtrl.create(ModalReviewPage, {'reviews': reviews, 'rating':rating});
    modal.onDidDismiss(()=> {
      this.ionViewDidEnter();
    })
    modal.present();
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

  editprofile(profile){
    let newmodal = this.modalCtrl.create(ModalProfilePage, {'profile': profile});
    newmodal.present();
  }

}
