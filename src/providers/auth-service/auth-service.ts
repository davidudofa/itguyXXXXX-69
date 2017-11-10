import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}


@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(private http: Http) {
  }

  //private API = 'http://localhost/ITGUY/api';
  private API = 'http://apps.artsinscience.com/ITGUY/api';

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
        return this.http.get(this.API+'/login?email='+credentials.email+'&password='+credentials.password)
          .map(res => res.json());
    }
  }

  public register(credentials) {
    if (credentials === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.get(this.API+'/register?regname='+credentials.regname+'&regmail='+credentials.regmail+'&regphone='+credentials.regphone+'&regpass='+credentials.regpass+'&regusername='+credentials.regusername+'&regas='+credentials.regas).map(res => res.json());
    }
  }

  public checkuser(credential){
    if (credential === null){
      return Observable.throw("Please insert credential");
    }else {
      return this.http.get(this.API+'/checkuser?username='+credential)
        .map(res => res.json());
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
