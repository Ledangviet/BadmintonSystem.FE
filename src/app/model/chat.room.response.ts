import BaseResponseModel from './base.response.model';
import UserResponseModel from './user.response.model';

export class ChatMessageDetailModel {
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

export class ChatRoomModel {
  user: UserResponseModel;
  chatMessage: ChatMessageDetailModel;
  userId: string;
  createdDate: string;
  modifiedDate: string | null;
  createdBy: string;
  modifiedBy: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  id: string;

  constructor(
    user: UserResponseModel,
    chatMessage: ChatMessageDetailModel,
    userId: string,
    createdDate: string,
    modifiedDate: string | null,
    createdBy: string,
    modifiedBy: string,
    isDeleted: boolean,
    deletedAt: string | null,
    id: string
  ) {
    this.user = user;
    this.chatMessage = chatMessage;
    this.userId = userId;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.createdBy = createdBy;
    this.modifiedBy = modifiedBy;
    this.isDeleted = isDeleted;
    this.deletedAt = deletedAt;
    this.id = id;
  }
}

export class ChatRoomResponseModel extends BaseResponseModel {
  override value: ChatRoomModel[];

  constructor(data: any) {
    super(data);
    this.value = data.value;
  }
}
