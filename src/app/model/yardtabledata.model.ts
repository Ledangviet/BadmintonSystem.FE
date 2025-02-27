export class YardTableDataModel {
    id: string;
    name: string;
    type: string;
    status: boolean;
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
    modifiedBy: string;

    constructor(
        name: string,
        type: string,
        status: boolean,
        createdDate: string,
        modifiedDate: string,
        createdBy: string,
        modifiedBy: string,
        id: string
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
    }
}