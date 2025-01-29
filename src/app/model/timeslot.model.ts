export class TimeSlotModel {
    id: string;
    startTime: string;
    endTime: string;

    constructor(id: string, startTime: string, endTime: string) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
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