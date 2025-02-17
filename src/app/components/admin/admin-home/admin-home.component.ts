import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { BookingMainService } from '../../../services/booking/booking-main.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    MatIconModule,
    RouterOutlet,
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  showDashboard = false;
  showMenu = false;
  showCategory = false;
  constructor(
  ){

  }
  isShowCategory(){
    return this.showCategory;
  }
  onExpandCategoryNav(){
    this.showCategory = !this.showCategory;
  }
  onToggleMenu(){
    this.showMenu = !this.showMenu;
  }

  isCloseMenu(){
    return this.showMenu;
  }

  onExpandDashboard(){
    this.showDashboard = !this.showDashboard
  }
}
