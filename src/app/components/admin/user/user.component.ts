import { Component } from '@angular/core';
import { AdminMainService } from '../../../services/admin/admin-main.service';
import { AuthService } from '../../../services/shared/auth.service';
import { AuthorizationModel, RoleModel } from '../../../model/role.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

interface User {
  roles: string[];
  userName: string;
  email: string;
  fullName: string;
  dateOfBirth?: Date | null;
  phoneNumber?: string | null;
  gender: number;
  avatarUrl: string;
  id: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userList: User[] = [];
  roleList: RoleModel[] = [];
  selectedRole: RoleModel | null = null;
  selectedUser: User | null = null;
  userForm: FormGroup;
  selectedUserRole: RoleModel[] = [];

  constructor(
    private adminService: AdminMainService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      dateOfBirth: [null],
      phoneNumber: [''],
      gender: [null, [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.authService.getAllRoles().subscribe((res) => {
      if (res.isSuccess) {
        this.roleList = res.value as RoleModel[];
        this.selectedRole = this.roleList[0] || null;
      }
    })

    this.getAllUser();
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

  getAllUser() {
    this.authService.getAllUsers().subscribe((res) => {
      if (res.isSuccess) {
        this.userList = res.value.items as User[];
      } else {
        this.toastr.warning("Get user list failed!");
      }
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.selectedUserRole = user.roles.map(role => {
      return this.roleList.find(r => r.roleName.toLowerCase() === role.toLowerCase()) || null;
    }).filter(role => role !== null) as RoleModel[];
    this.userForm.patchValue({
      userName: user.userName,
      email: user.email,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      gender: user.gender
    });
  }

  isRoleSelected(role: RoleModel) {
    if (this.selectedUserRole.includes(role)) {
      return true;
    }
    return false;
  }

  saveUserRole() {
    let userRole = "";

    //save user role
    if (this.selectedUser) {
      let email = this.selectedUser.email;
      let roleList = this.selectedUserRole.map(role => {
        return role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1).toLowerCase();
      });

      this.authService.updateUserRole(email, roleList).subscribe((res) => {
        if (res.isSuccess) {
          this.toastr.success("Lưu thông tin thành công!");
          this.getAllUser();
        } else {
          this.toastr.error("Có lỗi xảy ra!");
        }
      });
    }
  }

  roleSelectedChange(role: RoleModel) {
    if (this.selectedUserRole.includes(role)) {
      this.selectedUserRole = this.selectedUserRole.filter(r => r !== role);
    }
    else {
      this.selectedUserRole.push(role);
    }
  }

}
