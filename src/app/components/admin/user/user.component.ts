import { Component } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { AuthService } from '../../../services/shared/auth.service';
import { AuthorizationModel, RoleModel } from '../../../model/role.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  roleList: RoleModel[] = [];
  selectedRole: RoleModel | null = null;

  constructor(
    private adminService: AdminMainService,
    private authService: AuthService,
    private toastr: ToastrService,
  ){
  }

  ngOnInit() {
    this.authService.getAllRoles().subscribe((res) => {
      if(res.isSuccess){
        this.roleList = res.value as RoleModel[];
        this.selectedRole = this.roleList[0] || null;
      }
    })
  }


  selectRole(role: RoleModel) {
    this.selectedRole = role;
  }


  getDeleteAccess(auth: AuthorizationModel): boolean {
    let a = auth.action.includes("3");
    return a;
  }

  getReadAccess(auth: AuthorizationModel): boolean {
    let a = auth.action.includes("1");
    return a;
  }
  getWriteAccess(auth: AuthorizationModel): boolean {
    let a = auth.action.includes("2");
    return a;
  }
  getCreateAccess(auth: AuthorizationModel): boolean {
    let a = auth.action.includes("0");
    return a;
  }

  saveRole(){

    // if(this.selectedRole){
    //   this.authService.updateRole(this.selectedRole).subscribe((res) => {
    //     if(res.isSuccess){
    //       this.toastr.success("Update role successfully!");
    //     }else{
    //       this.toastr.warning("Update role failed!");
    //     }
    //   })
    // }
  }



}
