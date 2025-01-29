import { Component } from '@angular/core';
import { BookingMainService } from '../../../services/booking/booking-main.service';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookModel } from '../../../model/book.request.model';
import BaseResponseModel from '../../../model/base.response.model';
import { ToastrService } from 'ngx-toastr';

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
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  selectedDate = new Date();
  checkoutForm: FormGroup;
  constructor(
    private bookingService: BookingMainService,
    private router : Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ){
    this.checkoutForm = this.fb.group({
          name: ['', [Validators.required]],
          prepay: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          discount: [''],
        });
  }

  ngOnInit(){
    this.selectedDate = this.bookingService.selectedDate;
    if(this.bookingService.selectedYardPrice.length < 1){
      this.router.navigate(['/booking']);
    }
  }

  onSubmitCheckout(){
    if(this.checkoutForm.invalid){
      return;
    }
    let name = this.checkoutForm.get("name")?.value;
    let phoneNum = this.checkoutForm.get("phone")?.value;
    let saleID = this.checkoutForm.get("discount")?.value;
    let percent = this.checkoutForm.get("prepay")?.value;
    if(saleID === '') saleID = undefined;
    let yardPriceIds: string[] = this.bookingService.selectedYardPrice.map((item: { id: string }) => item.id);
    let model = new BookModel(name,phoneNum,saleID,percent,yardPriceIds);
    

    this.bookingService.book(model).subscribe( (result: BaseResponseModel) =>{
      if(result.isSuccess){
        this.toaster.success("Book completed successfully!");
        this.router.navigate(['/booking']);     
      }
    } )
  }
}
