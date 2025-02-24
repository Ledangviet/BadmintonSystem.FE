import { Injectable } from '@angular/core';
import { ApiClientService } from '../shared/api-client.service';
import { Observable } from 'rxjs';
import BaseResponseModel from '../../model/base.response.model';
import ChatModel from '../../model/chat.message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private apiClient: ApiClientService) {}

  getChatRoomByAdminList(
    pageIndex: number,
    pageSize: number
  ): Observable<BaseResponseModel> {
    var body = {
      appRoleType: 0,
    };
    let url = `chat-rooms/filter-and-sort?PageIndex=${pageIndex}&PageSize=${pageSize}`;
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
    return this.apiClient.post<BaseResponseModel>(`chat-messages`, model);
  }

  readAllMessage(chatRoomId: string) {
    return this.apiClient.get<BaseResponseModel>(
      `chat-messages?chatRoomId=${chatRoomId}`
    );
  }
}
