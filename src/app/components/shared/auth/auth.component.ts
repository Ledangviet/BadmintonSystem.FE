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
import LoginResponseModel from '../../../model/login.response.model';
import { AwaitVerifyComponent } from '../pop-up/await-verify/await-verify.component';
import { ErrorsComponent } from '../pop-up/errors/errors.component';
import { LoadingComponent } from '../pop-up/loading/loading.component';

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
    ErrorsComponent,
    LoadingComponent,
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
  isLoading: boolean = false;
  isEmailErrorDetail: boolean = true;
  isPasswordErrorDetail: boolean = true;
  isEmailExistsErrorDetail: boolean = true;
  isPasswordConditionErrorDetail: boolean = true;
  email = localStorage.getItem('email')?.toString();

  public UIResource = {
    passwordPlh: 'Password',
    emailPlh: 'Email',
    userNamePlh: 'User name',
    emailExists: 'Email not exists, Please re-enter.',
    emailNotExists: 'Email already exists, Please re-enter new email.',
    passwordNotCorrect: 'Password not correct, Please re-enter.',
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
      'The password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character from @$!%*?&.',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private resourceService: ResourceService
  ) {
    this.loginForm = this.fb.group({
      email: ['ledangviet001@gmail.com', [Validators.required, Validators.email]],
      password: ['Viet1998@', Validators.required],
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

  ngOnInit() {
    this.UIResource = this.resourceService.getResource(this.UIResource);
  }
  onSubmitLogin() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value;
      let passWord = this.loginForm.get('password')?.value;
      if (email != null && passWord != null) {
        this.authService.login(email, passWord).subscribe(
          (result: LoginResponseModel) => {
            if (result.isSuccess) {
              localStorage.setItem('accessToken', result.value.accessToken);
              localStorage.setItem('email', result.value.user.email);
              localStorage.setItem('isAuthenticated', 'true');
              let expiredTime = Date.now() + 3600000;
              localStorage.setItem('expiredTime', expiredTime.toString());
              this.router.navigate(['/home']);
              this.authService.loginStateChangeEmitter.emit(true);

              this.authService.userDetail(email).subscribe((res) => {
                if(res.isSuccess){
                  let role = res.value.roles[0];
                  localStorage.setItem('role', role);
                  this.authService.userRole = role;
                  this.authService.loginStateChangeEmitter.emit(true);
                }
              })

            }
            this.isLoading = false;
          },
          (error) => {
            const detail = error.error.detail.toLowerCase();
            const containsPassword = detail.includes('password');
            const containsEmail = detail.includes('email');
            this.isEmailErrorDetail = true;
            this.isPasswordErrorDetail = true;
            if (error.status === 404 || error.status === 400) {
              this.errorStatusLoginHandler(containsEmail, containsPassword);
            } else {
              console.error('An unexpected error occurred:', error);
            }
            this.isLoading = false;
          }
        );
      }
    }
  }

  onSubmitRegister() {
    this.isLoading = true;
    if (this.email) this.authService.cancelRegister(this.email).subscribe();
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    let phoneNumber = this.registerForm.get('phoneNumber')?.value;
    let dateOfBirth = this.registerForm.get('dateOfBirth')?.value;
    let registerModel = new RegisterModel(email, password, phoneNumber, 1);
    this.authService.register(registerModel).subscribe(
      (response: RegisterResponseModel) => {
        if (response.isSuccess) {
          this.isVisible = true;
          localStorage.setItem('email', email);
        }
        this.isLoading = false;
      },
      (error) => {
        const detail = error.error.detail.toLowerCase();
        const containsPassword = detail.includes('password');
        const containsEmail = detail.includes('email');
        this.isEmailExistsErrorDetail = true;
        this.isPasswordConditionErrorDetail = true;
        if (error.status === 404 || error.status === 400) {
          this.errorStatusRegisterHandler(containsEmail, containsPassword);
        } else {
          console.error('An unexpected error occurred:', error);
        }
        this.isLoading = false;
      }
    );
  }

  registerHere() {
    this.state = 'register';
  }
  loginHere() {
    this.state = 'login';
  }

  receiveMessage(message: boolean) {
    let email = this.registerForm.get('email')?.value;
    this.authService.cancelRegister(email).subscribe();
    if (message === true) {
      this.isVisible = false;
    } else {
      this.isVisible = message;
      if (message === false) this.loginHere();
    }
  }

  errorStatusLoginHandler(containsEmail: boolean, containsPassword: boolean) {
    const emailError = containsEmail ? { required: true } : null;
    const passwordError = containsPassword ? { required: true } : null;

    this.loginForm.get('email')?.setErrors(emailError);
    this.loginForm.get('password')?.setErrors(passwordError);

    this.isEmailErrorDetail = containsEmail ? false : true;
    this.isPasswordErrorDetail = containsPassword ? false : true;
  }

  errorStatusRegisterHandler(
    containsEmail: boolean,
    containsPassword: boolean
  ) {
    const emailError = containsEmail ? { required: true } : null;
    const passwordError = containsPassword ? { required: true } : null;

    this.registerForm.get('email')?.setErrors(emailError);
    this.registerForm.get('password')?.setErrors(passwordError);

    this.isEmailExistsErrorDetail = containsEmail ? false : true;
    this.isPasswordConditionErrorDetail = containsPassword ? false : true;
  }
}
