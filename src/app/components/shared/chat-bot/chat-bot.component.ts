import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  isRead = false;
  newMessage = '';
  isOpen = false;



  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
    }
  }
}
