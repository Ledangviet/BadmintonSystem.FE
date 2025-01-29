import { Routes } from '@angular/router';
import { HomeComponent } from './components/booking/home/home.component';
import { BookComponent } from './components/booking/book/book.component';
import { AuthComponent } from './components/shared/auth/auth.component';
import { CheckoutComponent } from './components/booking/checkout/checkout.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'booking', component: BookComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'checkout', component: CheckoutComponent },
];
