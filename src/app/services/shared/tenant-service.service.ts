import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import BaseResponseModel from '../../model/base.response.model';

@Injectable({
  providedIn: 'root'
})
export class TenantServiceService {

  constructor(
    private apiClient: ApiClientService
  ) { }


  getAllTenants() {
    return this.apiClient.get<BaseResponseModel>('tenants');
  }


  createTenant(data: any){
    return this.apiClient.post<BaseResponseModel>('tenants', data);
  }

  createClub(data: any){
    return this.apiClient.post<BaseResponseModel>('clubs', data);
  }

}
