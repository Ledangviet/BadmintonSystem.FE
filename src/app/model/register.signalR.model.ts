export default class RegisterSignalRModel {
  email: string;
  isVerified: number;

  constructor(email: string, isVerified: number) {
    this.email = email;
    this.isVerified = isVerified;
  }
}
