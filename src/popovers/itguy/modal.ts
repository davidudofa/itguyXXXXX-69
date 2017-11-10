import { Component } from '@angular/core';
import { Platform, NavParams, NavController, ViewController, ToastController, ModalController } from 'ionic-angular';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ItGuyService } from '../../providers/itguy-service/itguyservice';
import { ProfileService } from '../../providers/profile-service/profileservice';
import { ModalReviewPage } from '../../popovers/reviews/modal';
import { ModalContentPage } from '../../popovers/chats/modal';
import { ModalAppointPage } from '../../popovers/newappointments/modal';


@Component({
  selector: 'modal-itguy',
  templateUrl: 'modal.html',
  //styleUrl: 'modal.scss'
})

export class ModalItguyPage {
  itguy: any =[];
  reviews: any = [];
  selfreview = {id:'', rev_name:'', rev_mail:'', rating:'', message:'', recommend:'', itguy:'', active:''};
  otherreview: any =[];
  openreview = false;
  viewall = false;
  tags: any=[];
  newchat: any=[];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public nav: NavController,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private userService: UserprofileService,
    private itguyservice: ItGuyService,
    private modalCtrl: ModalController,
    private profileservice: ProfileService
  ) {

  }

  ionViewWillLeave() {

    }

    ratereview(){
      this.selfreview.rev_name = this.userService.getProfileName();
      this.selfreview.rev_mail = this.userService.getUserMail();
      this.selfreview.itguy = this.itguy.id;
      this.selfreview.recommend = '1';
      this.selfreview.active = '1';
      this.itguyservice.newReview(this.selfreview).subscribe(response => {
        this.ionViewWillLoad();
      }, error =>{
        this.showError("Sorry we couldn't connect to the server. Please try again");
      })

    }

    deletereview(){
      this.openreview = false;
      this.selfreview.active = '0';
      this.itguyservice.newReview(this.selfreview).subscribe(response => {
        this.selfreview.rating = '0';
        this.selfreview.message = '';
        this.ionViewWillLoad();
      }, error =>{
        this.showError("Sorry we couldn't connect to the server. Please try again");
      })
    }


    ionViewWillLoad(){
      this.itguy = this.params.get('itguy');
      if (this.itguy.rating===null){
        this.itguy.rating = '0';
      }else{
        this.itguy.rating = Math.round(this.itguy.rating * 10)/10;
      }

      this.itguyservice.reviews(this.itguy.id).subscribe(response => {
        if (response && response.status != 'Failed') {
          var usermail = this.userService.getUserMail();
          this.reviews = response.filter(function(element){ return element.rev_mail != usermail });

          for (var newrev in response) {
            if(response[newrev].rev_mail === usermail){
              this.selfreview = response[newrev];
              this.openreview = true;
            }
          }
          if (response.length >= 2){
            this.viewall = true;
          }
        }
      },
        error => {
          this.showError("Sorry we couldn't connect to the server. Please try again");
        });

        this.profileservice.getSkills(this.itguy.id).subscribe(resp=>{
          if (resp != null){
            var alltags = resp.skillname;
            this.tags = alltags.split(",");
          }
        })
    }

    openreviews(reviews, rating){
      let modal = this.modalCtrl.create(ModalReviewPage, {'reviews': reviews, 'rating':rating});
      modal.onDidDismiss(()=> {
        this.ionViewWillLoad();
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


  newAppointment(){
    let newmodal = this.modalCtrl.create(ModalAppointPage, {'itguy': this.itguy});
    newmodal.present();
  }

  openChat() {
    this.newchat.name = this.itguy.name;
    this.newchat.email = this.itguy.email;
    let modal = this.modalCtrl.create(ModalContentPage, {'chatData': this.newchat});
    modal.onDidDismiss(()=> {
      this.ionViewWillLoad();
    })
    modal.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
