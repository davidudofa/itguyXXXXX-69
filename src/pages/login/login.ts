import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, Loading} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserprofileService } from '../../providers/appservice/appservice';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  itguy: any;
  userName: any;
  userMail: any;
  loading: Loading;
  registerCredentials = {email: '', password: ''};
  showPassword = false;


  constructor(private nav: NavController, private auth: AuthServiceProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private userservice: UserprofileService) {
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed && allowed.status != 'Failed') {
        this.userservice.setItGuy(allowed.itguy);
        this.userservice.setProfileName(allowed.name);
        this.userservice.setUserName(allowed.username);
        this.userservice.setUserMail(allowed.email);
        this.userservice.setUserPhone(allowed.phone);
        localStorage.setItem('itGuy', allowed.itguy);
        localStorage.setItem('profileName', allowed.name);
        localStorage.setItem('userName', allowed.username);
        localStorage.setItem('userMail', allowed.email);
        localStorage.setItem('userPhone', allowed.phone);
        this.nav.push('TabsPage');
      } else {
        this.showError("Invalid Login details. please try again");
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
    this.loading.dismiss();

    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    alert.present();
  }

  doReveal(evt){
    if (evt === 'hide'){
      this.showPassword = false;
    }else{
      this.showPassword = true;
    }
  }

  ionViewDidLoad() {
    this.itguy = this.userservice.getItGuy();
    this.userName = this.userservice.getUserName();
    this.userMail = this.userservice.getUserMail();
    localStorage.getItem('itGuy');
    localStorage.getItem('userName');
    localStorage.getItem('userMail');
    if (this.itguy != null && localStorage.getItem('itGuy') != null){
      this.nav.push('TabsPage');
    }
  }

}
