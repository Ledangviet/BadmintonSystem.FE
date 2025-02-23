import { Component, model, ViewChild } from '@angular/core';
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
  createGrid,
} from "ag-grid-community";
import { AdminMainService } from '../../../services/admin/admin-main.service';
import BaseResponseModel from '../../../model/base.response.model';
import { CategoryModel, ServiceModel } from '../../../model/service.model';
import { DynamicInputComponent } from '../../shared/dynamic-input/dynamic-input.component';
import { InputType } from '../../../model/enum';
import { InputField } from '../../../model/inputfield.model';
import { AddServiceRequestModel} from '../../../model/addservice.request.model';
import { ToastrService } from 'ngx-toastr';


ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SelectEditorModule,
  TextEditorModule,
  CustomEditorModule,
  ValidationModule /* Development Only */,
]);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    AgGridAngular,
    DynamicInputComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})

export class ServicesComponent {
  listCategories: CategoryModel[] = [];
  listService: ServiceModel[] = [];
  selectedService: ServiceModel[] = [];
  selectedCat: CategoryModel[] = [];

  editType: "fullRow" = "fullRow";
  defaultColDef: ColDef = {
    flex: 10,
  };
  rowSelection: RowSelectionOptions = {
    mode: "multiRow",
  };
  columnDefs: ColDef[] = [
    {
      headerName: "Tên ",
      field: "name",
      editable: true
    },
    {
      headerName: "Giá mua ",
      field: "purchasePrice",
      editable: true
    },
    {
      headerName: "Giá bán ",
      field: "sellingPrice",
      editable: true
    },
    {
      headerName: "Số lương ",
      field: "quantityInStock",
      editable: true
    },
    {
      headerName: "Đơn vị ",
      field: "unit",
      editable: true
    }
  ] as ColDef[];

  catColDef: ColDef[] = [
    {
      headerName: "Tên ",
      field: "name",
      editable: true
    }
  ] as ColDef[];


  //for dynamic input
  @ViewChild('popup') popup!: DynamicInputComponent;
  categoryOptions : string[] = [];
  inputType = InputType;
  fields: InputField[] = [];
  inputTitle = "Thêm dịch vụ "


  constructor(
    private adminService: AdminMainService,
    private toaster: ToastrService
  ) {

  }

  onGridReady(params: GridReadyEvent) {
  }

  ngOnInit() {
    this.getCategories();
  }


  getCategories() {
    this.categoryOptions = [];
    this.adminService.getCategories().subscribe((result: BaseResponseModel) => {
      if (result.isSuccess) {
        this.listCategories = result.value.items as CategoryModel[];
        this.adminService.getService().subscribe((result: BaseResponseModel) => {
          if (result.isSuccess) {
            this.listService = result.value.items as ServiceModel[];
            this.listCategories.forEach(c => {
              this.categoryOptions.push(c.name);
              let listService = this.listService.filter(s => c.id == s.categoryId);
              if (listService) {
                c.services = listService;
              }
            })
          }
        })
      }
    })
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data as ServiceModel;
    this.updateService(data);
  }

  onCatRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data as ServiceModel;
  }

  updateService(service: ServiceModel){
    this.adminService.updateService(service).subscribe( (result: BaseResponseModel) =>{
      if(result.isSuccess) {
        this.toaster.success("Chỉnh sửa thành công !");
        this.getCategories()
      };
    });
  }


  handleSave(data: any) {
    let notNull = Object.values(data).every(value => value !== null);
    if(notNull){
      let model = new AddServiceRequestModel(
        data.quantityInStock,
        this.getCategoryByName(data.category),
        0,
        [{name: data.name,purchasePrice: data.purchasePrice,sellingPrice: data.sellingPrice,unit: data.unit,quantityPrinciple:1}]
      );
      this.adminService.addService(model).subscribe(result =>{
        if(result.isSuccess) {
          this.toaster.success("Thêm dịch vụ thành công!");
          this.getCategories();
        }
      });
    }
  }

  getCategoryByName(name: string){
    return this.listCategories.filter( c => c.name == name)[0].id;
  }

  openPopup() {
    this.fields = [
      { type: InputType.String, label: 'name', fieldTitle: 'Tên', value: '' },
      { type: InputType.Number, label: 'purchasePrice', fieldTitle: 'Giá mua ', value: null },
      { type: InputType.Number, label: 'sellingPrice', fieldTitle: 'Giá bán ', value: null },
      { type: InputType.Number, label: 'quantityInStock', fieldTitle: 'Số lượng ', value: null },
      { type: InputType.String, label: 'unit', fieldTitle: 'Đơn vị ', value: null },
      { type: InputType.Select, label: 'category', fieldTitle: 'Danh mục ', value: '', options: this.categoryOptions }]
    this.popup.open();
  }

  onSelectionChanged($event: any){
    const selectedRows = $event.api.getSelectedRows();
    this.selectedService = selectedRows as ServiceModel[];
  }

  onCatSelectionChanged($event: any){
    const selectedRows = $event.api.getSelectedRows();
    this.selectedCat = selectedRows as CategoryModel[];
  }

  removeService(){
    console.log('list selected:',  this.selectedService );
    let ids: string[] = [];
    this.selectedService.forEach( s => {
      ids.push(s.id);
    })
    console.log(JSON.stringify(ids));
    this.adminService.removeService(ids).subscribe(result =>{
      if(result.isSuccess){
        this.toaster.success("Xóa dịch vụ thành công !");
        this.getCategories();
      }
    })
  }

}
