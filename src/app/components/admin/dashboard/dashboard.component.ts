import { Component } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { YardModel } from '../../../model/yard.model';
import BaseResponseModel from '../../../model/base.response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { TimeSlotModel } from '../../../model/timeslot.model';
import { resourceLimits } from 'worker_threads';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { YardPriceByDateModel, YardPriceByDateResponseModel } from '../../../model/yardPriceByDateResponse.model';
import { YardPriceModel } from '../../../model/yardPrice.model';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listStatus = [
    { value: '0', viewValue: 'Tất cả ' },
    { value: '1', viewValue: 'Đã đặt ' },
    { value: '2', viewValue: 'Trống ' },
  ];
  public yardList: YardModel[] = [];
  public timeSlots: TimeSlotModel[] = [];
  public selectedTimeSlotID: any;
  public selectedStatus: any;
  public yardPriceList: any;
  public selectedYard: any;

  constructor(
    private adminService: AdminMainService,
    private bookingService: BookingMainService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.yardList = [];
    this.selectedStatus = '0';
    this.adminService.getYardList().subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.yardList = result.value.items as YardModel[];
        this.selectedYard = this.yardList[0]
      }
    })

    this.timeSlots = [];
    this.bookingService.getTimeSlot(0, 50).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.timeSlots = result.value.items as TimeSlotModel[];
        this.timeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
        this.timeSlots.forEach(slot => {
          slot.textModel = slot.startTime.slice(0, -3) + '-' + slot.endTime.slice(0, -3);
        })
        let currentTimeSlot = this.getCurrentTimeslot(this.timeSlots);
        this.selectedTimeSlotID = currentTimeSlot?.id;
      }
    });

    let date = new Date();
    date.setHours(date.getHours() + 8);
    let formattedDate = date.toISOString();
    this.bookingService
      .getYardByDate(`"${formattedDate}"`)
      .subscribe((result: YardPriceByDateResponseModel) => {
        this.yardPriceList = result.value;
      });
  }

  getCurrentTimeslot(timeslots: TimeSlotModel[]): TimeSlotModel | null {
    const currentTime = new Date();

    let nearestFutureTimeslot: TimeSlotModel | null = null;
    let minTimeDiff: number | null = null;

    for (const timeslot of timeslots) {
      const [startHours, startMinutes, startSeconds] = timeslot.startTime.split(':').map(Number);
      const [endHours, endMinutes, endSeconds] = timeslot.endTime.split(':').map(Number);

      const startTime = new Date();
      startTime.setHours(startHours, startMinutes, startSeconds);

      const endTime = new Date();
      endTime.setHours(endHours, endMinutes, endSeconds);

      if (currentTime >= startTime && currentTime <= endTime) {
        return timeslot;
      } else if (startTime > currentTime) {
        const timeDiff = startTime.getTime() - currentTime.getTime();
        if (minTimeDiff === null || timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          nearestFutureTimeslot = timeslot;
        }
      }
    }
    return nearestFutureTimeslot;
  }

  onFilterChange(newTimeSlot: any) {
    console.log('Selected Time Slot ID:', newTimeSlot);
    // Add your logic here
  }

  isBooked(yardPrice: YardPriceByDateModel) {

    if(yardPrice.yardPricesDetails == null) return false;
    let timeSlot = yardPrice.yardPricesDetails.filter( y => y.timeSlotId == this.selectedTimeSlotID);
    if(timeSlot.length > 0){
      if(timeSlot[0].isBooking == 1){
        return true
      }
    }
    return false;
  }

  onSelectYard(yardPrice: YardPriceByDateModel){
    this.selectedYard = yardPrice;
  }


  getBillByTimeSlot(){

  }

  isSelected(yardPrice:YardPriceByDateModel){
    if(this.selectedYard == null) return false
    if(this.selectedYard == yardPrice) return true;
    return false;
  }
}
