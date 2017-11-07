import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserprofileService {

  itguy: any;
  profilename: any;
  username: any;
  usermail: any;
  userimage: any;
  userphone: any;
  constructor() { }

  setItGuy(itguy : any){
      this.itguy = itguy;
  }
  getItGuy(){
    return this.itguy;
  }
  setProfileName(profilename: any){
    this.profilename = profilename
  }
  getProfileName(){
    return this.profilename;
  }

  setUserName(name : any){
      this.username = name;
  }
  getUserName(){
    return this.username;
  }
  setUserMail(mail: any){
    this.usermail = mail;
  }
  getUserMail(){
    return this.usermail;
  }
  setUserImage(imagedate: any){
    this.userimage = imagedate;
  }
  getUserImage(){
    return this.userimage;
  }
  setUserPhone(phone: any){
    this.userphone = phone;
  }
  getUserPhone(){
    return this.userphone;
  }

}
