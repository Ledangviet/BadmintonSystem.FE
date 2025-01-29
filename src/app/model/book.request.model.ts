export class BookModel {
    fullName: string;
    phoneNumber: string;
    saleId: string | undefined;
    percentPrePay: number;
    yardPriceIds: string[];
  
    constructor(
      fullName: string,
      phoneNumber: string,
      saleId: string | undefined,
      percentPrePay: number,
      yardPriceIds: string[]
    ) {
      this.fullName = fullName;
      this.phoneNumber = phoneNumber;
      this.saleId = saleId;
      this.percentPrePay = percentPrePay;
      this.yardPriceIds = yardPriceIds;
    }
  }