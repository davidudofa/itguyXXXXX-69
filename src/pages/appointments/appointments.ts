import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ModalController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AppointServiceProvider, UserInfo } from '../../providers/appointment-service/appointmentservice';
import { UserprofileService } from '../../providers/appservice/appservice';
import { ModalContentPage } from '../../popovers/appointments/modal';
import { ModalAppointPage } from '../../popovers/newappointments/modal';
//import { SearchPipe } from "../../pipes/search-pipe";


/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {
  appointmentList: any = [];
  monthWiseGroup: any = [];
  listData: any = []; //AppointData;
  user: UserInfo;
  searchParam: string ;
  filteredItems: any = [];
  loading: Loading;
  monthLabels: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(public nav: NavController, public navParams: NavParams, private userservice: UserprofileService, private appservice: AppointServiceProvider, private toastCtrl: ToastController, private modalCtrl: ModalController, private loadingCtrl: LoadingController) {
    this.user = {
      id: this.userservice.getItGuy(),
      name: this.userservice.getUserName(),
      mail: this.userservice.getUserMail()
    }
    if (this.user.id== null){
      this.nav.push('LoginPage');
    }
    this.filteredItems = this.appointmentList;
  }

  openModal(appointment) {
    let modal = this.modalCtrl.create(ModalContentPage, {'appointmentData': appointment});
    modal.onDidDismiss(()=> {
      this.ionViewWillLoad();
    })
    modal.present();
  }

  newAppointment(){
    var newitguy = {
      id: 0
    }
    let newmodal = this.modalCtrl.create(ModalAppointPage, {'itguy': newitguy});
    newmodal.present();
  }

  ionViewWillLoad() {
    //this.showLoading();
    this.appservice.appointments(this.user.id, this.user.mail).subscribe(response => {
      if (response && response.status != 'Failed') {
        this.appointmentList = response;
        for (var newappoint in response){
          if (response[newappoint].client_mail === this.user.mail){
            this.appointmentList[newappoint].client_name = response[newappoint].name;
            this.appointmentList[newappoint].client_mail = response[newappoint].email;
            this.appointmentList[newappoint].client_phone = response[newappoint].phone;
            this.appointmentList[newappoint].status = 'approved';
          }
        }
        this.monthWiseGroup = this.itemsGroupedByMonth(this.appointmentList);
        //this.hideLoading();
      } else {
        //this.hideLoading();
        this.appointmentList = [];
        this.showError("No appointments available.");
      }
    },
      error => {
        //this.hideLoading();
        this.showError("Sorry we couldn't connect to the server. Please try again");
      });
  }


       itemsGroupedByMonth(items) {
               var
                       groups = [[], [], [], [], [], [], [], [], [], [], [], [],],
                       itemGroupedByMonths = [];

               for (var i = 0; i < items.length; i++) {
                 var tdate = new Date(items[i].book_date);
                   groups[tdate.getMonth()].push(items[i]);
               }
               for (var j = 0; j < groups.length; j++) {
                   if (groups[j].length) {
                       itemGroupedByMonths.push({
                           month: this.monthLabels[j],
                           items: groups[j]
                       });

                   }
               }
               return itemGroupedByMonths;
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

  showError(text) {
    let alert = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    alert.present();
  }

}
