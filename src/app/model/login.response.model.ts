import BaseResponseModel from './base.response.model';

export default class LoginResponseModel extends BaseResponseModel {
  value: {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiryTime: string;
    user: {
      userName: string;
      email: string;
      fullName: string;
      dateOfBirth: string;
      phoneNumber: string;
      gender: number;
      avatarUrl: string;
      id: string;
    };
    roles: any;
    authorizations: any;
  };

  constructor(data: any) {
    super(data);
    this.value = data.value;
  }
}