import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'; 

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket$!: WebSocketSubject<any>; 
  todoArr: string[] = []; 

  constructor() { }

  connect() { 
    // Replace with your WebSocket server URL 
    this.socket$ = webSocket('wss://interesting-seed-daemonosaurus.glitch.me/'); 
  } 

  disconnect() { 
    this.socket$.complete(); 
  } 

  isConnected(): boolean { 
    return (this.socket$ === null ? false : !this.socket$.closed); 
  } 

  onMessage(): Observable<any> { 
    return this.socket$!.asObservable().pipe( 
    map(message => message) 
    ); 
  } 

  send(message: any) { 
    this.socket$.next(message); 
  }
  
  getTodoArr(): string[] { 
    return this.todoArr; 
  } 
}

