import { Component } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { YardModel } from '../../../model/yard.model';
import BaseResponseModel from '../../../model/base.response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { TimeSlotModel } from '../../../model/timeslot.model';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { YardPriceByDateModel, YardPriceByDateResponseModel } from '../../../model/yardPriceByDateResponse.model';
import { YardPriceModel } from '../../../model/yardPrice.model';
import { BillModel, Booking } from '../../../model/bill.model';
import { ToastrService } from 'ngx-toastr';
import { ServiceModel } from '../../../model/service.model';
import { BookModel } from '../../../model/book.request.model';

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
  listPercent = [
    { value: '30', viewValue: '30 %' },
    { value: '40', viewValue: '40 %' },
    { value: '50', viewValue: '50 %' },
    { value: '60', viewValue: '60 %' },
    { value: '70', viewValue: '70 %' },
    { value: '80', viewValue: '80 %' },
    { value: '90', viewValue: '90 %' },
    { value: '100', viewValue: '100 %' },
  ];
  public yardList: YardModel[] = [];
  public timeSlots: TimeSlotModel[] = [];
  public selectedTimeSlotID: any;
  public selectedStatus: any;
  public yardPriceList: any;
  public selectedYard: any;
  public listBill: BillModel[] = [];
  public selectedBill: any;
  public selectedTimeSlotIDs: any;
  public name: string = '';
  public phoneNum : string = '';
  public selectedPercent: number = 100;
  public listService: ServiceModel[] = [];
  public isAddServicePopupVisible = false;
  public selectedService: any;
  public serivceQuantity = 0;

  constructor(
    private adminService: AdminMainService,
    private bookingService: BookingMainService,
    private fb: FormBuilder,
    private toater: ToastrService
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

    this.getBillList();

    this.listService = [];
    this.adminService.getService().subscribe(result => {
      if (result) {
        this.listService = result.value.items as ServiceModel[];
        console.log(this.listService)
      }
    })
  }

  getBillList() {
    //get bill list
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    let formattedStartDate = startDate.toISOString();
    startDate.setHours(23, 59, 59, 999);
    let formattedEndDate = startDate.toISOString();
    this.adminService.getBillList(formattedStartDate, formattedEndDate).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.listBill = result.value.items as BillModel[];
        this.listBill.map(bill => {
          this.adminService.getBookingByID(bill.bookingId).subscribe((result: BaseResponseModel) => {
            bill.booking = result.value as Booking;
          })
        })
      }
    })
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
    console.log('Selected Time Slot ID:', this.selectedTimeSlotID);
    // Add your logic here
  }

  getStatus(yardPrice: YardPriceByDateModel): number {
    if (!this.selectedYard) return 5;
    if (!yardPrice || !yardPrice.yardPricesDetails) return 5;
    let timeSlot = yardPrice.yardPricesDetails.filter(y => y.timeSlotId == this.selectedTimeSlotID);
    if (timeSlot.length > 0) {
      let bill = this.getBillByYard(yardPrice) as BillModel;
      if (bill) {
        return bill.status;
      }
      return timeSlot[0].isBooking;
    }
    return 0;
  }

  onSelectYard(yardPrice: YardPriceByDateModel) {
    this.selectedBill = null;
    this.selectedYard = yardPrice;
    let bill = this.getBillByYard(yardPrice) as BillModel;
    if (bill) {
      this.selectedBill = bill;
      console.log(this.listBill);
    }
  }


  getBillByYard(yardPrice: YardPriceByDateModel): any {
    let timeSlot = this.timeSlots.filter(t => t.id == this.selectedTimeSlotID)[0];
    if (timeSlot != null) {
      let bill = this.listBill.filter(b => {
        let listbill = b.booking.bookingLines?.filter(l => {
          if (l.startTime == timeSlot.startTime && l.yardName == yardPrice.yard.name) return true;
          return false
        })
        if (listbill?.length > 0) return true;
        return false;
      })

      if (bill.length > 0) {
        return bill[0];
      }
      return null
    }
  }

  isSelected(yardPrice: YardPriceByDateModel) {
    if (this.selectedYard == null) return false
    if (this.selectedYard == yardPrice) return true;
    return false;
  }

  isTimeSlotAvailable(timeslot: TimeSlotModel) {
    if (!timeslot || !this.selectedYard || !this.selectedYard.yardPricesDetails) return true;
    let yardDetail = this.selectedYard.yardPricesDetails.filter((yard: YardPriceModel) => yard.timeSlotId == timeslot.id);
    if (yardDetail.length > 0) {

      if (yardDetail[0].isBooking != 0 || parseInt(yardDetail[0].endTime.substring(0, 2)) < new Date().getHours())
        return false;
    }
    return true;
  }

  getCurrentDateFormatted(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  caculateTotal() {
    if (!this.selectedYard || !this.selectedTimeSlotIDs) return 0;
    let yardPrice = this.selectedYard as YardPriceByDateModel;
    let listID = this.selectedTimeSlotIDs as string[];
    let listPrice = yardPrice.yardPricesDetails.filter(d => listID.includes(d.timeSlotId));
    let total = 0;
    listPrice.forEach(p => {
      total += p.price;
    })
    return total;
  }

  onPercentChange() {

  }

  openYard() {
    this.adminService.openBill(this.selectedBill.id).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.toater.success("Mở sân thành công!");
        this.ngOnInit();
      }
    });
  }

  addService() {
    let bill = this.selectedBill as BillModel;
    let s = bill.serviceLineDetails?.filter(s => s.service.id == this.selectedService)
    if(s?.length > 0){
      //update quantity
      let newQuantity = s[0].serviceLine.quantity + this.serivceQuantity;
      console.log(this.selectedBill);
      console.log('qtt',s[0].serviceLine.id,newQuantity);
      this.adminService.updateServiceLineQuantity(s[0].serviceLine.id,newQuantity).subscribe( result =>{
        if(result.isSuccess){
          this.toater.success("Thêm thành công!");
          this.refreshBill();
        }
      })

    }
    else{
      this.adminService.addServiceToBill(this.selectedService, this.serivceQuantity, this.selectedBill.id).subscribe(result => {
        if (result.isSuccess) {
          this.toater.success("Thêm dịch vụ thành công !");
          
          this.refreshBill();
  
          this.closeAddServicePopup();
        }
      })
    }
  }

  refreshBill(){
    const startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
          let formattedStartDate = startDate.toISOString();
          startDate.setHours(23, 59, 59, 999);
          let formattedEndDate = startDate.toISOString();
          this.adminService.getBillList(formattedStartDate, formattedEndDate).subscribe((result: BaseResponseModel) => {
            if (result.isSuccess) {
              this.listBill = result.value.items as BillModel[];
              this.listBill.map(bill => {
                this.adminService.getBookingByID(bill.bookingId).subscribe((result: BaseResponseModel) => {
                  bill.booking = result.value as Booking;
                  this.onSelectYard(this.selectedYard);
                })
              })  
            }
          })
  }

  openAddServicePopup(): void {
    this.isAddServicePopupVisible = true;
  }

  closeAddServicePopup() {
    this.isAddServicePopupVisible = false;
  }

  caculateTotalSerivce(){
    let total = 0;
    let bill = this.selectedBill as BillModel;
    bill?.serviceLineDetails?.forEach( l =>{
      total += l.serviceLine.totalPrice;
    })
    return total;
  }

  onCheckOut(){
    const printContents = document.getElementById('bill-printer')!.innerHTML;
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow!.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            .content-container { border-radius: 5px; padding-top: 20px; background-color: white; display: flex; flex-direction: row; padding-bottom: 20px; } .court-info-container { padding: 20px; width: 28%; text-align: center; } .separator { background-color: #333333; width: 1px; border-radius: 1px; border: none; } .left-content-container { width: 70%; } .bill-header { display: flex; flex-direction: row; align-items: center; justify-content: stretch; height: 100px; margin: 0px 20px 20px 20px; border-bottom: 1px solid #333333; } .court-name { font-size: 40px; font-weight: bold; text-align: center; } .info .info-item { text-align: left; margin-left: 20px; margin-top: 10px; } .bill-content { overflow-x: auto; } .bill-content-item { margin-left: 10px; margin-right: 10px; padding-top: 10px; padding-bottom: 10px; border-bottom: 1px dotted #333333; display: flex; flex-direction: row; justify-content: space-between; } .service-name { text-align: left; width: 40%; line-height: 100%; position: relative; } .center-line { position: absolute; top: 30%; left: 0; width: 100%; height: 1px; transform: translateY(-50%); } .total { width: 40%; } .quantity { width: 20%; } .bill-content-item.solid { border-bottom: 1px solid #333333; } .bill-content-item.none-border { border-bottom: none; } .bill-content-item.no-margin { margin: 0px; } .bill-footer { margin-top: 20px; } .bill-footer .bill-content-item { margin-left: 10px; margin-right: 10px; padding-top: 10px; padding-bottom: 10px; display: flex; flex-direction: row; justify-content: space-between; } .bill-footer .service-name { text-align: left; width: 40%; } .bill-footer .total { width: 40%; } .bill-footer .quantity { width: 20%; } .cash-out { font-size: 18px; font-weight: bold; margin-top: 20px; } .border-top { border-top: 1px solid #333333; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow!.focus();
    iframe.contentWindow!.print();

    document.body.removeChild(iframe);
  }

  onBook(){
    let name = this.name;
    let phoneNum = this.phoneNum.toString();
  
    let percent = parseInt(this.selectedPercent.toString());
    let yardPriceIds = this.selectedTimeSlotIDs;
    let model = new BookModel(name, phoneNum, percent, yardPriceIds);

    this.bookingService.book(model).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.toater.success('Book completed successfully!');
        this.refreshBill();
      }
    });
  }
}
