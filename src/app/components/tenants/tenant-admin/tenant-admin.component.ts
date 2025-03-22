import { Component } from '@angular/core';
import { TenantServiceService } from '../../../services/shared/tenant-service.service';
import { Tenant } from '../../../model/tenant.model';

@Component({
  selector: 'app-tenant-admin',
  standalone: true,
  imports: [],
  templateUrl: './tenant-admin.component.html',
  styleUrl: './tenant-admin.component.scss'
})
export class TenantAdminComponent {
listTenant: Tenant[] = [];

  constructor(
    private tenantService: TenantServiceService,
  ){

  }
  ngOnInit(){

    this.tenantService.getAllTenants().subscribe((res) => {
      if(res.isSuccess){
        this.listTenant = res.value as Tenant[];
      }
    });
  }

}
