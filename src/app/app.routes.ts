import { Routes } from '@angular/router';
import { BookComponent } from './components/booking/book/book.component';
import { AuthComponent } from './components/shared/auth/auth.component';
import { CheckoutComponent } from './components/booking/checkout/checkout.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { YardComponent } from './components/admin/yard/yard.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';
import { LayoutComponent } from './components/booking/layout/layout.component';
import { YardPriceComponent } from './components/admin/yard-price/yard-price.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ServicesComponent } from './components/admin/services/services.component';
import { AdminChatComponent } from './components/admin/admin-chat/admin-chat.component';
import { TenantAdminComponent } from './components/tenants/tenant-admin/tenant-admin.component';
import { ClubComponent } from './components/tenants/club/club.component';
import { ClubRegisterComponent } from './components/tenants/club-register/club-register.component';
import { RegisterSuccessComponent } from './components/tenants/register-success/register-success.component';
import { ClubSettingComponent } from './components/admin/club-setting/club-setting.component';
import { PaymentSuccessComponent } from './components/booking/payment-success/payment-success.component';
import { SaleReportComponent } from './components/admin/sale-report/sale-report.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: TenantAdminComponent },
            { path: 'home', component: TenantAdminComponent },
            { path: 'payment/success', component: PaymentSuccessComponent },
            { path: 'club/:id', component: ClubComponent },
            { path: 'clubsuccess', component: RegisterSuccessComponent },
            { path: 'register-club', component: ClubRegisterComponent },
            { path: 'booking', component: BookComponent },
            { path: 'auth', component: AuthComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'verify-email', component: VerifyEmailComponent },
            { path: 'not-found', component: NotFoundComponent },
        ],
    },
    {
        path: 'admin',
        component: AdminHomeComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'home', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'yard', component: YardComponent },
            { path: 'yard/price', component: YardPriceComponent },
            { path: 'service', component: ServicesComponent },
            { path: 'chat', component: AdminChatComponent },
            { path: 'setting', component: ClubSettingComponent },
            { path: 'report', component: SaleReportComponent },
        ],
    }
];
