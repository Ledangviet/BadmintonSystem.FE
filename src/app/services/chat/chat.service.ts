import { Injectable } from '@angular/core';
import { ApiClientService } from '../shared/api-client.service';
import { Observable } from 'rxjs';
import BaseResponseModel from '../../model/base.response.model';
import ChatModel from '../../model/chat.message.model';
import { ChatRoomRequest } from '../../model/chat.room.request';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private apiClient: ApiClientService) {}

  getChatRoom(chatRoomRequest: ChatRoomRequest): Observable<BaseResponseModel> {
    var body = {
      appRoleType: chatRoomRequest.appRoleType,
      userId: chatRoomRequest.userId,
      userName: chatRoomRequest.userName,
      email: chatRoomRequest.email,
      avatar: chatRoomRequest.avatar,
    };
    let url = `chat-rooms/filter-and-sort?PageIndex=1&PageSize=99`;
    return this.apiClient.post<BaseResponseModel>(url, body);
  }

  getChatMessageList(
    pageIndex: number,
    pageSize: number,
    userId: string
  ): Observable<BaseResponseModel> {
    let url = `users/chat-message?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    var id = userId.trim();
    if (!id) {
      return this.apiClient.post<BaseResponseModel>(url, {});
    }
    var body = {
      userId: userId,
    };
    return this.apiClient.post<BaseResponseModel>(url, body);
  }

  sendMessage(model: ChatModel) {
    var body = {
      imageUrl: model.imageUrl,
      content: model.content,
      userId: model.userId,
      isAdmin: model.isAdmin,
    };
    let url = `chat-messages`;
    return this.apiClient.post<BaseResponseModel>(url, body);
  }

  readAllMessage(chatRoomId: string) {
    return this.apiClient.get<BaseResponseModel>(
      `chat-messages?chatRoomId=${chatRoomId}`
    );
  }
}
