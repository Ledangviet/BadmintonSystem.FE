export class CategoryModel{
    name: string;
    id: string;
    services: ServiceModel[] = [];
    constructor(data: any){
        this.name = data.name;
        this.id = data.id;
    }
}


export class ServiceModel {
    name: string;
    purchasePrice: number;
    sellingPrice: number;
    quantityInStock: number;
    unit: string;
    categoryId: string;
    quantityPrinciple: any; // Adjust type as needed
    originalQuantityId: any; // Adjust type as needed
    createdDate: Date;
    modifiedDate: Date | null;
    createdBy: string;
    modifiedBy: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    id: string;

    constructor(data: any) {
        this.name = data.name;
        this.purchasePrice = data.purchasePrice;
        this.sellingPrice = data.sellingPrice;
        this.quantityInStock = data.quantityInStock;
        this.unit = data.unit;
        this.categoryId = data.categoryId;
        this.quantityPrinciple = data.quantityPrinciple;
        this.originalQuantityId = data.originalQuantityId;
        this.createdDate = new Date(data.createdDate);
        this.modifiedDate = data.modifiedDate ? new Date(data.modifiedDate) : null;
        this.createdBy = data.createdBy;
        this.modifiedBy = data.modifiedBy;
        this.isDeleted = data.isDeleted;
        this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        this.id = data.id;
    }
}

export class ServiceLineModel {
    serviceId: string;
    comboFixedId: string;
    quantity: number;
    totalPrice: number;
    billId: string;
    id: string;

    constructor(
        serviceId: string,
        comboFixedId: string,
        quantity: number,
        totalPrice: number,
        billId: string,
        id: string
    ) {
        this.serviceId = serviceId;
        this.comboFixedId = comboFixedId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.billId = billId;
        this.id = id;
    }
}

export class ServiceLineDetail {
    service: ServiceModel;
    serviceLine: ServiceLineModel;

    constructor(service: ServiceModel, serviceLine: ServiceLineModel) {
        this.service = service;
        this.serviceLine = serviceLine;
    }
}
