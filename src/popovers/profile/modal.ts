import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, ActionSheetController } from 'ionic-angular';
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
  alltags: any = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private profileservice: ProfileService,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ionViewWillLeave() {

    }



    ionViewWillLoad(){
      this.profile = this.params.get('profile');
      var itguy = this.profile.id;
        if (this.profile.type === 'IT Guy'){
          this.showError("Update profile photo, specialty and skills... Your skills indexes your profile for search");
          this.itguyprofile = true;

          this.profileservice.getCategories().subscribe(response =>{
            this.categories = response;
          }, error =>{
            this.showError("There was a problem connecting to the server. please try again");
          })

          this.profileservice.getSkills(itguy).subscribe(resp=>{
            if (resp != null){
              var alltags = resp.skillname;
              this.tags = alltags.split(",");
            }
          })
        }

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
      closeButtonText: 'Ok',
      duration: 3000
    });
    alert.present();
  }

  updateSpecialty(val){
    this.profileservice.updateCategory(val, this.profile.id).subscribe(response=>{
        this.showError("Specialty updated");
    }, error=>{
      this.showError("There was a problem connecting to the server. please try again");
    })
  }

  updateskills(tags){
    var skills = tags.join(",");
    this.profileservice.updateSkills(skills, this.profile.id).subscribe(response=>{
        this.showError("Skill updated");
    }, error=>{
      this.showError("There was a problem connecting to the server. please try again");
    });
  }

  updateinfo(profile){
    this.profileservice.updateProfile(this.profile).subscribe(response=>{
      this.showError("Profile updated");
    }, error=>{
      this.showError("There was a problem connecting to the server. please try again");
    })
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }

}
