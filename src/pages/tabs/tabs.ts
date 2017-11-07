import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { UserprofileService } from '../../providers/appservice/appservice';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  itguy: any;
  userName: any;
  userMail: any;
  newChats: number;
  newAppointments: number;
  newBlog: number;
  subscription: Subscription;

  constructor(public nav: NavController, public navParams: NavParams, private userservice: UserprofileService, public events: Events) {
    this.itguy = userservice.getItGuy();
    this.tab1 = 'DashboardPage';
    this.tab2 = 'ChatsPage';
    this.tab3 = 'AppointmentsPage';
    this.tab4 = 'BlogPage';
    this.tab5 = 'ProfilePage';
  }

  incrementBadgeCount(){
      this.newChats = this.newChats+1;
      this.publishBadgeCountUpdate();
  }

  decrementBadgeCount(){
    this.newChats = this.newChats-1;
    this.publishBadgeCountUpdate();
  }

  /*subscribeToBadgeCountChange(){
      // Method to run when tab count changes
      return this
      .events
      .subscribe("tabs-page:badge-update", this.refreshBadgeCount());
  }*/

  publishBadgeCountUpdate(){
      // Call this method when you have changed the count
    return this
        .events
        .publish("tabs-page:badge-update");
  }



  /*refreshBadgeCount(){
    // This method will be called when incrementBadgeCount or decrementBadgeCount are executed.
    // The beauty of the events approach is that you can cause a change to the tab count from any other view, without referencing the tabs page directly.

  } */

  ionViewDidLoad() {
    //this.subscribeToBadgeCountChange();
    this.itguy = this.userservice.getItGuy();
    this.userName = this.userservice.getUserName();
    this.userMail = this.userservice.getUserMail();
    localStorage.getItem('itGuy');
    localStorage.getItem('userName');
    localStorage.getItem('userMail');
    if (this.itguy == null && localStorage.getItem('itGuy') == null){
      this.nav.push('LoginPage');
    }
  }

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad TabsPage');
  //}

}
