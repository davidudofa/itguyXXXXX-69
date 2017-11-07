import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ChatMessage {
    id: string;
    from_mail: string;
    from_name: string;
    to_name: string;
    to_mail: string;
    message: string;
    time: number | string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    mail?: string;
}


@Injectable()
export class ChatServiceProvider {

  constructor(private http: Http, public events: Events) {
  }

  //private API = 'http://apps.artsinscience.com/ITGUY/api';
  private API = 'http://localhost/ITGUY/api';

  public chats(user) {
    if (user === null) {
      return Observable.throw("Please insert credentials");
    } else {
        return this.http.get(this.API+'/chats?user='+user)
          .map(res => res.json());
    }
  }

  public chat(itguy, fromusermail, tomail){
        return this.http.get(this.API+'/chat?itguy='+itguy+'&fromusermail='+fromusermail+'&tomail='+tomail)
        .map(res => res.json());
          //.catch(err => Promise.reject(err || 'err'));
  }

  public sendMsg(msg: ChatMessage) {
        //return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
        //.then(() => this.mockNewMsg(msg));
    }

    public mockNewMsg(msg: ChatMessage): Observable<ChatMessage> {
        return this.http.get(this.API+'/newchat?from_name='+msg.from_name+'&from_mail='+msg.from_mail+'&to_name='+msg.to_name+'&to_mail='+msg.to_mail+'&message='+encodeURI(this.enc_ur(msg.message))+'&status=1').map(res => res.json()
        );
          //.then(() => this.events.publish('chat:received', msg, Date.now()));

        //setTimeout(() => {
            //this.events.publish('chat:received', msg, Date.now());
        //}, Math.random() * 1800)
    }

    public enc_ur(text){
      var t1 = text.replace('\'', '\\\'');
      var t2 = t1.replace("\\", "\\\\");
      return t2;
    }


}
