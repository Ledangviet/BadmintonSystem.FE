export default class MessageResponseReserveModel {
  ids: string[];
  type: string;

  constructor(data: any) {
    this.ids = data.ids;
    this.type = data.type;
  }
}
