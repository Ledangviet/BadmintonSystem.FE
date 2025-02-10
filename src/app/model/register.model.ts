import e from 'express';

export default class RegisterModel {
  constructor(
    email: string,
    password: string,
    phoneNumber: string,
    gender: number
  ) {
    this.email = email;
    this.userName = email;
    this.firstName = 'string';
    this.lastName = 'string';
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
  }
  unit: string = '';
  street: string = '';
  adressLine1: string = '';
  adressLine2: string = '';
  city: string = '';
  province: string = '';
  userName: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  phoneNumber: string = '';
  gender: number = 1;
  avatarUrl: string = '';
}
