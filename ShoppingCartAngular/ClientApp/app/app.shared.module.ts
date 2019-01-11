import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2PaginationModule } from 'ng2-pagination'; 
import { ModalDialogModule } from 'ngx-modal-dialog';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { UserRoleService } from './Services/userRoles.services';
import { UserRoleComponent } from './components/UserRole/UserRole.Component'

import { CategoryService } from './Services/category.services';
import { CategoryComponent } from './components/Category/Category.Component';
import { UserService } from './Services/user.services';
import { UserComponent } from './components/User/User.Component';
import { SubCategoryService } from './Services/subCategory.services';
import { SubCategoryComponent } from './components/SubCategory/SubCategory.component';
import { OrderByData } from '../../ClientApp/app/components/Category/OrderByData.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        UserRoleComponent,
        CategoryComponent,
        UserComponent,
        SubCategoryComponent,
        OrderByData
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'user', component: UserComponent },
            { path: 'user-role', component: UserRoleComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'subcategory', component: SubCategoryComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        Ng2PaginationModule,
        ModalDialogModule.forRoot()
    ],
    providers: [UserRoleService, CategoryService, UserService, SubCategoryService]
})
export class AppModuleShared {
}
