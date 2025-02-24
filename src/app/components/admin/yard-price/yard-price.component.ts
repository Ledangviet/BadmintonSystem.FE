import { Component } from '@angular/core';
import { YardTypeModel } from '../../../model/yardType.model';
import { AdminMainService } from '../../../services/admin/admin-main.service';

import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  ColDef,
  CustomEditorModule,
  GridReadyEvent,
  ModuleRegistry,
  RowSelectionOptions,
  RowValueChangedEvent,
  SelectEditorModule,
  TextEditorModule,
  ValidationModule,
} from "ag-grid-community";
import { DynamicInputComponent } from '../../shared/dynamic-input/dynamic-input.component';
import { CategoryModel } from '../../../model/service.model';


ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SelectEditorModule,
  TextEditorModule,
  CustomEditorModule,
  ValidationModule /* Development Only */,
]);


@Component({
  selector: 'app-yard-price',
  standalone: true,
  imports: [
    AgGridAngular,
    DynamicInputComponent
  ],
  templateUrl: './yard-price.component.html',
  styleUrl: './yard-price.component.scss'
})
export class YardPriceComponent {
  public listYardType: YardTypeModel[] = [];
  public selectedYardType: any;




  editType: "fullRow" = "fullRow";
  defaultColDef: ColDef = {
    flex: 10,
  };
  rowSelection: RowSelectionOptions = {
    mode: "multiRow",
  };

  catColDef: ColDef[] = [
    {
      headerName: "Tên ",
      field: "name",
      editable: true
    }
  ] as ColDef[];


  constructor(
    private adminService: AdminMainService
  ) { }

  ngOnInit() {
    this.getYardType();
  }

  getYardType() {
    this.adminService.getYardTypeList(100, 0).subscribe(result => {
      console.log(result)
      if (result.isSuccess) {
        this.listYardType = result.value.items as YardTypeModel[];
        console.log(result)
      }
    })
  }

  onTypeRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data as YardTypeModel;
    console.log(data);
  }

  onTypeSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    this.selectedYardType = selectedRows as YardTypeModel[];
  }

  removeType(){

  }

  addType(){
    
  }
}
