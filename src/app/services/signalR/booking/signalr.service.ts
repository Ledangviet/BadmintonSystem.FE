import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import MessageResponseReserveModel from '../../../model/bookReserve.model';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubMessageConnection!: signalR.HubConnection;
  private hubPaymentConnection!: signalR.HubConnection;
  private messageSubject = new BehaviorSubject<MessageResponseReserveModel | null>(null);

  private paymentSubject = new BehaviorSubject<any>(null);
  public message$ = this.messageSubject.asObservable();
  public payment$ = this.paymentSubject.asObservable();

  constructor() { }

  bookingUrl: string = environment.bookingHubUrl;

  startConnection(accessToken: string): Promise<MessageResponseReserveModel> {
    return new Promise((resolve, reject) => {
      this.hubMessageConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.bookingUrl}?access_token=${accessToken}`, {
          skipNegotiation: true, // Sử dụng WebSocket trực tiếp
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect() // Tự động kết nối lại nếu bị mất
        .build();

      this.hubMessageConnection
        .start()
        .then(() => {
          console.log('WebSocket connected chat hub' );

          // Lắng nghe sự kiện 'ReceiveMessage'
          this.hubMessageConnection.on(
            'ReceiveMessage',
            (message: MessageResponseReserveModel) => {
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
    this.hubMessageConnection.stop().then(() => console.log('WebSocket disconnected'));
    this.hubPaymentConnection.stop().then(() => console.log('WebSocket disconnected'));
  }


  startPaymentConnection(accessToken: string): Promise<MessageResponseReserveModel> {
    return new Promise((resolve, reject) => {
      this.hubPaymentConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.paymentHubUrl}?access_token=${accessToken}`, {
          skipNegotiation: true, // Sử dụng WebSocket trực tiếp
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect() // Tự động kết nối lại nếu bị mất
        .build();

      this.hubPaymentConnection
        .start()
        .then(() => {
          console.log('WebSocket connected payment hub');

          // Lắng nghe sự kiện 'ReceiveMessage'
          this.hubPaymentConnection.on(
            'ReceiveMessage',
            (message: any) => {
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
}
