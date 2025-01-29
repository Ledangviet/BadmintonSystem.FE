export class YardPriceModel{
    startTime: string;
    endTime: string;
    price: number;
    yardId: string;
    priceId: string;
    timeSlotId: string;
    effectiveDate: string;
    isBooking: number;
    id: string;

    constructor(
        startTime: string,
        endTime: string,
        price: number,
        yardId: string,
        priceId: string,
        timeSlotId: string,
        effectiveDate: string,
        isBooking: number,
        id: string
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.yardId = yardId;
        this.priceId = priceId;
        this.timeSlotId = timeSlotId;
        this.effectiveDate = effectiveDate;
        this.isBooking = isBooking;
        this.id = id;
    }
}