import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RegisterService } from '../../../../services/signalR/register/register.service';
import RegisterSignalRModel from '../../../../model/register.signalR.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-await-verify',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './await-verify.component.html',
  styleUrl: './await-verify.component.scss',
})
export class AwaitVerifyComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  minutes: number = 10;
  seconds: number = 0;
  // isVisible: boolean = true;
  isDisabled: boolean = true;
  private interval: any;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.registerService.startConnection();
      this.registerService.message$.subscribe((message) => {
        if (!message) return;
        this.handlerSignalR(message);
      });
    } catch (err) {
      console.error('SignalR connection failed:', err);
    }

    this.startCountdown();
    this.enableResendAfterDelay();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(interval);
          this.isVisible = false;
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  enableResendAfterDelay() {
    setTimeout(() => {
      this.isDisabled = false;
    }, 60000);
  }

  resendEmail() {
    alert('Email xác minh đã được gửi lại!');
    this.isDisabled = true;
    this.enableResendAfterDelay();
  }

  cancel(isClick: boolean) {
    if (isClick === false) {
      this.isVisible = false;
      this.isVisibleChange.emit(false);
    } else {
      this.isVisible = false;
      this.isVisibleChange.emit(true);
    }
    this.resetCountdown();
  }

  handlerSignalR(message: RegisterSignalRModel) {
    const email = localStorage.getItem('email')?.toString();
    console.log(message);
    if (email === message.email && message.isVerified === 1) {
      this.cancel(false);
      localStorage.removeItem('email');
      this.toaster.success('Register success!');
    }
  }

  resetCountdown() {
    clearInterval(this.interval);
    this.minutes = 10;
    this.seconds = 0;
    this.isVisible = true;
    this.isDisabled = true;
    this.startCountdown();
  }
}
