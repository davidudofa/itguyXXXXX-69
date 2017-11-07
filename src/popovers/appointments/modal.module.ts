import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContentPage } from './modal';
import { AppointServiceProvider } from "../../providers/appointment-service/appointmentservice";

@NgModule({
  declarations: [
    ModalContentPage
  ],
  imports: [
    IonicPageModule.forChild(ModalContentPage),
  ],
  exports: [
    ModalContentPage
  ],
  providers:[
    AppointServiceProvider
  ]
})
export class AppointmentModule {}
