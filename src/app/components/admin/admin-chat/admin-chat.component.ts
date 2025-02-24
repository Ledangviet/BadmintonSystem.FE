import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-chat.component.html',
  styleUrl: './admin-chat.component.scss'
})
export class AdminChatComponent {
  chats = [
    { user: 'User1', messages: [{ user: 'User1', text: 'Hello!' }, { user: 'Admin', text: 'Hi there!' }] },
    { user: 'User2', messages: [{ user: 'User2', text: 'Good morning!' }, { user: 'Admin', text: 'Good morning!' }] }
  ];
  filteredChats = this.chats;
  selectedChat = this.chats[0];
  newMessage = '';
  searchQuery = '';

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedChat.messages.push({ user: 'Admin', text: this.newMessage });
      this.newMessage = '';
    }
  }
  searchUsers() {
    this.filteredChats = this.chats.filter(chat => chat.user.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
