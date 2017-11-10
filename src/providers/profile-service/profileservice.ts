import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProfileService {

  constructor(private http: Http){

  }
  private API = 'http://apps.artsinscience.com/ITGUY/api';
  //private API = 'http://localhost/ITGUY/api';

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

  public updateProfile(user: any){
    return this.http.get(this.API+'/updateprofile?name='+user.name+'&mail='+user.email+'&phone='+user.phone+'&address='+user.address+'&city='+user.city+'&user='+user.id).map(res => res.json());
  }

  public updateCategory(cat: any, user: any){
    return this.http.get(this.API+'/updatecategory?user='+user+'&category='+cat).map(res => res.json());
  }

  public updateSkills(skills: any, user: any){
    return this.http.get(this.API+'/updateskills?user='+user+'&skills='+skills).map(res => res.json());
  }

}
