export class ChatRoomRequest {
  appRoleType: number;
  userId: string;
  userName: string;
  email: string;
  avatar: string;
  constructor(
    appRoleType: number,
    userId: string,
    userName: string,
    email: string,
    avatar: string
  ) {
    this.appRoleType = appRoleType;
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this.avatar = avatar;
  }
}
