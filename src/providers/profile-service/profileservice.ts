import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {

  constructor(private http: Http){

  }
  private API = 'http://localhost/ITGUY/api';

  public profile(itguy: any){
    return this.http.get(this.API+'/profile?user='+itguy)
      .map(res => res.json());
  }

  public getCategories(){
    return this.http.get(this.API+'/categories').map(res => res.json());
  }

  public getSkills(user: any){
    return this.http.get(this.API+'/skills?user='+user).map(res => res.json());
  }

}
