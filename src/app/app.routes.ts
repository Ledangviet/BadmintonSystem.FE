import { Routes } from '@angular/router';
import { HomeComponent } from './components/booking/home/home.component';
import { BookComponent } from './components/booking/book/book.component';
import { AuthComponent } from './components/shared/auth/auth.component';
import { CheckoutComponent } from './components/booking/checkout/checkout.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { YardComponent } from './components/admin/yard/yard.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: BookComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/yard', component: YardComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'not-found', component: NotFoundComponent },
];
