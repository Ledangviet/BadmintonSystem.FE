import { EventEmitter, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import LoginResponseModel from '../../model/login.response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string = "";
  public isAuthenticated = false;
  public loginStateChangeEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private apiClient: ApiClientService
  ) { }

  public getUserInfo() {
  }

  getIsAuthenticated(): boolean {

    return Boolean(localStorage.getItem("isAuthenticated"));
  }

  login(email: string, passWord: string) {
    this.apiClient.post<LoginResponseModel>("users/login", { email: email, password: passWord }).subscribe((response) => {
      if (response) {
        if (response.isSuccess) {
          localStorage.setItem("isAuthenticated", "true");
          this.loginStateChangeEmitter.emit(true);
        }
      }
    });
  }

  logout() {
    localStorage.setItem("isAuthenticated", "false");
    this.loginStateChangeEmitter.emit(false);
  }
}
