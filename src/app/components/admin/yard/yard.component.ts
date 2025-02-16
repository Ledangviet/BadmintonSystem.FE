import { Component } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { YardModel } from '../../../model/yard.model';
import { YardTypeModel } from '../../../model/yardType.model';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, RowSelectionMode } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { YardTableDataModel } from '../../../model/yardtabledata.model';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-yard',
  standalone: true,
  imports: [
    AgGridAngular
  ],
  templateUrl: './yard.component.html',
  styleUrl: './yard.component.scss'
})

export class YardComponent {
  public tableData: YardTableDataModel[] = [];
  public yardList: YardModel[] = [];
  public yardTypeList: YardTypeModel[] = [];

  constructor(
    private adminService: AdminMainService
  ) { }
  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'type' },
    { field: 'status' },
    { field: 'createdDate' },
    { field: 'modifiedDate' },
    { field: 'createdBy' },
    { field: 'modifiedBy' }
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };
  ngOnInit() {
    this.adminService.getYardTypeList(10, 0).subscribe((result) => {
      if (result.isSuccess) {
        this.yardTypeList = result.value.items as YardTypeModel[];
      }
      this.adminService.getYardList().subscribe(result => {
        if (result.isSuccess) {
          this.yardList = result.value.items as YardModel[];
          this.tableData = this.yardList.map((yard: YardModel) => {
            return new YardTableDataModel(yard.name, this.getYardTypeById(yard.yardTypeId), yard.isStatus == 1 ? 'Available' : 'Un-available', this.newformatDate(yard.createdDate ?? ''), this.newformatDate(yard.modifiedDate ?? ''), yard.createdBy, yard.modifiedBy || "N/A")
          })
        }
      })
    })
  }


  getYardTypeById(id: string) {
    let type = this.yardTypeList.filter(t => t.id == id);
    if (type.length > 0) {
      return type[0].name;
    }
    return "";
  }

  newformatDate(dateString: string): string {
    if (dateString == '') {
      return "N/A";
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

}
