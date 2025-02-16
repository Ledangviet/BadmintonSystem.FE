import { Routes } from '@angular/router';
import { HomeComponent } from './components/booking/home/home.component';
import { BookComponent } from './components/booking/book/book.component';
import { AuthComponent } from './components/shared/auth/auth.component';
import { CheckoutComponent } from './components/booking/checkout/checkout.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { YardComponent } from './components/admin/yard/yard.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
import { LayoutComponent } from './components/booking/layout/layout.component';
import { YardPriceComponent } from './components/admin/yard-price/yard-price.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'booking', component: BookComponent },
            { path: 'auth', component: AuthComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'verify-email', component: VerifyEmailComponent },
        ],
    },
    {
        path: 'admin',
        component: AdminHomeComponent,
        children: [
            { path: '', component: YardComponent },
            { path: 'home', component: YardComponent },
            { path: 'yard', component: YardComponent },
            { path: 'yard/price', component: YardPriceComponent },
        ],
    }
];
