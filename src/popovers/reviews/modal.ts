import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'modal-reviews',
  templateUrl: 'modal.html',
  //styleUrl: 'modal.scss'
})

export class ModalReviewPage {
  rating: any;
  reviews: any = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {

  }

  ionViewWillLeave() {

    }


    ionViewWillLoad(){
      this.reviews = this.params.get('reviews');
      this.rating = this.params.get('rating');
    }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
