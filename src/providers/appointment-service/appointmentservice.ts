import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class AppointData {
    id: string;
    client_name: string;
    client_mail: string;
    client_phone: string;
    to_see: string;
    book_date: string;
    time: number | string;
    category: string;
    venue: string;
    details: string;
    status: string;
    state: string;
    createdby: string;
}

export class UserInfo {
    id: string;
    name: string;
    mail: string;
}


@Injectable()
export class AppointServiceProvider {

  constructor(private http: Http, public events: Events) {
    //console.log('Hello AuthServiceProvider Provider');
  }

  private API = 'http://apps.artsinscience.com/ITGUY/api';
  //private API = 'http://localhost/ITGUY/api';

  public appointments(itguy, usermail) {
        return this.http.get(this.API+'/appointments?itguy='+itguy+'&usermail='+usermail)
          .map(res => res.json());
  }

  public readstate(msgid){
    return this.http.get(this.API+'/appointstatus?id='+msgid).map(res => res.json());
  }


  public updateAppointment(msg: any){
    return this.http.get(this.API+'/updateappointment?id='+msg.id+'&book_date='+msg.book_date+'&time='+msg.time+'&notes='+msg.notes+'&status='+msg.status+'&active='+msg.active).map(res => res.json()
    );
  }

    public newAppointment(msg: any){
        return this.http.get(this.API+'/newappointment?client_name='+msg.client_name+'&client_mail='+msg.client_mail+'&client_phone='+msg.client_phone+'&to_see='+msg.to_see+'&book_date='+msg.book_date+'&time='+msg.time+'&category='+msg.category+'&venue='+msg.venue+'&details='+msg.details+'&status=Pending&state=1&createdby='+msg.createdby).map(res => res.json()
        );
    }


}
