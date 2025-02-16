export class YardTableDataModel {
    name: string;
    type: string;
    status: string;
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
    modifiedBy: string;

    constructor(
        name: string,
        type: string,
        status: string,
        createdDate: string,
        modifiedDate: string,
        createdBy: string,
        modifiedBy: string
    ) {
        this.name = name;
        this.type = type;
        this.status = status;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
    }
}