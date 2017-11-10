import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, IonicPage, LoadingController, Loading, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ModalProfilePage } from '../../popovers/profile/modal';
import { ProfileService } from '../../providers/profile-service/profileservice';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  @ViewChild('signupSlider') signupSlider: any;
  createSuccess = false;
  registerCredentials = {regname: '', regmail: '', regphone: '', regas:'', regusername: '', regpass: ''};
  showPassword = false;
  profile: any = [];
  itguy: any;
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: ToastController, private loadingCtrl: LoadingController, private userservice: UserprofileService,
  private modalCtrl: ModalController,
  private profileservice: ProfileService) {}

  ionViewDidLoad() {
    this.signupSlider.lockSwipes(true);
    this.registerCredentials.regpass = '';
  }

  next(uname){
    this.showLoading()
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(uname)){
      this.auth.checkuser(uname).subscribe(response => {
        if (response.status == 'Failed'){
          this.hideLoading()
          this.showPopup("Oops!", "Someone has already registered using "+uname);
        }else{
          this.hideLoading()
          this.signupSlider.lockSwipes(false)
          this.signupSlider.slideNext();
          this.signupSlider.lockSwipes(true);
        }
      });
    }else{
      this.hideLoading()
      this.showPopup("Oops!", "Please check your email address.");
    }
  }

  prev(){
    this.showLoading()
    this.signupSlider.lockSwipes(false)
    this.signupSlider.slidePrev();
    this.signupSlider.lockSwipes(true);
    this.hideLoading()
  }

  createAccount(){
    this.nav.push('LoginPage');
  }

   checkUserName(uname, pass){
      var responseStatus;
      this.showLoading();
      this.auth.checkuser(uname).subscribe(response => {
         responseStatus = response.status;
         if (responseStatus == 'Failed'){
           this.showPopup("Sorry!", uname+" has already been taken, choose another name");
           this.hideLoading();
         }else{
           this.hideLoading();
           this.checkpassword(pass);
         }
      });
  }

   checkpassword(pass){
    var re = /[0-9]/;
    var re2 = /[a-z]/;
    var re3 = /[A-Z]/;
    if(pass < 6) {
          this.showPopup("Sorry!", "Password must contain at least six characters!");
        return false;
      }else if(!re.test(pass)) {
        this.showPopup("Sorry!", "password must contain at least one number (0-9)!");
        return false;
      }else if(!re2.test(pass)) {
      this.showPopup("Sorry!", "password must contain at least one lowercase letter (a-z)!");
        return false;
      }else if(!re3.test(pass)) {
        this.showPopup("Sorry!", "password must contain at least one uppercase letter (A-Z)!");
        return false;
      }else{
        this.doRegister();
      }
  }

  public register() {
    this.checkUserName(this.registerCredentials.regusername, this.registerCredentials.regpass);
  }

  doReveal(evt){
    if (evt === 'hide'){
      this.showPassword = false;
    }else{
      this.showPassword = true;
    }
  }

  editprofile(itguy){
    //this.itguy = this.userservice.getItGuy();
    this.profileservice.profile(itguy).subscribe(response=> {
      this.profile = response;
      if (response.rating===null){
        response.rating = '0';
      }else{
        response.rating = Math.round(response.rating * 10)/10;
      }
      if (response.itguy === '0'){
        response.type = "Customer";
      }else{
        response.type = "IT Guy";
      }

      let newmodal = this.modalCtrl.create(ModalProfilePage, {'profile': response});
      newmodal.onDidDismiss(()=> {
        this.nav.push('TabsPage');
      })
      newmodal.present();
    }, error=>{
      this.showPopup("Error!", "There was a problem connecting to the server. please try again");
    });
  }

   doRegister() {
    this.showLoading()
    this.auth.register(this.registerCredentials).subscribe(allowed => {
      if (allowed && allowed.status != 'Failed') {
        //this.nav.push('TabsPage');
        this.hideLoading();
        //this.showPopup("Success!", "reg successfull. set session variables and go to setup page");
        this.userservice.setItGuy(allowed.data.itguy);
        this.userservice.setProfileName(allowed.data.regname);
        this.userservice.setUserName(allowed.data.regusername);
        this.userservice.setUserMail(allowed.data.regmail);
        this.userservice.setUserPhone(allowed.data.regphone);
        localStorage.setItem('itGuy', allowed.data.itguy);
        localStorage.setItem('userName', allowed.data.regusername);
        localStorage.setItem('userMail', allowed.data.regmail);
        localStorage.setItem('userPhone', allowed.data.regphone);
        if (this.registerCredentials.regas === 'customer'){
          this.nav.push('TabsPage');
        }else{
          this.editprofile(allowed.data.itguy);
        }
      } else {
        this.hideLoading();
        this.showPopup("Error!", "We are sorry we cannot register you at this time. Please try again");
      }
    },
      error => {
        this.hideLoading();
        this.showPopup("Sorry!", "Could not connect to server");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  showPopup(title, text) {
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: 'middle',
      duration: 3000
    });
    alert.present();
  }


}
