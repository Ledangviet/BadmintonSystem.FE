import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiclientService } from '../services/apiclient.service';
import { MainLayoutComponent } from './components/bookings/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ApiclientService]
})
export class AppComponent {
  constructor(private apiClientService: ApiclientService){
  }
  result = this.apiClientService.addGender("gender1").subscribe(result => {
    console.log(result);
  })
  title = 'BadmintonSystemPresentation';
}
