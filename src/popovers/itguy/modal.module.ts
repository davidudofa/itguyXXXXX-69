import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalItguyPage } from './modal';
import { ItGuyService } from "../../providers/itguy-service/itguyservice";
import { Ionic2RatingModule } from 'ionic2-rating';
import {IonTagsInputModule} from "ionic-tags-input";


@NgModule({
  declarations: [
    ModalItguyPage
  ],
  imports: [
    IonicPageModule.forChild(ModalItguyPage),
    Ionic2RatingModule,
    IonTagsInputModule
  ],
  exports: [
    ModalItguyPage
  ],
  providers:[
    ItGuyService
  ]
})
export class ItGuyModule {}
