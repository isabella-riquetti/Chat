import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { ChatService } from "./chat.service";
import { environment } from './../environments/environment';
const subject = webSocket(environment.url);

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  constructor(messagesService: ChatService) {     
    subject.subscribe(
      msg => 
        messagesService.addMessage(JSON.stringify(msg)),
      err => console.log(err),
      () => console.log('complete')
    );
  }

  public getMessages(){
    return subject
  }

  public setName(name: string){
    subject.next({ action: 'setName', name: name });
  }

  public sendPublic(message: string){
    subject.next({ action: 'sendPublic', message: message });
  }
}
