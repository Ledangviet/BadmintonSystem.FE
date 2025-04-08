import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ChatbotService } from '../../../services/chatbot.service';
import { AuthService } from '../../../services/shared/auth.service';
import { finalize } from 'rxjs';
import { ChatService } from '../../../services/chat/chat.service';
import { animate, style, transition, trigger } from '@angular/animations';


interface Message {
  message: string;
  response: string[];
}

interface MessageResponseModel {
  recipient_id: string;
  text: string;
}
@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss',
  animations: [
      trigger('chatOpen', [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translate(100%, 100%) scale(0.5)',
          }),
          animate(
            '300ms ease-out',
            style({
              opacity: 1,
              transform: 'translate(0, 0) scale(1)',
            })
          ),
        ]),
        transition(':leave', [
          animate(
            '300ms ease-in',
            style({
              opacity: 0,
              transform: 'translate(100%, 100%) scale(0.5)',
            })
          ),
        ]),
      ]),
    ],
})
export class ChatBotComponent {
  newMessage = '';
  isOpen = false;
  listMessage: Message[] = [];
  currentMessage: Message | null = null;
  isLoading = false;


  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.toggleChatEmitter.subscribe((chat) => {
      if(chat == 'chat'){
        this.isOpen = false;
      }
    })
    this.listMessage = [
      {
        message: "",
        response: ["Xin chào, tôi là trợ lí AI của bạn. Tôi có thể giúp gì cho bạn?"]
      }
    ];
    this.currentMessage = null;
  }

  toggleChat() {
    
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatService.toggleChatEmitter.emit('chatbot');
    }
  }

  sendMessage() {
    this.isLoading = true;
    this.currentMessage = {
      message: this.newMessage,
      response: []
    };

    this.chatbotService.sendMesage(this.newMessage, 'user').pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((res) => {
      if (res) {
        let listMessage = res as MessageResponseModel[];
        this.currentMessage!.response = listMessage[0].text.split('\n');
        this.listMessage.push(this.currentMessage!);
        this.newMessage = '';

        setTimeout(() => {
          this.scrollToBottom();
        },100)
        
      }
    });
  }

  scrollToBottom() {
    const chatBody = document.getElementById('chat-bot-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
}
