import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentsPage } from './appointments';
import { SearchPipe } from "../../pipes/search-pipe";

@NgModule({
  declarations: [
    AppointmentsPage,
    SearchPipe
  ],
  imports: [
    IonicPageModule.forChild(AppointmentsPage),
  ],
})
export class AppointmentsPageModule {}
