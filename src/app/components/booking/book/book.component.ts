import { Component } from '@angular/core';
import { AuthService } from '../../../services/shared/auth.service';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { YardModel } from '../../../model/yard.model';
import BaseResponseModel from '../../../model/base.response.model';
import { TimeSlotModel } from '../../../model/timeslot.model';
import {
  YardPriceByDateModel,
  YardPriceByDateResponseModel,
} from '../../../model/yardPriceByDateResponse.model';
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
import { ResourceService } from '../../../services/shared/resource.service';
import { SignalRService } from '../../../services/signalR/booking/signalr.service';

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
  styleUrl: './book.component.scss',
})
export class BookComponent {
  yardList: YardModel[] = [];
  timeSlots: TimeSlotModel[] = [];
  yardPriceList: any;
  selectedTimeform: FormGroup;
  minDate = new Date();
  selectedDate: Date = new Date();
  accessToken = localStorage.getItem('accessToken')?.toString();

  get anyPriceSelected() {
    return this.bookingService.selectedYardPrice.length > 0;
  }
  constructor(
    private authService: AuthService,
    private bookingService: BookingMainService,
    private fb: FormBuilder,
    private router: Router,
    private resourceService: ResourceService,
    private signalRService: SignalRService
  ) {
    this.selectedTimeform = this.fb.group({
      dateTime: [this.selectedDate],
    });
  }

  ngOnInit() {
    // Handler SignalR
    if (this.accessToken) {
      this.signalRService
        .startConnection(this.accessToken)
        .then(() => {
          this.signalRService.message$.subscribe((message) => {
            if (!message) return;
            const yardPrice = this.yardPriceList.find(
              (item: YardPriceByDateModel) =>
                item.yardPricesDetails.some(
                  (x: YardPriceModel) => x.id === message.ids[0]
                )
            );

            if (!yardPrice) return;
            const yardPriceDetail = yardPrice.yardPricesDetails.find(
              (x: YardPriceModel) => x.id === message.ids[0]
            );

            if (!yardPriceDetail) return;
            const index =
              this.bookingService.selectedYardPrice.indexOf(yardPriceDetail);
            if (message.type === 'RESERVED' && index === -1) {
              this.bookingService.selectedYardPrice.push(yardPriceDetail);
            } else if (message.type === 'UNBOOKED' && index > -1) {
              this.bookingService.selectedYardPrice.splice(index, 1);
            }
          });
        })
        .catch((err) => {
          console.error('SignalR connection failed:', err);
        });
    }

    this.bookingService.clearSelected();
    this.bookingService
      .getYardList(0, 10)
      .subscribe((result: BaseResponseModel) => {
        if (result.isSuccess) {
          this.yardList = result.value.items as YardModel[];
        }
      });

    this.bookingService
      .getTimeSlot(0, 30)
      .subscribe((result: BaseResponseModel) => {
        if (result.isSuccess) {
          this.timeSlots = result.value.items as TimeSlotModel[];
          this.timeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
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

    this.selectedTimeform.get('dateTime')?.valueChanges.subscribe(() => {
      this.bookingService.clearSelected();
      let value = this.selectedTimeform.get('dateTime')?.value;
      if (value) {
        this.selectedDate = value;
        this.bookingService.selectedDate = this.selectedDate;
        let date = new Date(value);
        date.setHours(date.getHours() + 8);
        let formattedDate = date.toISOString();
        this.bookingService
          .getYardByDate(`"${formattedDate}"`)
          .subscribe((result: YardPriceByDateResponseModel) => {
            this.yardPriceList = result.value;
          });
      }
    });

    this.UIResource = this.resourceService.getResource(this.UIResource);
  }

  public UIResource = {
    bookBanner: 'Đặt sân theo giờ',
    fixPhone: '0353921582',
    fixBooking: 'Để đặt lịch cố định vui lòng gọi :',
    selectDate: 'Chọn ngày :',
    court: 'Sân',
    clearAll: 'Bỏ chọn',
    checkOut: 'Thanh Toán',
    yourSelected: 'Đã chọn :',
  };

  onSelectTimeSlot(detail: YardPriceModel) {
    if (!this.isAvailable(detail)) return;
    const index = this.bookingService.selectedYardPrice.indexOf(detail);
    if (index > -1) {
      this.bookingService.selectedYardPrice.splice(index, 1);
      this.bookingService.bookingReserve(detail.id, 'UNBOOKED').subscribe();
    } else {
      if (this.accessToken) {
        detail.isToken = this.accessToken;
      }

      this.bookingService.selectedYardPrice.push(detail);
      this.bookingService.bookingReserve(detail.id, 'RESERVED').subscribe();
    }
    this.bookingService.selectedYardPriceChangeEmitter.emit();
  }

  isSelected(detail: YardPriceModel) {
    if (
      this.bookingService.selectedYardPrice.includes(detail) &&
      detail.isToken === this.accessToken
    ) {
      return true;
    }
    return false;
  }

  isReserved(detail: YardPriceModel) {
    if (
      this.bookingService.selectedYardPrice.includes(detail) &&
      detail.isToken !== this.accessToken
    ) {
      return true;
    }
    return false;
  }

  isBooked(detail: YardPriceModel) {
    //console.log(detail.startTime + 'and' + detail.isBooking);

    if (detail.isBooking !== 0) {
      return true;
    }
    return false;
  }

  isAvailable(detail: YardPriceModel) {
    if (this.isReserved(detail)) return false;
    if (detail.isBooking) return false;
    let time = detail.startTime;
    let currentTime = new Date();
    const [startHour, startMinute, startSecond] = time.split(':').map(Number);
    const startTime = this.selectedDate;
    startTime.setHours(startHour, startMinute, startSecond, 0);

    return startTime > currentTime;
  }

  onCheckOut() {
    this.router.navigate(['/checkout']);
  }

  onClearAll() {
    this.bookingService.clearSelected();
  }
}
