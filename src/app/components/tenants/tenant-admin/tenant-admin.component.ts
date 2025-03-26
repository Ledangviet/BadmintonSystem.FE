import { Component } from '@angular/core';
import { TenantServiceService } from '../../../services/shared/tenant-service.service';
import { Tenant } from '../../../model/tenant.model';
import { ClubRegisterRequestModel } from '../../../model/club.register.request.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tenant-admin',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './tenant-admin.component.html',
  styleUrl: './tenant-admin.component.scss'
})
export class TenantAdminComponent {
  listTenant: Tenant[] = [];
  listClub: ClubRegisterRequestModel[] = [];
  constructor(
    private tenantService: TenantServiceService,
    private router: Router
  ) {

  }
  ngOnInit() {

    this.tenantService.getAllClubs().subscribe((res) => {
      if(res.isSuccess){
        this.listClub = res.value.items as ClubRegisterRequestModel[];
        console.log(this.listClub);
      }
    });

  }


  clickClub(club: ClubRegisterRequestModel){
    localStorage.setItem('tenant', club.code);
    this.router.navigate(['/booking']);
  }

}
