import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ItGuy {
    id: string;
    from_mail: string;
    from_name: string;
    to_name: string;
    to_mail: string;
    message: string;
    time: number | string;
    status: string;
    itguy: string;
}

export class UserInfo {
    id: string;
    name?: string;
    mail?: string;
}


@Injectable()
export class ItGuyService {

  constructor(private http: Http, public events: Events) {
    //console.log('Hello AuthServiceProvider Provider');
  }

  private API = 'http://apps.artsinscience.com/ITGUY/api';
  //private API = 'http://localhost/ITGUY/api';

  /*public itguys() {
        return this.http.get(this.API+'/itguys')
          .map(res => res.json());
  }*/

  public itguy(itguy){
        return this.http.get(this.API+'/itguys?itguy='+itguy)
        .map(res => res.json());
          //.catch(err => Promise.reject(err || 'err'));
  }

  public reviews(itguy){
    return this.http.get(this.API+'/reviews?itguy='+itguy).map(res => res.json());
  }


    public newReview(msg: any) {
      //console.log(msg);
        return this.http.get(this.API+'/newreview?id='+msg.id+'&rev_name='+msg.rev_name+'&rev_mail='+msg.rev_mail+'&message='+msg.message+'&rating='+msg.rating+'&recommend='+msg.recommend+'&itguy='+msg.itguy+'&active='+msg.active).map(res => res.json()
        );
    }


}
