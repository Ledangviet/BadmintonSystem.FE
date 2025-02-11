import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  constructor() {}
  @Input() isLoading: boolean = false;

  closeLoadingPopup() {
    this.isLoading = false;
  }
}
