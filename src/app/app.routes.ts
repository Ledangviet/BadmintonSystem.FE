import { Routes } from '@angular/router';
import { HomeComponent } from './components/booking/home/home.component';
import { BookComponent } from './components/booking/book/book.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'booking', component: BookComponent }
];
