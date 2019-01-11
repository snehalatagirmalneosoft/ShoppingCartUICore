import { Component, OnInit, Pipe, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgModel, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { ISubCategory } from '../SubCategory/SubCategory.interface';
import { SubCategoryService } from '../../Services/subCategory.services';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
    templateUrl: './SubCategory.component.html'
})
export class SubCategoryComponent implements OnInit {
    subCategoryForm: FormGroup;
    setValueForm: FormGroup;
    updateSubCategoryForm: FormGroup;
    subcategories: ISubCategory[];
    ShowMessage: boolean = false;
    message: string;
    filteredItems: ISubCategory[];
    SearchText: string = '';
    pageSize: number = 5;
    categoryData: {};
    category: {};
    display = 'none';
    @ViewChild('btnClose') btnClose: ElementRef; 

    constructor(private _fb: FormBuilder, private router: Router, private _subcategoryservice: SubCategoryService, private _activatedRoute: ActivatedRoute) {    //declaring a constructor whose parameter name is _employeeservice and type is EmployeeService
        this.subCategoryForm = this._fb.group({
            addSubCategoryId: 0,
            addCategoryId: ['', [Validators.required]],
            addSubCategoryName: ['', [Validators.required]]
        })

        this.setValueForm = this._fb.group({
            subCategoryId: 0,
            categoryId: 0,
            subCategoryName: ''           
        })

        this.updateSubCategoryForm = new FormGroup({
            subCategoryId: new FormControl(0),
            categoryId: new FormControl(0),
            subCategoryName: new FormControl('', [Validators.required]),
            isActive: new FormControl(true),
        });
    }

    openModalDialog(subCategoryId: number) {
        debugger;
        this.EditSubCategory(subCategoryId);
        this.GetAllCategory();
        this.display = 'block'; //Set block css
    }

    closeModalDialog() {
        this.display = 'none'; //set none css after close dialog
    }

    ngOnInit() {
        this.GetAllSubCategory();
       // this.GetAllCategory();
    }

    //get sub category list
    GetAllSubCategory() {
        debugger;
        this._subcategoryservice.getSubCategories()
            .subscribe((subcategoryData) => {
                this.subcategories = subcategoryData;
            },
                (error) => {
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                });
    }

    //get category list
    GetAllCategory() {
        debugger;
        this._subcategoryservice.getCategories()
            .subscribe((categoryData) => {
                this.categoryData = categoryData;
            },
                (error) => {
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                });
    }

    //for edit functionality route id using query string to edit component
    EditSubCategory(subCategoryId: number) {
        debugger;
        this._subcategoryservice.getSubCategoryById(subCategoryId)
            .subscribe((categoryValue) => {
                debugger;
                this.category = categoryValue;
                console.log(this.category);
            },
                (error) => {
                    debugger;
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                });
    }

    //delete employee
    DeleteSubCategory(employee: any) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            dangerMode: true
        })
            .then((value: any) => {
                if (value == true) {
                    this._subcategoryservice.deleteSubCategory(employee)
                        .subscribe((successMessage) => this.message = successMessage,
                            (error) => {
                                swal("Error!", "Problem with the service. Please try again after sometime", "error");
                            },
                            () => {
                                debugger;
                                swal("Success!", "Sub category has been deleted successfully.", "success");
                                this.ngOnInit();
                            });
                } else {
                    swal("Cancelled", "Your data is safe!", "error");
                }
            });
    }

    //get category list
    AddSubCategory() {
        debugger;
        if (!this.subCategoryForm.valid) {
            return;
        }
        this.setValueForm.setValue({
            categoryId: this.subCategoryForm.controls['addCategoryId'].value,
            subCategoryId: this.subCategoryForm.controls['addSubCategoryId'].value,
            subCategoryName: this.subCategoryForm.controls['addSubCategoryName'].value
        });
        this._subcategoryservice.createSubCategory(this.setValueForm.value)
            .subscribe((responseMessage) => {
                debugger;
                this.message = responseMessage;
            },
                (error) => {
                    debugger;
                    this.btnClose.nativeElement.click();
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                },
                () => {
                    debugger;
                    this.btnClose.nativeElement.click();
                    swal("Success!", "Category has been added successfully.", "success").then((value: any) => {
                        if (value == true) {
                            this.GetAllSubCategory();
                        }
                    });
                });
    }
    get addSubCategoryName() { return this.subCategoryForm.get('addSubCategoryName'); }
    get addCategoryId() { return this.subCategoryForm.get('addCategoryId'); }

    // change event of drop down at update modal
    onChange(value: any) {
        console.log(value);
        this.updateSubCategoryForm.controls['isActive'].setValue(value);
    }

    //update functionality
    UpdateSubCategory() {
        debugger;
        if (!this.updateSubCategoryForm.valid) {
            return;
        }
        this._subcategoryservice.updateSubCategory(this.updateSubCategoryForm.value)
            .subscribe((successMessage) => {
                this.message = successMessage
            },
                (error) => {
                    debugger;
                    this.closeModalDialog();
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                },
                () => {
                    debugger;
                    this.closeModalDialog();
                    swal("Success!", "Sub category has been updated successfully.", "success").then((value: any) => {
                        if (value == true) {
                            this.GetAllSubCategory();
                        }
                    });
                });
    }
    get subCategoryName() { return this.updateSubCategoryForm.get('subCategoryName'); }

    //Change sort function to this
    direction: number;
    isDesc: boolean = false;
    column: string = 'subCategoryName';
    sort(property: any) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    }


    //search functionality
    FilterByName(SearchText: any) {
        this.filteredItems = [];
        if (this.SearchText != "") {
            this.subcategories.forEach(element => {
                if (element.subCategoryName.toUpperCase().indexOf(this.SearchText.toUpperCase()) > -1) {
                    this.filteredItems.push(element);
                    this.subcategories = this.filteredItems;
                }
            });
        } else {
            this.ngOnInit();
        }
        console.log(this.filteredItems);
    }
}