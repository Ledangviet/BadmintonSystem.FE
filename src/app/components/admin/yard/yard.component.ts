import { Component, ViewChild } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { YardModel } from '../../../model/yard.model';
import { YardTypeModel } from '../../../model/yardType.model';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, ISelectCellEditorParams, RowSelectionMode, RowSelectionOptions, RowValueChangedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { YardTableDataModel } from '../../../model/yardtabledata.model';
import { MissionResultRenderer } from '../../shared/custom-control/missionResultRender.component';
import { InputType } from '../../../model/enum';
import { DynamicInputComponent } from "../../shared/dynamic-input/dynamic-input.component";
import { InputField } from '../../../model/inputfield.model';
import { ToastrService } from 'ngx-toastr';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-yard',
  standalone: true,
  imports: [
    AgGridAngular,
    DynamicInputComponent
  ],
  templateUrl: './yard.component.html',
  styleUrl: './yard.component.scss'
})

export class YardComponent {
  public tableData: YardTableDataModel[] = [];
  public yardList: YardModel[] = [];
  public yardTypeList: YardTypeModel[] = [];
  public selectedYard: YardModel[] = [];
  public inputTitle = "Thêm sân ";
  public typeOptions: string[] = [];

  fields: InputField[] = [];
  @ViewChild('addyardpopup') addyardpopup!: DynamicInputComponent;



  constructor(
    private adminService: AdminMainService,
    private toastr: ToastrService
  ) { }


  colDefs: ColDef[] = [
    {
      field: "name",
      headerName: "Tên ",
      editable: true
    },
    {
      field: "type",
      headerName: "Loại Sân ",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ['English', 'Spanish', 'French', 'Portuguese', '(other)'],
      } as ISelectCellEditorParams,
    },
    {
      field: "status",
      headerName: "Trạng thái ",
      cellRenderer: MissionResultRenderer,
    }
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };

  editType: "fullRow" = "fullRow";
  rowSelection: RowSelectionOptions = {
    mode: "multiRow",
  };


  ngOnInit() {
    this.refreshData();
  }

  refreshColDef() {
    this.colDefs = [
      {
        field: "name",
        headerName: "Tên ",
        editable: true
      },
      {
        field: "type",
        headerName: "Loại Sân ",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: this.typeOptions,
        } as ISelectCellEditorParams,
      },
      {
        field: "status",
        headerName: "Trạng thái ",
        cellRenderer: MissionResultRenderer,
      }
    ];
  }
  refreshData() {
    this.adminService.getYardTypeList(10, 0).subscribe((result) => {
      if (result.isSuccess) {
        this.yardTypeList = result.value.items as YardTypeModel[];
        this.typeOptions = this.yardTypeList.map(yardType => yardType.name);
        this.refreshColDef();
      }
      this.adminService.getYardList().subscribe(result => {
        if (result.isSuccess) {
          this.yardList = result.value.items as YardModel[];
          this.tableData = this.yardList.map((yard: YardModel) => {
            return new YardTableDataModel(yard.name, this.getYardTypeById(yard.yardTypeId), yard.isStatus == 1 ? true : false, this.newformatDate(yard.createdDate ?? ''), this.newformatDate(yard.modifiedDate ?? ''), yard.createdBy, yard.modifiedBy || "N/A",yard.id)
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

  addYard() {
    this.fields = [
      { type: InputType.String, label: 'name', fieldTitle: 'Tên', value: '' },
      { type: InputType.Select, label: 'type', fieldTitle: 'Loại sân ', value: '', options: this.typeOptions }]
    this.addyardpopup.open();
  }

  removeYard() {

  }

  getYardTypeIdByName(name: string) {
    let types = this.yardTypeList.filter(t => t.name == name);
    if (types.length > 0) return types[0].id;
    return "";
  }

  handleSaveYard(event: any) {
    this.adminService.addYard(event.name, this.getYardTypeIdByName(event.type)).subscribe(result => {
      console.log(result);
      if (result.isSuccess) {
        this.toastr.success("Thêm sân thành công!");
        this.refreshData();
      }
    });
  }

  onYardSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    this.selectedYard = selectedRows as YardModel[];
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    const data = event.data;
    console.log(data);
    this.adminService.updateYard(data.id,data.name,this.getYardTypeIdByName(data.type)).subscribe( result =>{
      if(result.isSuccess){
        this.toastr.success("Sửa thông tin sân thành công !")
      }
    })
  }
}

