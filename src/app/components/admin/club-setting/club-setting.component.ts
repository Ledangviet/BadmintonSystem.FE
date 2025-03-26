import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TenantServiceService } from '../../../services/shared/tenant-service.service';
import { AzureBlobServiceService } from '../../../services/shared/azure-blob-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MapComponent } from '../../shared/map/map.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AwaitVerifyComponent } from '../../shared/pop-up/await-verify/await-verify.component';
import { ErrorsComponent } from '../../shared/pop-up/errors/errors.component';
import { LoadingComponent } from '../../shared/pop-up/loading/loading.component';
import { ClubModel } from '../../../model/club.model';

@Component({
  selector: 'app-club-setting',
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
  templateUrl: './club-setting.component.html',
  styleUrl: './club-setting.component.scss'
})
export class ClubSettingComponent {
  clubModel: ClubModel | null = null;
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
      country: ['', Validators.required],
      facebookLink: [''],
      instagramLink: [''],
      profileImage: [''],
    });

  }

  ngOnInit(){

    this.tenantService.getAllClubs().subscribe((res) => {
      let code = localStorage.getItem('tenant')?.toString();
      if(res.isSuccess && code != null){
        this.clubModel = res.value.items.find((x: ClubModel) => x.code === code) as ClubModel;
        if(this.clubModel){
          this.clubRegisterForm.patchValue({
            clubName: this.clubModel.name,
            email: "ledangviet1998@gmail.com",
            phoneNumber: this.clubModel.hotline,
            openTime: this.clubModel.openingTime,
            closeTime: this.clubModel.closingTime,
            addr_line1: this.clubModel.clubAddress.addressLine1,
            addr_line2: this.clubModel.clubAddress.addressLine2,
            city: this.clubModel.clubAddress.city,
            state: this.clubModel.clubAddress.province,
            country: "Viet Nam",
            facebookLink: this.clubModel.clubInformation.facebookPageLink,
            instagramLink: this.clubModel.clubInformation.instagramLink,
            profileImage: this.clubModel.clubImages[0].imageLink,
          });
          this.selectedLocation = JSON.stringify(this.clubModel.clubInformation.mapLink);
        }
      }
    });

  }

  onSubmit() { }


  openMapDialog() {
    const dialogRef = this.dialog.open(MapComponent);

    dialogRef.componentInstance.locationSelected.subscribe((location: any) => {
      this.selectedLocation = JSON.stringify(location);
      dialogRef.close();
    });
  }

  imageSelected(event: any) {
    const file = event.target.files[0] as File;
    this.selectedImage = file;
  }

}
