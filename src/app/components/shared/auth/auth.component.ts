import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/shared/auth.service';
import { Router } from '@angular/router';
import { ResourceService } from '../../../services/shared/resource.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import RegisterModel from '../../../model/register.model';
import RegisterResponseModel from '../../../model/register.response.model';
import { ToastrService } from 'ngx-toastr';
import LoginResponseModel from '../../../model/login.response.model';
import { AwaitVerifyComponent } from '../await-verify/await-verify.component';

@Component({
  selector: 'app-auth',
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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  state = 'login';
  isVisible: boolean = false;

  public UIResource = {
    passwordPlh: 'Password',
    emailPlh: 'Email',
    userNamePlh: 'User name',
    loginTitle: 'LOGIN',
    register: 'Register',
    registerTitle: 'REGISTER',
    correctPassword: 'Correct Password',
    loginMenu: 'Login',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    dontHaveAccount: "If you don't have an account, please ",
    haveAccount: 'If you already have an account, please',
    loginHere: 'Login here',
    registerHere: 'Register here!',
    firstNamePlh: 'First Name',
    lastNamePlh: 'Last Name',
    adressLine1Plh: 'Adress Line 1',
    adressLine2Plh: 'Adress Line 2',
    streetPlh: 'Street',
    cityPlh: 'City',
    provincePlh: 'Province',
    phoneNumberPlh: 'Phone Number',
    genderPlh: 'Gender',
    dateOfBirthPlh: 'Date of Birth',
    registerSuccess: 'Register Success!',
    passWordCondition:
      'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character from @$!%*?&.',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private resource: ResourceService,
    private toaster: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberme: [false, Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      correctpassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      unit: [''],
      street: [''],
      adreessLine1: [''],
      adreessLine2: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      phoneNumber: ['', [Validators.required]],
      gender: [0],
      dateOfBirth: [''],
      avatarUrl: [''],
    });
  }
  onSubmitLogin() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value;
      let passWord = this.loginForm.get('password')?.value;
      if (email != null && passWord != null) {
        this.authService
          .login(email, passWord)
          .subscribe((result: LoginResponseModel) => {
            if (result.isSuccess) {
              localStorage.setItem('accessToken', result.value.accessToken);
              localStorage.setItem('email', result.value.user.email);
              this.router.navigate(['/home']);
              this.authService.loginStateChangeEmitter.emit(true);
            }
          });
      }
    }
  }

  onSubmitRegister() {
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    let phoneNumber = this.registerForm.get('phoneNumber')?.value;
    let dateOfBirth = this.registerForm.get('dateOfBirth')?.value;
    let registerModel = new RegisterModel(email, password, phoneNumber, 1);
    this.authService
      .register(registerModel)
      .subscribe((response: RegisterResponseModel) => {
        if (response.isSuccess) {
          this.isVisible = true;
          localStorage.setItem('email', email);
        }
      });
  }

  registerHere() {
    this.state = 'register';
  }
  loginHere() {
    this.state = 'login';
  }
  receiveMessage(message: boolean) {
    this.isVisible = message;
    if (message === false) this.loginHere();
  }
}
