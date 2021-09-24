import { Component } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { ChatService } from "./chat.service";

export class Message {
  message:string;
  isSystem:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url: string = 'wss://kqmieqbsig.execute-api.us-west-2.amazonaws.com/production';
  name: string = '';
  names: string[] = new Array();
  messages: any[] = new Array();
  newMessage: string = '';

  constructor(private webSocket: WebsocketService,
    messagesService: ChatService) {
    let person = prompt("Please enter your name:", );
    if (person != null && person != "") {
      webSocket.setName(person);
    }
    
    messagesService.newMessages.subscribe(
      msg => 
        {
          var result = JSON.parse(msg);
          if(result.members) {
            this.names = result.members;
          }
          else {
            this.messages.push({
              message: result.systemMessage ?? result.publicMessage,
              isSystem: result.systemMessage != undefined
            });
          }
        });
  }

  enviaMsg() {
    this.webSocket.sendPublic(this.newMessage);
    this.newMessage = '';
  }
  
  sendPublic(message: string) {
    this.webSocket.sendPublic(message);
  }
}
