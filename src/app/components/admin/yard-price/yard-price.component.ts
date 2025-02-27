import { Component, ViewChild } from '@angular/core';
import { YardTypeModel } from '../../../model/yardType.model';
import { AdminMainService } from '../../../services/admin/admin-main.service';

import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  ColDef,
  CustomEditorModule,
  ModuleRegistry,
  RowSelectionOptions,
  RowValueChangedEvent,
  SelectEditorModule,
  TextEditorModule,
  ValidationModule,
} from "ag-grid-community";
import { DynamicInputComponent } from '../../shared/dynamic-input/dynamic-input.component';
import { ToastrService } from 'ngx-toastr';
import { InputType } from '../../../model/enum';
import { InputField } from '../../../model/inputfield.model';


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
  public selectedYardType: YardTypeModel[] = [];
  public inputTitle = "Thêm loại sân "

  fields: InputField[] = [];
  @ViewChild('addtypepopup') addtypepopup!: DynamicInputComponent;


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
    private adminService: AdminMainService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getYardType();
  }

  refreshData(){
    this.getYardType();
  }

  getYardType() {
    this.adminService.getYardTypeList(100, 0).subscribe(result => {
      if (result.isSuccess) {
        this.listYardType = result.value.items as YardTypeModel[];
      }
    })
  }

  onTypeRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data as YardTypeModel;
    this.adminService.updateYardType(data.id, data.name).subscribe(result => {
      if (result.isSuccess) {
        this.toastr.success("Sửa loại sân thành công !")
        this.refreshData();
      }
    });
  }

  onTypeSelectionChanged(event: any) {

    const selectedRows = event.api.getSelectedRows();
    this.selectedYardType = selectedRows as YardTypeModel[];
    console.log(this.selectedYardType)
  }

  removeType() {
    let ids: string[] = [];
    this.selectedYardType.forEach(s => {
      ids.push(s.id);
    })
    console.log(JSON.stringify(ids));
    this.adminService.removeYardType(ids).subscribe(result => {
      if (result.isSuccess) {
        this.toastr.success("Xóa loại sân thành công !");
        this.refreshData();
      }
    })
  }

  addType() {
    this.fields = [
      { type: InputType.String, label: 'name', fieldTitle: 'Tên', value: '' },]
    this.addtypepopup.open();
  }

  handleSaveType(event: any) {
    this.adminService.addYardType(event).subscribe(result => {
      console.log(result);
      if (result.isSuccess) {
        this.toastr.success("Thêm loại sân thành công!");
        this.refreshData();
      }
    });
  }
}
