export default class UserResponseModel {
  userName: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: number;
  avatarUrl: string;
  id: string;

  constructor(
    userName: string,
    email: string,
    fullName: string,
    dateOfBirth: string,
    phoneNumber: string,
    gender: number,
    avatarUrl: string,
    id: string
  ) {
    this.userName = userName;
    this.email = email;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.avatarUrl = avatarUrl;
    this.id = id;
  }
}
