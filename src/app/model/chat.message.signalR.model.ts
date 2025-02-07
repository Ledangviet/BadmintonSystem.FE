export default class ChatMessageSignalRModel {
  imageUrl: string;
  content: string;
  isAdmin: boolean;
  isRead: boolean;
  readDate: string;
  chatRoomId: string;
  createdDate: string;
  modifiedDate: string | null;
  createdBy: string;
  modifiedBy: string | null;
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
    modifiedBy: string | null,
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
