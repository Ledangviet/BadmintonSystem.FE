import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/shared/auth.service';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { ResourceService } from '../../../services/shared/resource.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatCheckboxModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  state = 'login';

  public UIResource = {
    passwordPlh: 'Password',
    userNamePlh: 'Email',
    loginTitle: "LOGIN",
    register: "Register",
    registerTitle: "REGISTER",
    correctPassword: "Correct Password",
    loginMenu: "Login",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "If you don't have an account, please ",
    haveAccount: "If you already have an account, please",
    loginHere: "Login here",
    registerHere: "Register here!"
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private resource: ResourceService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      correctpassword: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('username')?.value;
      let passWord = this.loginForm.get('password')?.value;
      if(email != null && passWord != null){
        this.authService.login(email,passWord);
        this.router.navigate(['/home']);
      }
    }
  }

  register(){
    this.state = "register";
  }
  loginHere(){
    this.state = "login";
  }
}
