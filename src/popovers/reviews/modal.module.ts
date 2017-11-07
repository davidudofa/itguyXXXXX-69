import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalReviewPage } from './modal';
import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    ModalReviewPage
  ],
  imports: [
    IonicPageModule.forChild(ModalReviewPage),
    Ionic2RatingModule
  ],
  exports: [
    ModalReviewPage
  ],
  providers:[]
})
export class ViewReviewModule {}
