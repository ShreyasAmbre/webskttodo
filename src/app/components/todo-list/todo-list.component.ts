import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket'; 
import { WebsocketService } from 'src/app/services/websocket.service'; 

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: string[] = []; 
  newTodo: any = ''; 
  isConnected: boolean = false; 

  constructor(private webSocketService: WebsocketService){
    this.todos = this.webSocketService.getTodoArr(); 
  }

  ngOnInit(): void {

    // Establish WebSocket connection 
    this.webSocketService.socket$ = webSocket('wss://interesting-seed-daemonosaurus.glitch.me/'); 

    // Subscribe to the incoming messages from the WebSocket server 
    this.webSocketService.socket$.subscribe((message:any) => { 
        this.isConnected = true; 
        var arrTodo: string [] = []; 
        message.forEach((element:any) => { 
        arrTodo.push(element.replace("\"", "").replace("\"", ""))}); 
        console.log(arrTodo); 
        this.todos = arrTodo; 
      }, 
      (error) => console.error('WebSocket error:', error), 
      () => { 
      this.isConnected = false; 
      console.log('WebSocket connection closed'); 
    });
  }


  addTodo() { 
    if (this.newTodo.trim() !== '') { 
      // Send new to-do item to the server 
      this.webSocketService.send(this.newTodo); 
      this.newTodo = ''; 
    } 
  } 

  resetList() { 
    // Send a special message to reset the to-do list
    this.webSocketService.send('reset!*(@h9890138ch1908');  
  } 


  connectWebSocket() { 
    // Establish WebSocket connection 
    this.webSocketService.socket$ = webSocket('ws://localhost:8080'); 
    this.webSocketService.socket$.subscribe((message:any) => { 
      this.isConnected = true; 
      var arrTodo: string [] = []; 
      message.forEach((element:any) => { 
      arrTodo.push(element.replace("\"", "").replace("\"", "")) 
    }); 
      console.log(arrTodo); 
      this.todos = arrTodo; 
    }, 
    (error) => console.error('WebSocket error:', error), 
    () => { 
      this.isConnected = false; 
      console.log('WebSocket connection closed'); 
    }); 
  }

  disconnectWebSocket() { 
    // Close WebSocket connection 
    this.webSocketService.disconnect(); 
  }

  isWebSocketConnected(): boolean { 
    // Check if WebSocket connection is established
    return this.webSocketService.isConnected();  
  }

  refresh() { 
    // Update the to-do list by retrieving it from the WebSocket service 
    this.todos = this.webSocketService.getTodoArr(); 
  } 

}
