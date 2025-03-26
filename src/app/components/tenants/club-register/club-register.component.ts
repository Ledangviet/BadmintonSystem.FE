import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AwaitVerifyComponent } from '../../shared/pop-up/await-verify/await-verify.component';
import { ErrorsComponent } from '../../shared/pop-up/errors/errors.component';
import { LoadingComponent } from '../../shared/pop-up/loading/loading.component';
import { MapComponent } from '../../shared/map/map.component';
import { ClubRegisterRequestModel } from '../../../model/club.register.request.model';
import { TenantServiceService } from '../../../services/shared/tenant-service.service';
import BaseResponseModel from '../../../model/base.response.model';
import { AzureBlobServiceService } from '../../../services/shared/azure-blob-service.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterSuccessComponent } from '../register-success/register-success.component';

@Component({
  selector: 'app-club-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AwaitVerifyComponent,
    ErrorsComponent,
    LoadingComponent
  ],
  templateUrl: './club-register.component.html',
  styleUrl: './club-register.component.scss'
})
export class ClubRegisterComponent {
  selectedLocation: string = '';
  selectedImage: any;
  clubRegisterForm: FormGroup;
  provinces = [
    { name: 'An Giang', value: 'An Giang' },
    { name: 'Bà Rịa - Vũng Tàu', value: 'Bà Rịa - Vũng Tàu' },
    { name: 'Bắc Giang', value: 'Bắc Giang' },
    { name: 'Bắc Kạn', value: 'Bắc Kạn' },
    { name: 'Bạc Liêu', value: 'Bạc Liêu' },
    { name: 'Bắc Ninh', value: 'Bắc Ninh' },
    { name: 'Bến Tre', value: 'Bến Tre' },
    { name: 'Bình Định', value: 'Bình Định' },
    { name: 'Bình Dương', value: 'Bình Dương' },
    { name: 'Bình Phước', value: 'Bình Phước' },
    { name: 'Bình Thuận', value: 'Bình Thuận' },
    { name: 'Cà Mau', value: 'Cà Mau' },
    { name: 'Cần Thơ', value: 'Cần Thơ' },
    { name: 'Cao Bằng', value: 'Cao Bằng' },
    { name: 'Đà Nẵng', value: 'Đà Nẵng' },
    { name: 'Đắk Lắk', value: 'Đắk Lắk' },
    { name: 'Đắk Nông', value: 'Đắk Nông' },
    { name: 'Điện Biên', value: 'Điện Biên' },
    { name: 'Đồng Nai', value: 'Đồng Nai' },
    { name: 'Đồng Tháp', value: 'Đồng Tháp' },
    { name: 'Gia Lai', value: 'Gia Lai' },
    { name: 'Hà Giang', value: 'Hà Giang' },
    { name: 'Hà Nam', value: 'Hà Nam' },
    { name: 'Hà Nội', value: 'Hà Nội' },
    { name: 'Hà Tĩnh', value: 'Hà Tĩnh' },
    { name: 'Hải Dương', value: 'Hải Dương' },
    { name: 'Hải Phòng', value: 'Hải Phòng' },
    { name: 'Hậu Giang', value: 'Hậu Giang' },
    { name: 'Hòa Bình', value: 'Hòa Bình' },
    { name: 'Hưng Yên', value: 'Hưng Yên' },
    { name: 'Khánh Hòa', value: 'Khánh Hòa' },
    { name: 'Kiên Giang', value: 'Kiên Giang' },
    { name: 'Kon Tum', value: 'Kon Tum' },
    { name: 'Lai Châu', value: 'Lai Châu' },
    { name: 'Lâm Đồng', value: 'Lâm Đồng' },
    { name: 'Lạng Sơn', value: 'Lạng Sơn' },
    { name: 'Lào Cai', value: 'Lào Cai' },
    { name: 'Long An', value: 'Long An' },
    { name: 'Nam Định', value: 'Nam Định' },
    { name: 'Nghệ An', value: 'Nghệ An' },
    { name: 'Ninh Bình', value: 'Ninh Bình' },
    { name: 'Ninh Thuận', value: 'Ninh Thuận' },
    { name: 'Phú Thọ', value: 'Phú Thọ' },
    { name: 'Phú Yên', value: 'Phú Yên' },
    { name: 'Quảng Bình', value: 'Quảng Bình' },
    { name: 'Quảng Nam', value: 'Quảng Nam' },
    { name: 'Quảng Ngãi', value: 'Quảng Ngãi' },
    { name: 'Quảng Ninh', value: 'Quảng Ninh' },
    { name: 'Quảng Trị', value: 'Quảng Trị' },
    { name: 'Sóc Trăng', value: 'Sóc Trăng' },
    { name: 'Sơn La', value: 'Sơn La' },
    { name: 'Tây Ninh', value: 'Tây Ninh' },
    { name: 'Thái Bình', value: 'Thái Bình' },
    { name: 'Thái Nguyên', value: 'Thái Nguyên' },
    { name: 'Thanh Hóa', value: 'Thanh Hóa' },
    { name: 'Thừa Thiên Huế', value: 'Thừa Thiên Huế' },
    { name: 'Tiền Giang', value: 'Tiền Giang' },
    { name: 'TP Hồ Chí Minh', value: 'TP Hồ Chí Minh' },
    { name: 'Trà Vinh', value: 'Trà Vinh' },
    { name: 'Tuyên Quang', value: 'Tuyên Quang' },
    { name: 'Vĩnh Long', value: 'Vĩnh Long' },
    { name: 'Vĩnh Phúc', value: 'Vĩnh Phúc' },
    { name: 'Yên Bái', value: 'Yên Bái' }
  ];

  @ViewChild('map') mapComponent!: MapComponent;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private tenantService: TenantServiceService,
    private azureBlobService: AzureBlobServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.clubRegisterForm = this.fb.group({
      clubName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phoneNumber: ['', Validators.required],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required],
      addr_line1: [''],
      addr_line2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal: ['', Validators.required],
      country: ['', Validators.required],
      facebookLink: [''],
      instagramLink: [''],
      profileImage: [''],
      privacyPolicy: [false]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.clubRegisterForm.invalid) {
      const formData = this.clubRegisterForm.value;
      const registerRequest = new ClubRegisterRequestModel({
        clubInformation: {
          facebookPageLink: formData.facebookLink,
          instagramLink: formData.instagramLink,
          mapLink: this.selectedLocation,
          clubId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        clubImages: [
          {
            imageLink: formData.profileImage,
            clubId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          }
        ],
        clubAddress: {
          unit: formData.addr_line1,
          street: formData.addr_line2,
          addressLine1: formData.addr_line1,
          addressLine2: formData.addr_line2,
          city: formData.city,
          province: formData.state
        },
        name: formData.clubName,
        hotline: formData.phoneNumber,
        openingTime: formData.openTime + ":00",
        closingTime: formData.closeTime + ":00",
        code: '' // Assuming code is not part of the form
      });
      let createTenantModel = {
        "name": formData.clubName,
        "email": formData.email,
        "hotLine": formData.phoneNumber,
        "city": formData.city,
        "address": formData.addr_line1,
        "slogan": formData.clubName,
        "description": formData.clubName,
        "image": "#",
        "isolated": true
      };

      this.tenantService.createTenant(createTenantModel).subscribe((res: BaseResponseModel) => {
        if (res.isSuccess) {
          let code = res.value.code;
          let name = code + this.selectedImage.name;
          registerRequest.code = code;
          this.azureBlobService.uploadImage(environment.storeKey,this.selectedImage, name,() =>{
            registerRequest.code = code;
            registerRequest.clubImages[0].imageLink = this.azureBlobService.getImageUrl(name);
            this.tenantService.createClub(registerRequest).subscribe((res: BaseResponseModel) => {
              if(res.isSuccess){
                this.toastr.success("Đăng ký câu lạc bộ thành công!", "Thành công");
                this.dialog.open(RegisterSuccessComponent); // Show success dialog
              }else{
                this.toastr.error("Có lỗi xảy ra!", "Error");
              }
            })
          });
        }
      });

    }
  }

  imageSelected(event: any) {
    const file = event.target.files[0] as File;
    this.selectedImage = file;
  }

  openMapDialog() {
    const dialogRef = this.dialog.open(MapComponent);

    dialogRef.componentInstance.locationSelected.subscribe((location: any) => {
      this.selectedLocation = JSON.stringify(location);
      dialogRef.close();
    });
  }


}
