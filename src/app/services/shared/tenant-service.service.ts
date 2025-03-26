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
    return this.apiClient.getNoHeader<BaseResponseModel>('tenants');
  }


  createTenant(data: any){
    return this.apiClient.postNoHeader<BaseResponseModel>('tenants', data);
  }

  createClub(data: any){
    return this.apiClient.postNoHeader<BaseResponseModel>('clubs', data);
  }

  getAllClubs() {
    return this.apiClient.getNoHeader<BaseResponseModel>('clubs/filter-and-sort?PageIndex=0&PageSize=50');
  }

  getClubById(id: string) {
    return this.apiClient.getNoHeader<BaseResponseModel>(`clubs/${id}`);
  }

}
