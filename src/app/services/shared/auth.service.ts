import { EventEmitter, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import LoginResponseModel from '../../model/login.response.model';
import { Observable } from 'rxjs';
import RegisterModel from '../../model/register.model';
import RegisterResponseModel from '../../model/register.response.model';
import e from 'express';
import BaseResponseModel from '../../model/base.response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string = '';
  public isAuthenticated = false;
  public loginStateChangeEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private apiClient: ApiClientService) {}

  public getUserInfo() {}

  getIsAuthenticated(): boolean {
    let isAuthen = localStorage.getItem('isAuthenticated');
    let expiredTime = localStorage.getItem('expiredTime');
    if (isAuthen && expiredTime) {
      let expiredTimeNumber = Number(expiredTime);
      if (expiredTimeNumber < Date.now()) {
        isAuthen = 'false';
        localStorage.setItem('accessToken', '');
        localStorage.setItem('isAuthenticated', 'false');
      }
    }
    return Boolean(isAuthen);
  }

  login(email: string, passWord: string) {
    return this.apiClient.postNoHeader<LoginResponseModel>('users/login', {
      email: email,
      password: passWord,
    });
  }

  logout() {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('isAuthenticated', 'false');
    this.loginStateChangeEmitter.emit(false);
  }

  register(registerModel: RegisterModel): Observable<RegisterResponseModel> {
    return this.apiClient.post<RegisterResponseModel>(
      'users/register',
      registerModel
    );
  }

  cancelRegister(email: string): Observable<BaseResponseModel> {
    return this.apiClient.get<BaseResponseModel>(
      `users/cancel-verify-email?email=${email}`
    );
  }

  userDetail(email: string | undefined): Observable<LoginResponseModel> {
    if (!email) {
      throw new Error('Email is required');
    }
    return this.apiClient.postNoHeader<LoginResponseModel>(
      'auths/admin/email/get-authorization',
      { email: email }
    );
  }
}
