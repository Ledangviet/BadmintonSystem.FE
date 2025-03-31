import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ChatbotService } from '../../../services/chatbot.service';

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


  constructor(
    private chatbotService: ChatbotService
  )
  {}

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
    }
  }
}
