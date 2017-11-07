import { Component } from '@angular/core';
import { Platform, NavParams, NavController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AppointServiceProvider } from '../../providers/appointment-service/appointmentservice';
import { UserprofileService } from '../../providers/appservice/appservice';

@Component({
  selector: 'modal-chat',
  templateUrl: 'modal.html',
  //styleUrl: 'modal.scss'
})

export class ModalContentPage {
  appointdata: any = [];
  monthLabels: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  appoint_date: any;
  liveedit: any = false;
  editdisabled: any = true;
  hideapprove: any = false;
  statecolor: any;
  statename: any;


  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public nav: NavController,
    public events: Events,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private appointService: AppointServiceProvider,
    private userservice: UserprofileService
  ) {
      this.appointdata = this.params.get('appointmentData');
  }

  ionViewWillLeave() {

    }

    deleteConfirm(){
      const alert = this.alertCtrl.create({
        title: 'Confirm delete',
        message: 'Do you really want to delete this appointment?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.doDelete();
            }
          }
        ]
      });
      alert.present();
    }

    doDelete(){
      this.appointdata.status = 'rejected';
      this.appointdata.active = 0;
      this.appointdata.notes = 'Request deleted';
      this.liveedit = false;
      this.editdisabled = true;
      this.appointService.updateAppointment(this.appointdata).subscribe(response=>{
        if (response != null && response.status ==='Success'){
          this.showError("Appointment deleted successfully");
          this.checkState();
          this.viewCtrl.dismiss(this.appointdata);
        }
      },
        error => {
          this.showError("Oops! something went wrong, please try again");
        })
    }



  showError(text) {
    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    alert.present();
  }

  ionViewWillLoad() {
    var d = new Date(this.appointdata.book_date);
    var dayName = d.toString().split(' ')[0];
    this.appoint_date = dayName+', '+this.monthLabels[d.getMonth()]+' '+d.getDate();
    this.checkState();
  }

  checkState(){
    var usename = this.userservice.getUserName();
    if (this.appointdata.createdby === usename){
      this.hideapprove = false;
      this.statecolor = 'secondary';
      this.statename = 'checkmark-circle'
    }else if (this.appointdata.status === 'pending'){
        this.hideapprove = true;
        this.statecolor = 'danger';
        this.statename = 'help-circle'
    }else {
      this.hideapprove = false;
      this.statecolor = 'secondary';
      this.statename = 'checkmark-circle';
    }
  }

  doEdit(){
    this.liveedit = true;
    this.editdisabled = false;
  }

  doUpdate(updatetype){
    if (updatetype === 'approve'){
      this.appointdata.status = 'approved';
    }/*else {
      this.appointdata.status = 'rescheduled';
    }*/
    this.liveedit = false;
    this.editdisabled = true;
    this.appointService.updateAppointment(this.appointdata).subscribe(response =>{
      if (response != null && response.status ==='Success'){
        this.showError(response.msg);
        this.checkState();
      }
    },
      error => {
        this.showError("Oops! something went wrong, please try again");
      })
  }

  doCancel(){
      this.liveedit = false;
      this.editdisabled = true;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
