import { Component } from '@angular/core';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookModel } from '../../../model/book.request.model';
import BaseResponseModel from '../../../model/base.response.model';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from '../../../services/signalR/booking/signalr.service';
import { LoadingComponent } from '../../shared/pop-up/loading/loading.component';
import { finalize } from 'rxjs';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    BookingDetailComponent,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    LoadingComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  isLoading = false;
  selectedDate = new Date();
  checkoutForm: FormGroup;
  constructor(
    private bookingService: BookingMainService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private signalRService: SignalRService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      prepay: ['100', [Validators.required]],
      phone: ['', [Validators.required]],
      discount: [''],
      email: ['ledangviet1998@gmail.com', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.selectedDate = this.bookingService.selectedDate;
    if (this.bookingService.selectedYardPrice.length < 1) {
      this.router.navigate(['/booking']);
    }

  }

  onSubmitCheckout() {
    if (this.checkoutForm.invalid) {
      return;
    }

    let guid = Guid.create();
    console.log(guid.toString());
    let name = this.checkoutForm.get('name')?.value;
    let phoneNum = this.checkoutForm.get('phone')?.value;
    let mail = this.checkoutForm.get('email')?.value;
    let saleID = this.checkoutForm.get('discount')?.value;
    let percent = this.checkoutForm.get('prepay')?.value;
    let tenant = localStorage.getItem('tenant')?.toString();
    if (saleID === '') saleID = undefined;

    let price = 0;
    let yardPriceIds: string[] = this.bookingService.selectedYardPrice.map(
      (item: { id: string }) => item.id
    );
    let model = new BookModel(name, phoneNum, percent, yardPriceIds);
    model.tenant = tenant ? tenant : '';
    let isBook = false;
    this.bookingService.checkOut(guid.toString(), this.bookingService.totalPrice.toString(), "Thanh toán cho hóa đơn số" + guid.toString()).subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        window.open(result.value.payUrl, "_blank");

        setTimeout(() => {
          isBook = true;
          this.bookingService.book(model).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          ).subscribe((result: BaseResponseModel) => {
            if (result.isSuccess) {
              this.toaster.success('Book completed successfully!');
              this.router.navigate(['/booking']);
            }
          });
          
        }, 10000);

        let accessToken = localStorage.getItem('accessToken')?.toString();
        if (accessToken) {
          this.isLoading = true;
          this.signalRService
            .startPaymentConnection(accessToken)
            .then(() => {
              this.signalRService.message$.pipe(
                finalize(() => {
                  this.isLoading = false;
                })
              ).subscribe((result) => {
                this.toaster.success('Thanh toan thanh cong!');             
                if(!isBook){
                  this.isLoading = true;
                  this.bookingService.book(model).pipe(
                    finalize(() => {
                      this.isLoading = false;
                    })
                  ).subscribe((result: BaseResponseModel) => {
                    if (result.isSuccess) {
                      this.toaster.success('Book completed successfully!');
                      this.router.navigate(['/booking']);
                    }
                  });
                }
              });
            })
            .catch((err) => {
              console.error('SignalR connection failed:', err);
            });
        }

      }
    });
  }
}
