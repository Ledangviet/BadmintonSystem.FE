import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat/chat.service';
import {
  ChatMessageDetailModel,
  ChatRoomModel,
} from '../../../model/chat.room.response';
import { ChatMessageModel } from '../../../model/chat.message.response.model';
import BaseResponseModel from '../../../model/base.response.model';
import UserResponseModel from '../../../model/user.response.model';
import ChatModel from '../../../model/chat.message.model';
import { SignalRChatService } from '../../../services/signalR/chat/signalr.service';
import { ChatRoomRequest } from '../../../model/chat.room.request';
import { AuthService } from '../../../services/shared/auth.service';
import LoginResponseModel from '../../../model/login.response.model';

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-chat.component.html',
  styleUrl: './admin-chat.component.scss',
})
export class AdminChatComponent implements AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('inputFocus') inputFocus!: ElementRef;
  @Output() messageAdded = new EventEmitter<void>();

  email = localStorage.getItem('email')?.toString();
  newMessage = '';
  searchQuery = '';
  listRoomChat: ChatRoomModel[] = [];
  listMessChat: ChatMessageModel[] = [];
  selectedRoomChat: ChatRoomModel = {
    chatMessage: null,
    userId: '',
    userName: '',
    email: '',
    avatar: '',
    createdDate: '',
    modifiedDate: null,
    createdBy: '',
    modifiedBy: null,
    isDeleted: false,
    deletedAt: null,
    id: '',
  };
  accessToken = localStorage.getItem('accessToken')?.toString();
  chatRoomId: string = '';
  userDetail: any;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private signalRChatService: SignalRChatService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnInit() {
    if (this.accessToken) {
      this.signalRChatService
        .startConnection(this.accessToken)
        .then(() => {
          this.signalRChatService.message$.subscribe((message) => {
            this.handlerGetChatRoomLoad(this.userDetail);
            if (!message) return;
            if (message.chatRoomId != this.chatRoomId) return;
            this.handleWhenChangeMessages(
              message.chatRoomId,
              message.content,
              message.createdDate,
              message.isAdmin
            );
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
        this.handlerGetChatRoom(result.value.user);
        // this.handlerGetChatMessage(result.value.user.id);
      });
  }

  handlerGetChatRoomLoad(user: any) {
    const chatRoomRequest: ChatRoomRequest = {
      appRoleType: 1,
      userId: user.id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    };
    this.chatService
      .getChatRoom(chatRoomRequest)
      .subscribe((result: BaseResponseModel) => {
        this.listRoomChat = result.value.items;
      });
  }

  handlerGetChatRoom(user: any) {
    const chatRoomRequest: ChatRoomRequest = {
      appRoleType: 1,
      userId: user.id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
    };
    this.chatService
      .getChatRoom(chatRoomRequest)
      .subscribe((result: BaseResponseModel) => {
        this.listRoomChat = result.value.items;
        this.selectedRoomChat = result.value.items[0];
        this.handleGetChatMess(result.value.items[0].userId);
        this.chatRoomId = result.value.items[0].id;
      });
  }

  selectChat(chat: ChatRoomModel) {
    if (!chat) return;
    this.chatService
      .getChatMessageList(1, 50, chat.userId)
      .subscribe((result: BaseResponseModel) => {
        this.listMessChat = result.value.items.sort(
          (a: any, b: any) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        );
      });
    this.selectedRoomChat = chat;
    this.chatRoomId = chat.id;
    this.focusInput(chat.id);
  }

  handleGetChatMess(userId: string) {
    this.chatService
      .getChatMessageList(1, 50, userId)
      .subscribe((result: BaseResponseModel) => {
        this.listMessChat = result.value.items.sort(
          (a: any, b: any) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        );
      });
  }

  handleWhenChangeMessages(
    chatRoomId: string,
    message: string,
    date: string,
    isAdmin: boolean
  ) {
    const messages: ChatMessageModel = {
      user: null,
      imageUrl: '',
      content: message,
      isAdmin: isAdmin,
      isRead: isAdmin,
      readDate: '',
      chatRoomId: chatRoomId,
      createdDate: date,
      modifiedDate: null,
      createdBy: '',
      modifiedBy: '',
      isDeleted: false,
      deletedAt: null,
      id: '',
    };
    // this.changeStatusRoom(chatRoomId, isAdmin, message);
    if (this.listMessChat) {
      this.listMessChat.push(messages);
    }
  }

  // changeStatusRoom(
  //   chatRoomId: string,
  //   isAdmin: boolean | null,
  //   content: string
  // ) {
  //   const index = this.listRoomChat.findIndex(
  //     (x: any) => x.chatMessage.chatRoomId === chatRoomId
  //   );

  //   if (index !== -1) {
  //     this.listRoomChat[index].chatMessage.isAdmin =
  //       isAdmin == null
  //         ? this.listRoomChat[index].chatMessage.isAdmin
  //         : isAdmin;
  //     this.listRoomChat[index].chatMessage.isRead =
  //       isAdmin == null
  //         ? !this.listRoomChat[index].chatMessage.isRead
  //         : isAdmin;
  //     this.listRoomChat[index].chatMessage.content =
  //       content == '' ? this.listRoomChat[index].chatMessage.content : content;
  //   }
  // }

  sendMessage(newMessage: string) {
    if (newMessage.trim() === '') return;
    // this.handleWhenChangeMessages(
    //   this.chatRoomId,
    //   newMessage,
    //   new Date().toISOString(),
    //   true
    // );

    if (this.selectedRoomChat) {
      var model: ChatModel = {
        content: newMessage,
        imageUrl: 'kh co',
        userId: this.selectedRoomChat.userId,
        isAdmin: true,
      };

      this.chatService.sendMessage(model).subscribe();
      this.newMessage = '';
      this.scrollToBottom();
    }
  }
  searchUsers() {
    // this.filteredChats = this.chats.filter((chat) =>
    //   chat.user.toLowerCase().includes(this.searchQuery.toLowerCase())
    // );
  }

  isNotificationForYou(isAdmin: any, isRead: any, content: any) {
    if (!content) return true;
    if (!isAdmin && !isRead) return false;
    return true;
  }

  isMe(chat: any) {
    if (chat.chatMessage.isAdmin) return false;
    return true;
  }

  isImage() {
    var isImage = this.selectedRoomChat.avatar.trim() != '';
    if (isImage) return false;
    return true;
  }

  isAdmin(message: ChatMessageModel) {
    if (message.isAdmin === true) return true;
    return false;
  }

  scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }

  handleInputFocus() {
    // this.changeStatusRoom(this.chatRoomId, null, '');
  }

  focusInput(chatRoomId: string) {
    if (this.inputFocus && this.inputFocus.nativeElement) {
      this.inputFocus.nativeElement.focus();
      this.chatService.readAllMessage(chatRoomId).subscribe();
      this.handlerGetChatRoomLoad(this.userDetail);
      // this.changeStatusRoom(this.chatRoomId, null, '');
    }
  }
}
