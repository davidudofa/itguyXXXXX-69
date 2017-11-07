import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProfilePage } from './modal';
import { ProfileService } from "../../providers/profile-service/profileservice";
import { Ionic2RatingModule } from 'ionic2-rating';
import {IonTagsInputModule} from "ionic-tags-input";


@NgModule({
  declarations: [
    ModalProfilePage
  ],
  imports: [
    IonicPageModule.forChild(ModalProfilePage),
    Ionic2RatingModule,
    IonTagsInputModule
  ],
  exports: [
    ModalProfilePage
  ],
  providers:[
    ProfileService
  ]
})
export class ProfileModule {}
