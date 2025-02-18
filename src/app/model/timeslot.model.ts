export class TimeSlotModel {
    id: string;
    startTime: string;
    endTime: string;
    textModel: string;

    constructor(id: string, startTime: string, endTime: string) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.textModel = this.startTime.slice(0, -3)+ '-' + this.endTime.slice(0, -3)
    }
 
    getStartTimeAsDate(): Date {
        return this.convertTimeToDate(this.startTime);
    }

    getEndTimeAsDate(): Date {
        return this.convertTimeToDate(this.endTime);
    }

    private convertTimeToDate(time: string): Date {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
}