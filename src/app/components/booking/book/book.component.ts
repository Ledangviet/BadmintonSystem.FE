import { Component } from '@angular/core';
import { AuthService } from '../../../services/shared/auth.service';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { YardModel } from '../../../model/yard.model';
import BaseResponseModel from '../../../model/base.response.model';
import { TimeSlotModel } from '../../../model/timeslot.model';
import { YardPriceByDateResponseModel } from '../../../model/yardPriceByDateResponse.model';
import { YardPriceModel } from '../../../model/yardPrice.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,   
    BookingDetailComponent,
    MatButtonModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  yardList: YardModel[] = [];
  timeSlots: TimeSlotModel[] = [];
  yardPriceList: any;
  selectedTimeform: FormGroup;
  minDate = new Date();
  selectedDate: Date = new Date();

  get anyPriceSelected(){
    return this.bookingService.selectedYardPrice.length > 0;
  }
  constructor(
    private authService: AuthService,
    private bookingService: BookingMainService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.selectedTimeform = this.fb.group({
      dateTime: [this.selectedDate]
    });
  }

  ngOnInit() {

    this.bookingService.clearSelected();
    this.bookingService.getYardList(0, 10).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.yardList = result.value.items as YardModel[];
      }
    });

    this.bookingService.getTimeSlot(0, 30).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.timeSlots = result.value.items as TimeSlotModel[];
        this.timeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
      }
    })

    let date = new Date();
    let formattedDate = date.toISOString();
    this.bookingService.getYardByDate(`"${formattedDate}"`).subscribe((result: YardPriceByDateResponseModel) => {
      this.yardPriceList = result.value;
    })

    this.selectedTimeform.get('dateTime')?.valueChanges.subscribe( () =>{
      this.bookingService.clearSelected();
        let value = this.selectedTimeform.get('dateTime')?.value;
        if(value){
          this.selectedDate = value;
          this.bookingService.selectedDate = this.selectedDate;
        }
    })

  }


  public UIResource = {
  }

  


  onSelectTimeSlot(detail: YardPriceModel) {

    if(!this.isAvailable(detail)) return;
    const index = this.bookingService.selectedYardPrice.indexOf(detail);
    if (index > -1) {
      this.bookingService.selectedYardPrice.splice(index, 1);
    }
    else {
      this.bookingService.selectedYardPrice.push(detail);
    }
    this.bookingService.selectedYardPriceChangeEmitter.emit();
  }

  isSelected(detail: YardPriceModel) {
    if (this.bookingService.selectedYardPrice.includes(detail)) {
      return true;
    }
    return false;
  }

  isBooked(detail: YardPriceModel){
    if (detail.isBooking !== 0) {
      return true;
    }
    return false;
  }

  isAvailable(detail: YardPriceModel){
    let time = detail.startTime;

    let currentTime = new Date();

    const [startHour, startMinute, startSecond] = time.split(':').map(Number);
    const startTime = this.selectedDate;
    startTime.setHours(startHour, startMinute, startSecond, 0);

    return startTime > currentTime;
  }

  onCheckOut(){
  this.router.navigate(['/checkout']);
  }

  onClearAll(){
    this.bookingService.clearSelected();
  }

}
