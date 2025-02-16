import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
})
export class ErrorsComponent {
  showErrorPopup: boolean = false;
  errorMessage: string = 'Tên tài khoản đã tồn tại';

  showError(message: string) {
    this.errorMessage = message;
    this.showErrorPopup = true;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }
}
