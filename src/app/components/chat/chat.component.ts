import { AuthService } from './../../services/auth.service';
import { Chat } from './../../models/chat.model';
import { ChatsService } from './../../services/chats.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chats: any[] = [];
  chat: Chat = {
    name: '',
    message: '',
    created_at: '',
  };

  constructor(private chatService: ChatsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.chatService.getChats().subscribe(res => this.chats = res);
  }

  addChat() {
    this.chat.name = this.authService.usersData.displayName;
    let current = new Date();
    this.chat.created_at = current.getTime();

    this.chatService.addChat(this.chat)
      .then(res => {
        this.chat.message = '';
      })
      .catch();
  }

}
