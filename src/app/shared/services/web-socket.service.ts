import { API_URL } from './../../../environments/api-url';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
//import Stomp from 'stompjs';
//import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService {
  private serverUrl = 'http://192.168.1.119:8888/socket'
  private title = 'WebSockets chat';
  private stompClient;
constructor() {
  // this.initializeWebSocketConnection();
}

initializeWebSocketConnection(): Observable<any>{
  let ws = new SockJS(API_URL.DTVBILLCHECK );
  this.stompClient = Stomp.over(ws);
  let that = this;
 return this.stompClient.connect({}, function(frame) {
    that.stompClient.subscribe("/taskProgress/"
    +localStorage.getItem("userName").toString(), (message) => {
     return message;
    });
  });
}

// requestProgress() {
//   this.stompClient.send('/analytics' , {}, null);
// }

}
