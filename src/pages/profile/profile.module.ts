import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { Ionic2RatingModule } from 'ionic2-rating';
import {IonTagsInputModule} from "ionic-tags-input";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    Ionic2RatingModule,
    IonTagsInputModule
  ],
})
export class ProfilePageModule {}
