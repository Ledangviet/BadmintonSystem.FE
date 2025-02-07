import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import ChatMessageSignalRModel from '../../../model/chat.message.signalR.model';

@Injectable({
  providedIn: 'root',
})
export class SignalRChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSubject = new BehaviorSubject<ChatMessageSignalRModel | null>(
    null
  );
  public message$ = this.messageSubject.asObservable();

  constructor() {}

  chatUrl: string = environment.chatHubUrl;

  startConnection(accessToken: string): Promise<ChatMessageSignalRModel> {
    return new Promise((resolve, reject) => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.chatUrl}?access_token=${accessToken}`, {
          skipNegotiation: true, // Sử dụng WebSocket trực tiếp
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect() // Tự động kết nối lại nếu bị mất
        .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('WebSocket connected');

          // Lắng nghe sự kiện 'ReceiveMessage'
          this.hubConnection.on(
            'ReceiveMessage',
            (message: ChatMessageSignalRModel) => {
              this.messageSubject.next(message); // Cập nhật tin nhắn mới
              resolve(message); // Resolve promise với tin nhắn nhận được
            }
          );
        })
        .catch((err) => {
          console.error('WebSocket connection failed:', err);
          reject(err); // Reject promise nếu có lỗi
        });
    });
  }

  stopConnection(): void {
    this.hubConnection.stop().then(() => console.log('WebSocket disconnected'));
  }
}
