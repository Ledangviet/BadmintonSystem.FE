
 export class AddServiceRequestModel {
    quantityInStock: number;
    categoryId: string;
    isWholeSale: number;
    serviceDetails: {
      name: string;
      purchasePrice: number;
      sellingPrice: number;
      unit: string;
      quantityPrinciple: number;
    }[];
  
    constructor(
      quantityInStock: number,
      categoryId: string,
      isWholeSale: number,
      serviceDetails: {
        name: string;
        purchasePrice: number;
        sellingPrice: number;
        unit: string;
        quantityPrinciple: number;
      }[]
    ) {
      this.quantityInStock = quantityInStock;
      this.categoryId = categoryId;
      this.isWholeSale = isWholeSale;
      this.serviceDetails = serviceDetails;
    }
  }