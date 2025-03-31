export default class ChatModel {
  imageUrl: string;
  content: string;
  userId: string;
  isAdmin: boolean;

  constructor(
    imageUrl: string,
    content: string,
    userId: string,
    isAdmin: boolean
  ) {
    this.imageUrl = imageUrl;
    this.content = content;
    this.userId = userId;
    this.isAdmin = isAdmin;
  }
}
