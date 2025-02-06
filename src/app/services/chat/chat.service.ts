import { Injectable } from '@angular/core';
import { ApiClientService } from '../shared/api-client.service';
import { Observable } from 'rxjs';
import BaseResponseModel from '../../model/base.response.model';
import { ChatMessageResponseModel } from '../../model/chat.message.response.model';
import ChatModel from '../../model/chat.message.model';
import { ChatRoomResponseModel } from '../../model/chat.room.response';

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
      appRoleType: 3,
    };
    let url = `chat-rooms/filter-and-sort?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.apiClient.post<BaseResponseModel>(url, body);
  }

  getChatMessageList(
    pageIndex: number,
    pageSize: number
  ): Observable<BaseResponseModel> {
    let url = `users/chat-message?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.apiClient.get<BaseResponseModel>(url);
  }

  sendMessage(model: ChatModel) {
    return this.apiClient.post<BaseResponseModel>(`chat-message`, model);
  }
}
