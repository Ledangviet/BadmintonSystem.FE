import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../../services/chat/chat.service';
import { ChatMessageModel } from '../../../model/chat.message.response.model';
import { AuthService } from '../../../services/shared/auth.service';
import LoginResponseModel from '../../../model/login.response.model';
import BaseResponseModel from '../../../model/base.response.model';
import { DatePipe } from '@angular/common';
import { SignalRChatService } from '../../../services/signalR/chat/signalr.service';
import ChatModel from '../../../model/chat.message.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatRoomRequest } from '../../../model/chat.room.request';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [DatePipe],
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
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('inputMess') inputMess!: ElementRef;

  isOpen = false;
  isRead = true;
  newMessage = '';
  accessToken = localStorage.getItem('accessToken')?.toString();

  userDetail: any;
  listChatMessage: ChatMessageModel[] = [];
  email = localStorage.getItem('email')?.toString();
  chatRoomId = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private signalRChatService: SignalRChatService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
    setTimeout(() => {
      this.focusInput();
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.focusInput();
  }

  ngOnInit() {

    this.chatService.toggleChatEmitter.subscribe((chat) => {
      if(chat == 'chatbot'){
        this.isOpen = false;
      }
    })
    if (this.accessToken) {
      this.signalRChatService
        .startConnection(this.accessToken)
        .then(() => {
          this.signalRChatService.message$.subscribe((message) => {
            if (!message) return;
            if (message.chatRoomId == this.chatRoomId) {
              this.handleWhenChangeMessages(
                message.content,
                message.createdDate,
                message.isAdmin
              );
            }
          });
        })
        .catch((err) => {
          console.error('SignalR connection failed:', err);
        });
    }

    this.authService
      .userDetail(this.email)
      .subscribe((result: LoginResponseModel) => {
        this.userDetail = result.value.user;
        this.handlerGetChatRoom(result.value);
        this.handlerGetChatMessage(result.value.user.id);
      });
  }

  handlerGetChatRoom(user: any) {
    const chatRoomRequest: ChatRoomRequest = {
      appRoleType: 3,
      userId: user.user.id,
      userName: user.user.userName,
      email: user.user.email,
      avatar: user.user.avatar,
    };
    this.chatService
      .getChatRoom(chatRoomRequest)
      .subscribe((result: BaseResponseModel) => {
        this.chatRoomId = result.value.items[0].id;
      });
  }

  handlerGetChatMessage(userId: string) {
    this.chatService
      .getChatMessageList(1, 30, userId)
      .subscribe((result: BaseResponseModel) => {
        this.listChatMessage = result.value.items.sort(
          (a: any, b: any) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        const isAdmin = this.listChatMessage[0].isAdmin;
        if (isAdmin) this.isRead = this.listChatMessage[0].isRead;
      });
  }
  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatService.toggleChatEmitter.emit('chat');
      this.chatService.readAllMessage(this.chatRoomId).subscribe();
      this.isRead = true;
      this.focusInput();
    }
  }

  isAdmin(message: ChatMessageModel) {
    if (message.isAdmin === true) return true;
    return false;
  }

  handleWhenChangeMessages(message: string, date: string, isAdmin: boolean) {
    const messages: ChatMessageModel = {
      user: null,
      imageUrl: '',
      content: message,
      isAdmin: isAdmin,
      isRead: isAdmin ? false : true,
      readDate: '',
      chatRoomId: '',
      createdDate: date,
      modifiedDate: null,
      createdBy: '',
      modifiedBy: '',
      isDeleted: false,
      deletedAt: null,
      id: '',
    };
    this.listChatMessage.unshift(messages);
    if (this.isOpen) {
      if (isAdmin) this.isRead = true;
    }
  }

  sendMessage(newMessage: string) {
    if (newMessage.trim() === '') return;

    var model: ChatModel = {
      content: newMessage,
      imageUrl: 'kh co',
      userId: this.userDetail.id,
      isAdmin: false,
    };

    this.chatService.sendMessage(model).subscribe();
    this.newMessage = '';
    this.scrollToBottom();
  }

  isReadForYou() {
    return this.listChatMessage[0].isAdmin === true;
  }

  focusInput() {
    if (this.inputMess && this.inputMess.nativeElement) {
      this.inputMess.nativeElement.focus();
      this.isRead = true;
    }
  }

  scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
