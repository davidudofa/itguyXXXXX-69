import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, ModalController, ActionSheetController } from 'ionic-angular';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ProfileService } from '../../providers/profile-service/profileservice';


@Component({
  selector: 'modal-itguy',
  templateUrl: 'modal.html',
  //styleUrl: 'modal.scss'
})

export class ModalProfilePage {
  profile: any =[];
  categories: any=[];
  tags: any = [];
  itguyprofile = false;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private userService: UserprofileService,
    private profileservice: ProfileService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewWillLeave() {

    }



    ionViewWillLoad(){
      this.profile = this.params.get('profile');
      var itguy = this.profile.id;
        if (this.profile.type === 'IT Guy'){
          this.itguyprofile = true;
        }

        this.profileservice.getCategories().subscribe(response =>{
          this.categories = response;
        }, error =>{
          this.showError("There was a problem connecting to the server. pleasetry again");
        })

        this.profileservice.getSkills(itguy).subscribe(response=>{
          for (var tag in response){
            this.tags[tag] = response[tag].skillname;
          }
        })

    }

    public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            console.log('load from library');
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            console.log('Use camera');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  showError(text) {
    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    alert.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
