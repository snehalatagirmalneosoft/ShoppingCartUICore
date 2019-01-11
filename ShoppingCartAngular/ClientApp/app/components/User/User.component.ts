import { Component, OnInit, Pipe, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgModel, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { IUser } from '../User/User.interface';
import { UserService } from '../../Services/user.services';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
    templateUrl: './User.component.html'
})
export class UserComponent implements OnInit {
    users: IUser[];
    ShowMessage: boolean = false;
    message: string;
    filteredItems: IUser[];
    SearchText: string = '';
    pageSize: number = 5;
    display = 'none';

    constructor(private router: Router, private _userservice: UserService, private _activatedRoute: ActivatedRoute) {    //declaring a constructor whose parameter name is _employeeservice and type is EmployeeService
        this._userservice = _userservice;
        this.router = router;
    }

    openModalDialog(categoryId: number) {
        debugger;
        this.GetUser(categoryId);
        this.display = 'block'; //Set block css
    }

    closeModalDialog() {
        this.display = 'none'; //set none css after close dialog
    }

    ngOnInit() {
        this.GetAllUsers();
    }

    //get employee list
    GetAllUsers() {
        debugger;
        this._userservice.getUsers()
            .subscribe((userData) => {
                this.users = userData;
            },
                (error) => {
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                });
    }

    //for edit functionality route id using query string to edit component
    GetUser(userId: number) {
        debugger;
        this._userservice.getUserById(userId)
            .subscribe((userData) => {
                this.users = userData
            },
              (error) => {
                  swal("Error!", "Problem with the service. Please try again after sometime", "error");
              });
    }


    //Change sort function to this
    direction: number;
    isDesc: boolean = false;
    column: string = 'firstName';
    sort(property: any) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    }

    //search functionality
    FilterByName(SearchText: any) {
        this.filteredItems = [];
        if (this.SearchText != "") {
            this.users.forEach(element => {
                if (element.firstName.toUpperCase().indexOf(this.SearchText.toUpperCase()) > -1) {
                    this.filteredItems.push(element);
                    this.users = this.filteredItems;
                }
            });
        } else {
            this.ngOnInit();
        }
        console.log(this.filteredItems);
    }
}