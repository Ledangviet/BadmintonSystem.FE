import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import BaseResponseModel from '../../../model/base.response.model';
import { CategoryModel, ServiceModel } from '../../../model/service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-board',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './service-board.component.html',
  styleUrl: './service-board.component.scss'
})
export class ServiceBoardComponent {
  listCategories: CategoryModel[] = [];
  listService: ServiceModel[] = [];
  selectedCatId: string = '';
  selectedCategory: CategoryModel | null = null;
  constructor(
    private adminService: AdminMainService
  ){ 
  }

  ngOnInit(){
    this.getCategories();
  }

  getCategories() {
      this.adminService.getCategories().subscribe((result: BaseResponseModel) => {
        if (result.isSuccess) {
          this.listCategories = result.value.items as CategoryModel[];
          this.adminService.getService().subscribe((result: BaseResponseModel) => {
            if (result.isSuccess) {
              this.listService = result.value.items as ServiceModel[];
              this.listCategories.forEach(c => {
                let listService = this.listService.filter(s => c.id == s.categoryId);
                if (listService) {
                  c.services = listService;
                }
                this.selectedCatId = this.listCategories[0].id;
                this.selectedCategory = this.listCategories[0] || null;
              })
            }
          })
        }
      })
    }
  
  onCategoryChange(event: any) {
    const selectedCategoryId = event.value;
    this.selectedCategory = this.listCategories.find(category => category.id === selectedCategoryId) || null;
  }
}
