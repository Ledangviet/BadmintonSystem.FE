import { Injectable } from '@angular/core';
import { ApiClientService } from './shared/api-client.service';
import { environment } from '../../environments/environment';
import { sensitiveHeaders } from 'http2';
import BaseResponseModel from '../model/base.response.model';


interface ChatBotResponseModel{
  name: string;
  question: string;
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
public chatList: ChatBotResponseModel[] = [];


  constructor(
    private apiClient: ApiClientService,
  ) { }

  sendMesage(message: string,sender: string) {
    return this.apiClient.postFullUrl(environment.chatBotUrl, { sender: sender, message: message });
  }
}
