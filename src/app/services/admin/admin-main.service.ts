import { Injectable } from '@angular/core';
import { BookingMainService } from '../booking/booking-main.service';
import { ApiClientService } from '../shared/api-client.service';
import { YardModel } from '../../model/yard.model';
import BaseResponseModel from '../../model/base.response.model';
import { BillModel } from '../../model/bill.model';
import { ServiceModel } from '../../model/service.model';
import { AddServiceRequestModel } from '../../model/addservice.request.model';

@Injectable({
  providedIn: 'root'
})
export class AdminMainService {

  constructor(
    private bookingService: BookingMainService,
    private apiClient: ApiClientService
  ) { }

  getYardList(){
    return this.bookingService.getYardList(0,50);
  }

  getYardTypeById(id: string){
    let url = `yard-types/${id}`
    return this.apiClient.get<BaseResponseModel>(url);
  }

  getYardTypeList(pageSize: number,index: number){
    let url = `yard-types/filter-and-sort?PageIndex=${index}&PageSize=${pageSize}`
    return this.apiClient.get<BaseResponseModel>(url);
  }

  getBillList(startDate: string, endDate: string){
    let url = `bills/filter-and-sort-value?PageIndex=0&PageSize=50`;
    return this.apiClient.post<BaseResponseModel>(url,{startDate: startDate, endDate: endDate});
  }

  getBookingByID(id: string){
    let url = `bookings/${id}`
    return this.apiClient.get<BaseResponseModel>(url);
  }

  openBill(billID: string){
    let url = `bills/open-booking/${billID}`;
    return this.apiClient.put<BaseResponseModel>(url,{});
  }

  getService(){
    let url = 'services/filter-and-sort?PageIndex=0&PageSize=100';
    return this.apiClient.get<BaseResponseModel>(url);
  }

  getCategories(){
    let url = `categories?PageIndex=0&PageSize=1000`
    return this.apiClient.get<BaseResponseModel>(url);
  }

  addService(model: AddServiceRequestModel){
    let url = "services";
    return this.apiClient.post<BaseResponseModel>(url,model);
  }

  updateService(service: ServiceModel){
    let url = `services/{serviceId}?id=${service.id}`
    return this.apiClient.put<BaseResponseModel>(url,service);
  }

  removeService(ids: string[]){
    return this.apiClient.delete<BaseResponseModel>("services",ids);
  }
}
