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
import { MatMenuModule } from '@angular/material/menu';

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
    RouterLinkWithHref,
    MatMenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public userImagePath: string = '';
  public phoneImagePath: string = '';
  public adressImagePath: string = '';
  public isAuthenticated: boolean = false;
  public UIResource = {
    homeTitle: 'home_title',
    bookTitle: 'book_title',
    shopTitle: "shop_title",
    adressInfo: "adress_info",
    phoneNumber: "phone_number",
    profileMenu: "profile_menu",
    settingMenu: "setting_menu",
    logoutMenu: "logout_menu",
    loginMenu: "login_menu"
  }
  public get lang(): string {
    return this.resourceService.lang.toUpperCase();
  }
  public get isBooking(): boolean{
    return (this.router.url == '/booking')
  }

  constructor(
    private blobService: BlobService,
    private authService: AuthService,
    private resourceService: ResourceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.userImagePath = this.blobService.getImageUrl('UserIcon.png');
    this.phoneImagePath = this.blobService.getImageUrl('phoneicon.png');
    this.adressImagePath = this.blobService.getImageUrl('adressicon.png');
    this.UIResource = this.resourceService.getResource(this.UIResource);
    this.authService.loginStateChangeEmitter.subscribe(value => {
      this.isAuthenticated = value;
    });
  }

  onClickLogin() {
    this.router.navigate(['/auth']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  onChangeLanguage() {
    this.resourceService.setResource(this.lang == 'ENG' ? 'vi' : 'eng');
    window.location.reload();
  }
  

  onAdminClick() {
    this.router.navigate(['/admin']);
  }

  onClickBook(){
    this.router.navigate(['/home']);
    this.scrollToClubList();
  }

  scrollToClubList() {
    const element = document.getElementById('club-list-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
