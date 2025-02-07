import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-await-verify',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './await-verify.component.html',
  styleUrl: './await-verify.component.scss',
})
export class AwaitVerifyComponent implements OnInit {
  minutes: number = 10;
  seconds: number = 0;
  isVisible: boolean = true;
  isDisabled: boolean = true;

  ngOnInit() {
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

  cancel() {
    this.isVisible = false;
  }
}
