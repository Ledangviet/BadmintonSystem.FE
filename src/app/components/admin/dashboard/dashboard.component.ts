import { Component } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { YardModel } from '../../../model/yard.model';
import BaseResponseModel from '../../../model/base.response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public yardList: YardModel[] = [];
  constructor(
    private adminService: AdminMainService
  ){}

  ngOnInit(){
    this.yardList = [];
    this.adminService.getYardList().subscribe( (result : BaseResponseModel) =>{
      if(result.isSuccess){
        this.yardList = result.value as YardModel[];
      }
    })
  }
  statusOption = [
    'Tất cả'
  ] 

}
