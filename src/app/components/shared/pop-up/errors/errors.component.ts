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
  showErrorPopup: boolean = false; // Điều khiển hiển thị pop-up lỗi
  errorMessage: string = 'Tên tài khoản đã tồn tại'; // Lưu thông điệp lỗi

  // Hàm để hiển thị pop-up lỗi
  showError(message: string) {
    this.errorMessage = message; // Lưu thông điệp lỗi
    this.showErrorPopup = true; // Hiển thị pop-up
  }

  // Hàm để đóng pop-up lỗi
  closeErrorPopup() {
    this.showErrorPopup = false; // Ẩn pop-up lỗi
  }
}
