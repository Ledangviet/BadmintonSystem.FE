import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../../services/chat/chat.service';
import {
  ChatRoomModel,
  ChatRoomResponseModel,
} from '../../../model/chat.room.response';
import {
  ChatMessageModel,
  ChatMessageResponseModel,
} from '../../../model/chat.message.response.model';
import { AuthService } from '../../../services/shared/auth.service';
import LoginResponseModel from '../../../model/login.response.model';
import BaseResponseModel from '../../../model/base.response.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  isOpen = false;
  message = '';
  chatList = ['Chat 1', 'Chat 2', 'Chat 3'];

  userDetail: any;
  listChatRoom: ChatRoomModel[] = [];
  listChatMessage: ChatMessageModel[] = [];
  email = localStorage.getItem('email')?.toString();

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // GET API USER DETAIL
    this.authService
      .userDetail(this.email)
      .subscribe((result: LoginResponseModel) => {
        this.userDetail = result.value;
        console.log(result.value);
      });

    // GET API CHAT ROOM
    this.chatService
      .getChatRoomByAdminList(1, 10)
      .subscribe((result: BaseResponseModel) => {
        this.listChatRoom = result.value.items;
        console.log('ROOM:::::::', result.value.items);
      });

    // GET API CHAT MESSAGE
    this.chatService
      .getChatMessageList(1, 10)
      .subscribe((result: BaseResponseModel) => {
        this.listChatMessage = result.value.items;
        console.log('MESS:::::::', result.value.items);
      });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.message.trim()) {
      console.log('Gửi tin nhắn:', this.message);
      this.message = '';
    }
  }
}
