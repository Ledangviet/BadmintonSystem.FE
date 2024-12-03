import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { BlobService } from '../../../services/shared/blob.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    CommonModule,
    FlexLayoutModule,
    RouterLink,
    RouterLinkWithHref
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  imagePath:string = '';
  constructor(
    private blobService : BlobService
  ){}

  ngOnInit(){
    this.imagePath = this.blobService.getImageUrl('UserIcon.png');
    console.log(this.imagePath); 
  }
}
