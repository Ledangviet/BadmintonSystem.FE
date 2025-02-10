import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import RegisterSignalRModel from '../../model/register.signalR.model';
import { environment } from '../../../environments/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private hubConnection!: signalR.HubConnection;
  private messageSubject = new BehaviorSubject<RegisterSignalRModel | null>(
    null
  );
  public message$ = this.messageSubject.asObservable();
  private registerUrl: string = environment.registerHubUrl;

  constructor() {
    this.startConnection().catch((err) =>
      console.error('Error while starting connection:', err)
    );
  }

  public async startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.registerUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      console.log('WebSocket connected register');

      this.hubConnection.on(
        'ReceiveMessage',
        (message: RegisterSignalRModel) => {
          this.messageSubject.next(message);
        }
      );

      this.hubConnection.onclose(() => {
        console.log('Connection closed. Attempting to reconnect...');
        this.startConnection();
      });
    } catch (err) {
      console.error('WebSocket connection failed:', err);
      throw err;
    }
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('WebSocket disconnected'));
    }
  }
}
