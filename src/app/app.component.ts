import { Component } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { ChatService } from "./chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url: string = 'wss://kqmieqbsig.execute-api.us-west-2.amazonaws.com/production';
  name: string = '';
  names: string[] = new Array();
  messages: string[] = new Array();
  novaMsg: string = '';

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
          if(result.members)
          {
            this.names = result.members;
          } else {
            this.messages.push(result.systemMessage ?? result.publicMessage);
          }
        });
  }

  enviaMsg() {
    this.webSocket.sendPublic(this.novaMsg);
  }
  
  sendPublic(message: string) {
    this.webSocket.sendPublic(message);
  }
}
