import { YardPriceModel } from "./yardPrice.model";

export class YardModel {
    name: string;
    yardTypeId: string;
    isStatus: number;
    createdDate: string;
    modifiedDate?: string | null;
    createdBy: string;
    modifiedBy?: string | null;
    isDeleted: boolean;
    deletedAt?: string | null;
    id: string;
    yardPriceList: YardPriceModel[];
    constructor(
        name: string,
        yardTypeId: string,
        isStatus: number,
        createdDate: string,
        createdBy: string,
        isDeleted: boolean,
        id: string,
        modifiedDate?: string | null,
        modifiedBy?: string | null,
        deletedAt?: string | null
    ) {
        this.name = name;
        this.yardTypeId = yardTypeId;
        this.isStatus = isStatus;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
        this.isDeleted = isDeleted;
        this.deletedAt = deletedAt;
        this.id = id;
        this.yardPriceList = [];
    }
}