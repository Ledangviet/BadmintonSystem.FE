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
  link?: string;
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
      if (chat == 'chat') {
        this.isOpen = false;
      }
    })
    this.listMessage = [
      {
        message: "",
        response: ["Tôi là ttrợ lý ảo của bạn, tôi có thể giúp gì cho bạn?"],
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
    this.newMessage = '';
    this.listMessage.push(this.currentMessage!);

    let sentMessage = this.currentMessage.message;
    if (this.currentMessage.message.startsWith('Tôi muốn đặt sân')) {
      if (this.authService.getIsAuthenticated() == false) {
        this.listMessage[this.listMessage.length - 1].response.push('Vui lòng đăng nhập để đặt sân !');
        setTimeout(() => {
          this.scrollToBottom();
        }, 100)
        return;
      }
      else {
        let email = localStorage.getItem('email')?.toString();
        if (email == null || email == "") {
          email = "ledangviet001@gmail.com";
        }
        sentMessage = sentMessage + ` Email: ${email}`;
      }
    }

    this.chatbotService.sendMesage(sentMessage, 'user').pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((res) => {
      if (res) {
        let listMessage = res as MessageResponseModel[];
        let listMsg = listMessage.flatMap((item) => {
          return item.text.split('\n');
        });

        listMsg = listMsg.map((msg) => {
          const match = msg.match(/Vui lòng thanh toán qua QRCode\. Url = (https?:\/\/[^\s]+)/);
          if (match) {
            this.currentMessage!.link = match[1]; // Extract the link
            return `Vui lòng thanh toán qua QRCode:`;
          }
          return msg;
        });

        this.currentMessage!.response = listMsg;
        this.listMessage[this.listMessage.length - 1].response = listMsg;
        this.currentMessage = null;
        setTimeout(() => {
          this.scrollToBottom();
        }, 100)

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
