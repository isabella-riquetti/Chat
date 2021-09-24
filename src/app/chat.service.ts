import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";

interface IMessagesOperation extends Function {
  (messages: string[]): string[];
}


@Injectable()
export class ChatService {
  newMessages: Subject<string> = new Subject<string>();

  messages: Observable<string[]>;

  updates: Subject<any> = new Subject<any>();

  create: Subject<string> = new Subject<string>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    // this.messages = this.updates
    //   .scan((messages: string[],
    //     operation: IMessagesOperation) => {
    //       return operation(messages);
    //     });

    // this.create
    //   .map(function(message: string) : IMessagesOperation {
    //     return (messages: string[]) => {
    //       return messages.concat(message);
    //     };
    //   })
    //   .subscribe(this.updates);

    // this.newMessages
    //   .subscribe(this.create);
  }

  // an imperative function call to this action stream
  addMessage(message: string): void {
    this.newMessages.next(message);
  }
}