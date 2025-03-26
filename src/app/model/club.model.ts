 export class ClubModel {
    id: string;
    name: string;
    hotline: string;
    openingTime: string;
    closingTime: string;
    code: string;
    clubInformation: ClubInformationModel;
    clubImages: ImageModel[];
    clubAddress: AddressModel;
    reviews: ReviewModel[];

    constructor(id: string, name: string, hotline: string, openingTime: string, closingTime: string, code: string, clubInformation: ClubInformationModel, clubImages: ImageModel[], clubAddress: AddressModel, reviews: ReviewModel[]) {
        this.id = id;
        this.name = name;
        this.hotline = hotline;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.code = code;
        this.clubInformation = clubInformation;
        this.clubImages = clubImages;
        this.clubAddress = clubAddress;
        this.reviews = reviews;
    }
}

export class ReviewModel {
    id: string;
    comment: string;
    ratingValue: number;
    userId: string;
    clubId: string;
    reviewImages: ImageModel[];
    createdDate: Date;
    modifiedDate: Date | null;
    createdBy: string;
    modifiedBy: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;

    constructor(id: string, comment: string, ratingValue: number, userId: string, clubId: string, reviewImages: ImageModel[], createdDate: Date, modifiedDate: Date | null, createdBy: string, modifiedBy: string | null, isDeleted: boolean, deletedAt: Date | null) {
        this.id = id;
        this.comment = comment;
        this.ratingValue = ratingValue;
        this.userId = userId;
        this.clubId = clubId;
        this.reviewImages = reviewImages;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
        this.isDeleted = isDeleted;
        this.deletedAt = deletedAt;
    }
}

export class ImageModel {
    id: string;
    imageLink: string;
    reviewId: string;

    constructor(id: string, imageLink: string, reviewId: string) {
        this.id = id;
        this.imageLink = imageLink;
        this.reviewId = reviewId;
    }
}

export class ClubInformationModel {
    id: string;
    facebookPageLink: string;
    instagramLink: string;
    mapLink: string;

    constructor(id: string, facebookPageLink: string, instagramLink: string, mapLink: string) {
        this.id = id;
        this.facebookPageLink = facebookPageLink;
        this.instagramLink = instagramLink;
        this.mapLink = mapLink;
    }
}

export class AddressModel {
    unit: string;
    street: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    id: string;

    constructor(unit: string, street: string, addressLine1: string, addressLine2: string, city: string, province: string, id: string) {
        this.unit = unit;
        this.street = street;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.province = province;
        this.id = id;
    }
}