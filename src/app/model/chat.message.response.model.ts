import BaseResponseModel from './base.response.model';
import UserResponseModel from './user.response.model';

export class ChatMessageModel {
  user: UserResponseModel | null;
  imageUrl: string;
  content: string;
  isAdmin: boolean;
  isRead: boolean;
  readDate: string;
  chatRoomId: string;
  createdDate: string;
  modifiedDate: string | null;
  createdBy: string;
  modifiedBy: string;
  isDeleted: boolean;
  deletedAt: string | null;
  id: string;

  constructor(
    user: UserResponseModel,
    imageUrl: string,
    content: string,
    isAdmin: boolean,
    isRead: boolean,
    readDate: string,
    chatRoomId: string,
    createdDate: string,
    modifiedDate: string | null,
    createdBy: string,
    modifiedBy: string,
    isDeleted: boolean,
    deletedAt: string | null,
    id: string
  ) {
    this.user = user;
    this.imageUrl = imageUrl;
    this.content = content;
    this.isAdmin = isAdmin;
    this.isRead = isRead;
    this.readDate = readDate;
    this.chatRoomId = chatRoomId;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.createdBy = createdBy;
    this.modifiedBy = modifiedBy;
    this.isDeleted = isDeleted;
    this.deletedAt = deletedAt;
    this.id = id;
  }
}

export class ChatMessageResponseModel extends BaseResponseModel {
  override value: ChatMessageModel[];

  constructor(data: any) {
    super(data);
    this.value = data.value;
  }
}
