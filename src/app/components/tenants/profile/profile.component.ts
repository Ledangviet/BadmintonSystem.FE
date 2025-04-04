import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/shared/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm: FormGroup = new FormGroup({});
  selectedDate = new Date();
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ){
    this.profileForm = this.fb.group({
      fullName: [''],
      phoneNumber: [''],
      selectedDate: [null]
    });
    this.selectedDate = new Date();
  }

  ngOnInit(){
    let email = localStorage.getItem('email')?.toString();
    if(email != null || email != ""){
      this.authService.userDetail(email).subscribe((result) => {
        if(result.isSuccess){
          this.user = result.value.user;
          this.selectedDate = new Date(this.user.dateOfBirth);
          this.profileForm = this.fb.group({
            fullName: [this.user?.fullName || ''],
            phoneNumber: [this.user?.phoneNumber || ''],
            selectedDate: [this.selectedDate || null]
          });

          this.profileForm.disable();
        }
      })
    }
  }
}
