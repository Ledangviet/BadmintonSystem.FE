import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  constructor(private router: Router, private toaster: ToastrService) {}
  navigateToLogin() {
    this.router.navigate(['/auth']);
    this.toaster.success('Register success!');
  }
}
