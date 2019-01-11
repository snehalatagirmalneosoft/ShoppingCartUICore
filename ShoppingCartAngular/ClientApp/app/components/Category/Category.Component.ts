import { Component, OnInit, Pipe, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgModel, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { ICategory } from '../Category/Category.interface';
import { CategoryService } from '../../Services/category.services';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
    templateUrl: './Category.component.html',
})
export class CategoryComponent implements OnInit {
    categoryForm: FormGroup;
    setValueForm: FormGroup;
    updateForm: FormGroup;
    categories: ICategory[];
    category: ICategory[];
    ShowMessage: boolean = false;
    message: string;
    filteredItems: ICategory[];
    SearchText: string = '';
    pageSize: number = 5;
    display = 'none';
    errorMessage: any;
    @ViewChild('btnClose') btnClose: ElementRef; 


    constructor(private _fb: FormBuilder, private router: Router, private _categoryservice: CategoryService, private _activatedRoute: ActivatedRoute) {    //declaring a constructor whose parameter name is _categoryservice and type is CategoryService
        this.categoryForm = this._fb.group({
            addCategoryId: 0,
            addCategoryName: ['', [Validators.required]]
        })

        this.setValueForm = this._fb.group({
            categoryId: 0,
            categoryName: ''
        })

        this.updateForm = new FormGroup({
            categoryId: new FormControl(0),
            categoryName: new FormControl('', [Validators.required]),
            isActive: new FormControl(true),
        });
    }

    openModalDialog(categoryId: number) {
        debugger;
        this.EditCategory(categoryId);
        this.display = 'block'; //Set block css
    }

    closeModalDialog() {
        this.display = 'none'; //set none css after close dialog
    }
 
    ngOnInit() {
        this.GetCategories();
    }

    //get category list
    GetCategories() {
        debugger;
        this._categoryservice.getCategories()
            .subscribe((categories) => {
                debugger;
                this.categories = categories;
            },
                (error) => {
                    debugger;
                    swal("Error!", "Problem with the service. Please try again after sometime", "error");
                });
    }


    //get category list
    EditCategory(categoryId: number) {
        debugger;
        this._categoryservice.getCategoryById(categoryId)
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

    //get category list
    DeleteCategory(categoryId: number) {
        debugger;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            dangerMode: true
        })
            .then((value: any) => {
                if (value == true) {
                    this._categoryservice.deleteCategoryById(categoryId)
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
    AddCategory() {
        debugger;
        if (!this.categoryForm.valid) {
            return;
        }
        this.setValueForm.setValue({
            categoryId: this.categoryForm.controls['addCategoryId'].value,
            categoryName: this.categoryForm.controls['addCategoryName'].value
        });
        this._categoryservice.addCategory(this.setValueForm.value)
            .subscribe((categoryValue) => {
                debugger;
                this.message = categoryValue;
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
                            this.GetCategories();
                        }
                    });
                });
    }
    get addCategoryName() { return this.categoryForm.get('addCategoryName'); }


    // change event of drop down at update modal
    onChange(value:any) {
        console.log(value);
        this.updateForm.controls['isActive'].setValue(value);
    }

    //update functionality
    UpdateCategory() {
        debugger;
        if (!this.updateForm.valid) {
            return;
        }       
        this._categoryservice.updateCategory(this.updateForm.value)
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
                            this.GetCategories();
                        }
                    });
                });
    }
    get categoryName() { return this.updateForm.get('categoryName'); }


    //Change sort function to this
    direction: number;
    isDesc: boolean = false;
    column: string = 'categoryName';
    sort(property: any) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    }


    //search functionality
    FilterByName(SearchText: any) {
        debugger;
        this.filteredItems = [];
        if (this.SearchText != "") {
            this.categories.forEach(element => {
                if (element.categoryName.toUpperCase().indexOf(this.SearchText.toUpperCase()) > -1) {
                    this.filteredItems.push(element);
                    this.categories = this.filteredItems;
                }
            });
        }
        else
        {
            this.ngOnInit();
        }
        console.log(this.filteredItems);
    }
}
