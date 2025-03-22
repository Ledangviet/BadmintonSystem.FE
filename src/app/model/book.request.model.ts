export class BookModel {
    fullName: string;
    phoneNumber: string;
    saleId: string | undefined;
    percentPrePay: number;
    yardPriceIds: string[];
    tenant: string = '200325_KJJ2ASOJ';
    email: string = 'ledangviet1998@gmail.com'
  
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