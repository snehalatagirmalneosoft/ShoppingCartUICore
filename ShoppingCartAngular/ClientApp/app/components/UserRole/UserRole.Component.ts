import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRoleService } from '../../Services/userRoles.services'
 

@Component({
    templateUrl: './UserRole.component.html'
})

export class UserRoleComponent {
    userRoleForm: FormGroup;
    roleId: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _userRoleService: UserRoleService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.roleId = this._avRoute.snapshot.params["id"];
        }

        this.userRoleForm = this._fb.group({
            roleId: 0,
            roleName: ['', [Validators.required]],
        })
    }

    saveUserRole() {
        debugger
        if (!this.userRoleForm.valid) {
            return;
        }
        this._userRoleService.saveUserRoles(this.userRoleForm.value)
                .subscribe((data) => {
                   // this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error)
    }
    cancel() {
        //this._router.navigate(['/fetch-employee']);
    }
    get roleName() { return this.userRoleForm.get('roleName'); }
}  