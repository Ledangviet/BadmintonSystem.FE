import { Injectable } from '@angular/core';
import { ApiClientService } from './shared/api-client.service';


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

  getAnswer(message: string) {
    return this.apiClient.post('/chatbot', { message });
  }
}
