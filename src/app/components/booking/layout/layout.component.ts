import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { BlobService } from '../../../services/shared/blob.service';
import { AuthService } from '../../../services/shared/auth.service';
import { ResourceService } from '../../../services/shared/resource.service';

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

  public userImagePath:string = '';
  public phoneImagePath:string = '';
  public adressImagePath:string = '';
  public isAuthenticated:boolean = false;
  public UIResource = {
    homeTitle : 'home_Title',
    bookTitle: 'book_Title',
    shoptitle : "shop_title",
    adressInfo: "adress_Info"
  }

  constructor(
    private blobService : BlobService,
    private authService : AuthService,
    private resourceService: ResourceService, 
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.userImagePath = this.blobService.getImageUrl('UserIcon.png');
    this.phoneImagePath = this.blobService.getImageUrl('phoneicon.png');
    this.adressImagePath = this.blobService.getImageUrl('adressicon.png');
    this.UIResource = this.resourceService.getResource(this.UIResource);
  }

  onClickLogin(){ 
    this.router.navigate(['/auth']);  
  }
}
