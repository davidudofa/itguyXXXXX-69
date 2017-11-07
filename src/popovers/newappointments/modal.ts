import { Component, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, ToastController, Loading, LoadingController } from 'ionic-angular';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ItGuyService } from '../../providers/itguy-service/itguyservice';
import { AppointServiceProvider } from '../../providers/appointment-service/appointmentservice';

@Component({
  selector: 'modal-appoint',
  templateUrl: 'modal.html',
  //styleUrl: 'modal.scss'
})

export class ModalAppointPage {
  appointdata: any = [];
  newappoint: any = [];
  loading: Loading;
  @ViewChild('newappointSlider') newappointSlider: any;
  noitguy=false;
  itguys: any = [];
  itguy: any;
  itguydetails: any = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private userService: UserprofileService,
    private itguyservice: ItGuyService,
    private appointservice: AppointServiceProvider
  ) {

  }

  ionViewWillLeave() {

    }



  showError(text) {
    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    alert.present();
  }

  setitguy(itguy){
    this.itguydetails = itguy;
    this.noitguy = false;

  }

  ionViewWillEnter() {
    this.itguydetails = this.params.get('itguy');
    var realdate = this.getdate();
    var curtime = this.gettime();
    if (this.itguydetails.id === 0){
      this.showError("Select an IT-Guy");
      this.noitguy = true;
      this.itguyservice.itguy(this.userService.getItGuy()).subscribe(response => {
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
    this.newappoint = {
      book_date: realdate,
      time: curtime,
      client_name: this.userService.getProfileName(),
      client_mail: this.userService.getUserMail(),
      client_phone: this.userService.getUserPhone(),
      to_see: this.itguydetails.id,
      category: this.itguydetails.specialization,
      createdby: this.userService.getUserName()
    }
    this.newappointSlider.lockSwipes(true);
  }

  whennext(){
    this.showLoading();
    this.newappointSlider.lockSwipes(false)
    this.newappointSlider.slideNext();
    this.newappointSlider.lockSwipes(true);
    this.hideLoading();
  }

  prev(){
    this.showLoading()
    this.newappointSlider.lockSwipes(false)
    this.newappointSlider.slidePrev();
    this.newappointSlider.lockSwipes(true);
    this.hideLoading()
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

  getdate(){
    var curdate = new Date();
    var realdate = curdate.getFullYear()+"-"+("0"+(curdate.getMonth()+1)).slice(-2)+"-"+("0"+curdate.getDate()).slice(-2);
    return realdate;
  }

  gettime(){
    var curdate = new Date();
    var realtime = ("0"+(curdate.getHours()+1)).slice(-2)+":"+("0"+curdate.getMinutes()).slice(-2)+":"+("0"+curdate.getSeconds()).slice(-2);
    return realtime;
  }

  bookrequest(newappoint) {
    this.newappoint.to_see = this.itguydetails.id;
    this.newappoint.category = this.itguydetails.specialization;
    this.appointservice.newAppointment(this.newappoint).subscribe(response => {
      if (response.status==='Success'){
        this.showError("Appointment booked successfully");
        this.dismiss();
      }
    },
  error =>{
    this.showError(error+ "Sorry we couldn't connect to the server. Please try again");
  });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
