export class BookModel {
    fullName: string;
    phoneNumber: string;
    percentPrePay: number;
    yardPriceIds: string[];
    tenant: string = '';
    email: string = 'ledangviet001@gmail.com'
  
    constructor(
      fullName: string,
      phoneNumber: string,
      percentPrePay: number,
      yardPriceIds: string[]
    ) {
      this.fullName = fullName;
      this.phoneNumber = phoneNumber;
      this.percentPrePay = percentPrePay;
      this.yardPriceIds = yardPriceIds;
    }
  }