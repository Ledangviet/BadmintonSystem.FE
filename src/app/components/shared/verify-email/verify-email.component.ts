import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  constructor(private router: Router) {}
  navigateToLogin() {
    this.router.navigate(['/auth']);
  }
}
