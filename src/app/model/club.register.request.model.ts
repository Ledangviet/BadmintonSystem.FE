export class ClubRegisterRequestModel {
    clubInformation: {
        facebookPageLink: string;
        instagramLink: string;
        mapLink: string;
        clubId: string;
    };
    clubImages: Array<{
        imageLink: string;
        clubId: string;
    }>;
    clubAddress: {
        unit: string;
        street: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        province: string;
    };
    name: string;
    hotline: string;
    openingTime: string;
    closingTime: string;
    code: string;
    id: string = "";

    constructor(data: any) {
        this.clubInformation = data.clubInformation;
        this.clubImages = data.clubImages;
        this.clubAddress = data.clubAddress;
        this.name = data.name;
        this.hotline = data.hotline;
        this.openingTime = data.openingTime;
        this.closingTime = data.closingTime;
        this.code = data.code;
    }
}