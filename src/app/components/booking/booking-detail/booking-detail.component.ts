import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { YardPriceModel } from '../../../model/yardPrice.model';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { YardModel } from '../../../model/yard.model';
import BaseResponseModel from '../../../model/base.response.model';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../../../services/shared/resource.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss',
})
export class BookingDetailComponent {
  @Input() selectedDate: Date = new Date();
  selectedYardPrice: YardPriceModel[] = [];
  yardList: YardModel[] = [];
  accessToken = localStorage.getItem('accessToken')?.toString();
  public UIResource = {
    bookingDetailDate: 'Date :',
    bookingDetailTime: 'Time :',
    bookingDetailTotal: 'Total Price :',
    bookingDetailNotSelected: 'You have not selected any time slot!',
    bookingDetailPrice: 'Price',
  };
  get anyPriceSelected() {
    return this.bookingService.selectedYardPrice.length > 0;
  }

  constructor(
    private bookingService: BookingMainService,
    private resourceService: ResourceService
  ) {}
  ngOnInit() {
    this.selectedYardPrice = this.bookingService.selectedYardPrice;
    this.yardList = [];
    this.bookingService.selectedYardPriceChangeEmitter.subscribe(() => {
      this.updateYardPriceInYardList();
    });

    this.UIResource = this.resourceService.getResource(this.UIResource);

    this.bookingService
      .getYardList(0, 100)
      .subscribe((result: BaseResponseModel) => {
        if (result.isSuccess) {
          result.value.items.forEach(
            (item: {
              name: string;
              yardTypeId: string;
              isStatus: number;
              createdDate: string;
              createBy: string;
              isDeleted: boolean;
              id: string;
              modifiedDate: string | null | undefined;
              modifiedBy: string | null | undefined;
              deletedAt: string | null | undefined;
            }) => {
              let newYard = new YardModel(
                item.name,
                item.yardTypeId,
                item.isStatus,
                item.createdDate,
                item.createBy,
                item.isDeleted,
                item.id,
                item.modifiedDate,
                item.modifiedBy,
                item.deletedAt
              );
              this.yardList.push(newYard);
            }
          );
          this.updateYardPriceInYardList();
        }
      });
  }

  updateYardPriceInYardList() {
    this.yardList.forEach((yard) => {
      yard.yardPriceList = [];
    });
    this.selectedYardPrice = this.bookingService.selectedYardPrice.filter(
      (x: any) => x.isToken === this.accessToken
    );
    this.selectedYardPrice.forEach((yardPrice) => {
      let yard = this.yardList.find((y) => y.id === yardPrice.yardId);
      if (yard) {
        yard.yardPriceList.push(yardPrice);
      }
    });
    this.yardList.sort((a, b) => a.name.localeCompare(b.name));
  }

  getYardTotalPrice(id: string) {
    let yard = this.yardList.find((y) => y.id == id);
    let price = 0;
    yard?.yardPriceList.forEach((p) => {
      price += p.price;
    });
    return price;
  }

  getTotalprice() {
    let total = 0;
    this.yardList.forEach((yard) => {
      total += this.getYardTotalPrice(yard.id);
    });
    return total;
  }

  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  removeYardPrice(detail: YardPriceModel) {
    this.bookingService.removeSelectedYardPrice(detail);
  }

  removeYard(yard: YardModel) {
    yard.yardPriceList.forEach((detail) => {
      this.removeYardPrice(detail);
    });
  }
}
