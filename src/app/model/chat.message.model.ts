export default class ChatModel {
  imageUrl: string;
  content: string;
  userId: string;

  constructor(imageUrl: string, content: string, userId: string) {
    this.imageUrl = imageUrl;
    this.content = content;
    this.userId = userId;
  }
}
