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
import { ChatComponent } from '../../shared/chat/chat.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    ChatComponent,
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
    const selected = this.bookingService.selectedYardPrice.filter(
      (x: YardPriceModel) => x.isToken === this.accessToken
    );
    return selected.length > 0;
  }
  constructor(
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
            const yardPriceDetails: YardPriceModel[] = [];
            if (!message) return;
            this.yardPriceList.filter((item: YardPriceByDateModel) =>
              item.yardPricesDetails.some((x: YardPriceModel) => {
                if (message.ids.includes(x.id)) {
                  yardPriceDetails.push(x);
                }
              })
            );

            if (yardPriceDetails.length <= 0) return;
            if (message?.type === 'BOOKED') {
              this.handlerBookedSignalR(yardPriceDetails);
            } else {
              this.handlerReserveSignalR(yardPriceDetails, message.type);
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
        this.yardPriceList.filter((item: YardPriceByDateModel) => {
          item.yardPricesDetails.some((x: YardPriceModel) => {
            if (x.isBooking === 2) {
              this.bookingService.selectedYardPrice.push(x);
              this.bookingService.selectedYardPriceChangeEmitter.emit();
            }
          });
        });
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
    const isUnbooked = index > -1;
    const action = isUnbooked ? 'UNBOOKED' : 'RESERVED';
    detail.isToken = isUnbooked ? '' : this.accessToken ? this.accessToken : '';
    if (isUnbooked) {
      detail.isBooking = detail.isBooking === 2 ? 0 : detail.isBooking;
      this.bookingService.selectedYardPrice.splice(index, 1);
    } else {
      this.bookingService.selectedYardPrice.push(detail);
    }
    this.bookingService.bookingReserve(detail.id, action).subscribe();
    this.bookingService.selectedYardPriceChangeEmitter.emit();
  }

  isSelected(detail: YardPriceModel) {
    if (detail.isToken === this.accessToken) {
      return true;
    }
    return false;
  }

  isReserved(detail: YardPriceModel) {
    if (
      (this.bookingService.selectedYardPrice.includes(detail) &&
        detail.isToken !== this.accessToken) ||
      (detail.isBooking === 2 && detail.isToken !== this.accessToken)
    ) {
      return true;
    }
    return false;
  }

  isBooked(detail: YardPriceModel) {
    if (detail.isBooking === 1) {
      return true;
    }
    return false;
  }

  isAvailable(detail: YardPriceModel) {
    if (this.isReserved(detail)) return false;
    if (this.isBooked(detail)) return false;
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

  handlerBookedSignalR(yardPriceDetails: any) {
    yardPriceDetails.forEach((item: YardPriceModel) => {
      const index = this.bookingService.selectedYardPrice.indexOf(item);
      item.isBooking = 1;
      if (index > -1) {
        this.bookingService.selectedYardPrice.splice(index, 1);
      }
      this.bookingService.selectedYardPrice.push(item);
    });
  }

  handlerReserveSignalR(yardPriceDetails: any, type: string) {
    yardPriceDetails.forEach((item: YardPriceModel) => {
      const index = this.bookingService.selectedYardPrice.indexOf(item);
      const isUnbooked = type === 'UNBOOKED';
      const isIndex = index > -1;
      if (isUnbooked) {
        item.isToken = '';
        item.isBooking = 0;
        if (isIndex) this.bookingService.selectedYardPrice.splice(index, 1);
        this.bookingService.removeSelectedYardPrice(item);
      } else {
        if (!isIndex) this.bookingService.selectedYardPrice.push(item);
      }
    });
  }
}
