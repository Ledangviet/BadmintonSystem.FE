import { EventEmitter, Injectable } from '@angular/core';
import { ApiClientService } from '../shared/api-client.service';
import { Observable } from 'rxjs';
import BaseResponseModel from '../../model/base.response.model';
import { YardPriceByDateResponseModel } from '../../model/yardPriceByDateResponse.model';
import { YardPriceModel } from '../../model/yardPrice.model';
import { BookModel } from '../../model/book.request.model';

@Injectable({
  providedIn: 'root',
})
export class BookingMainService {
  totalPrice = 0;
  selectedDate = new Date();
  selectedYardPrice: YardPriceModel[] = [];
  selectedYardPriceChangeEmitter = new EventEmitter();
  clearSelectedEmitter = new EventEmitter();
  accessToken = localStorage.getItem('accessToken')?.toString();
  constructor(private apiClient: ApiClientService) {}

  getYardList(
    pageIndex: number,
    pageSize: number
  ): Observable<BaseResponseModel> {
    let url = `yards/filter-and-sort?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.apiClient.get<BaseResponseModel>(url);
  }

  getTimeSlot(pageIndex: number, pageSize: number) {
    let url = `time-slots/filter-and-sort?PageIndex=${pageIndex}&PageSize=${pageSize}`;
    return this.apiClient.get<BaseResponseModel>(url);
  }

  getYardByDate(date: string) {
    let url = `yard-prices/filter-by-date`;
    return this.apiClient.post<YardPriceByDateResponseModel>(url, date);
  }

  bookingReserve(id: string, type: string) {
    let url = `bookings/reserve/${id}`;

    var body = {
      type: type,
      isToken: this.accessToken ? this.accessToken : '',
    };
    return this.apiClient.put(url, body);
  }

  clearSelected() {
    this.selectedYardPrice = [];
    this.selectedYardPriceChangeEmitter.emit();
  }

  removeSelectedYardPrice(detail: YardPriceModel) {
    this.selectedYardPrice = this.selectedYardPrice.filter(
      (y) => y.id != detail.id
    );
    this.selectedYardPriceChangeEmitter.emit();
  }

  book(model: BookModel) {
    console.log(model);
    return this.apiClient.post<BaseResponseModel>(
      `bookings/create-rabbitmq`,
      model
    );
  }

  checkOut(orderId: string, amount: string, orderInfo: string) {
    return this.apiClient.post<BaseResponseModel>(
      `payment`,
      {
        orderId: orderId,
        amount: amount,
        orderInfo: orderInfo
      }
    );
  }
}
