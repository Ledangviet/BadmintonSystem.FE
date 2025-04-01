import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ChatbotService } from '../../../services/chatbot.service';
import { AuthService } from '../../../services/shared/auth.service';


interface Message {
  message: string;
  response: string;
}

interface MessageResponseModel{
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
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  isRead = false;
  newMessage = '';
  isOpen = false;
  listMessage: Message[] = [];
  currentMessage: Message | null = null;


  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
  )
  {}

  ngOnInit() {
    this.listMessage = [];
    this.currentMessage = null;
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
    }
  }

  sendMessage(){
    this.currentMessage = {
      message: this.newMessage,
      response: ''
    };
    console.log(this.currentMessage);
    this.chatbotService.sendMesage(this.newMessage, 'user').subscribe((res) => {
      if(res){
        let listMessage = res as MessageResponseModel[];
        this.currentMessage!.response = listMessage[0].text;
        this.listMessage.push(this.currentMessage!);
        console.log(this.listMessage);
      }
    });
  }
}
