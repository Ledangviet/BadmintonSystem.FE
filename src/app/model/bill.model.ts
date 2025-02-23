import { ServiceLineDetail } from "./service.model";

export class BookingLine {
    yardName: string;
    startTime: string;
    endTime: string;
    price: number;

    constructor(yardName: string, startTime: string, endTime: string, price: number) {
        this.yardName = yardName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
    }
}

export class User {
    fullName: string;
    phoneNumber: string;

    constructor(fullName: string, phoneNumber: string) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
    }
}

export class Booking {
    effectiveDate: Date;
    user: User;
    bookingLines: BookingLine[];
    bookingDate: Date;
    bookingTotal: number;
    originalPrice: number;
    userId: string;
    saleId: string;
    bookingStatus: number;
    paymentStatus: number;
    fullName: string;
    phoneNumber: string;
    id: string;

    constructor(
        effectiveDate: Date,
        user: User,
        bookingLines: BookingLine[],
        bookingDate: Date,
        bookingTotal: number,
        originalPrice: number,
        userId: string,
        saleId: string,
        bookingStatus: number,
        paymentStatus: number,
        fullName: string,
        phoneNumber: string,
        id: string
    ) {
        this.effectiveDate = effectiveDate;
        this.user = user;
        this.bookingLines = bookingLines;
        this.bookingDate = bookingDate;
        this.bookingTotal = bookingTotal;
        this.originalPrice = originalPrice;
        this.userId = userId;
        this.saleId = saleId;
        this.bookingStatus = bookingStatus;
        this.paymentStatus = paymentStatus;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.id = id;
    }
}

export class BillModel {
    booking: Booking;
    billLineDetails: any;
    serviceLineDetails: ServiceLineDetail[] = []
    totalPriceByRangeDate: number;
    totalPrice: number;
    totalPayment: number;
    content: string | null;
    name: string;
    userId: string;
    bookingId: string;
    status: number;
    createdDate: Date;
    modifiedDate: Date | null;
    createdBy: string;
    modifiedBy: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    id: string;

    constructor(
        booking: Booking,
        billLineDetails: any,
        serviceLineDetails: any,
        totalPriceByRangeDate: number,
        totalPrice: number,
        totalPayment: number,
        content: string | null,
        name: string,
        userId: string,
        bookingId: string,
        status: number,
        createdDate: Date,
        modifiedDate: Date | null,
        createdBy: string,
        modifiedBy: string | null,
        isDeleted: boolean,
        deletedAt: Date | null,
        id: string
    ) {
        this.booking = booking;
        this.billLineDetails = billLineDetails;
        this.serviceLineDetails = serviceLineDetails;
        this.totalPriceByRangeDate = totalPriceByRangeDate;
        this.totalPrice = totalPrice;
        this.totalPayment = totalPayment;
        this.content = content;
        this.name = name;
        this.userId = userId;
        this.bookingId = bookingId;
        this.status = status;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
        this.isDeleted = isDeleted;
        this.deletedAt = deletedAt;
        this.id = id;
    }
}