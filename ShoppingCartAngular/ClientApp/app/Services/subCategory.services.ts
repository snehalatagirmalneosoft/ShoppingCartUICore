import { Injectable } from '@angular/core';
import { ISubCategory } from '../components/SubCategory/SubCategory.interface'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';


@Injectable()
export class SubCategoryService {
    constructor(private _http: Http) { }

    getSubCategories(): Observable<ISubCategory[]> {
        return this._http.get("http://localhost:57626/api/SubCategoryAPI/GetSubCategoryList")
            .map((response: Response) => <ISubCategory[]>response.json())
            .catch(this.handleError);
    }

    getSubCategoryById(subCategoryId: number): Observable<ISubCategory[]> {
        debugger;
        return this._http.get("http://localhost:57626/api/SubCategoryAPI/GetSubCategoryById?SubCategoryId=" + subCategoryId)
            .map((response: Response) => <ISubCategory[]>response.json())
            .catch(this.handleError);
    }

    deleteSubCategory(subCategoryId: number): Observable<string> {
        return this._http.delete("http://localhost:57626/api/SubCategoryAPI/DeleteSubCategory?SubCategoryId=" + subCategoryId)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    createSubCategory(subCategory: any): Observable<string> {
        debugger;
        return this._http.post("http://localhost:57626/api/SubCategoryAPI/AddSubCategory", subCategory)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


    updateSubCategory(subCategory: any): Observable<string> {
        debugger;
        return this._http.put("http://localhost:57626/api/SubCategoryAPI/UpdateSubCategory", subCategory)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getCategories(): Observable<ISubCategory[]> {
        return this._http.get("http://localhost:57626/api/CategoryAPI/GetCategoryList")
            .map((response: Response) => <ISubCategory[]>response.json())
            .catch(this.handleError);
    }
    handleError(error: Response) {
        return Observable.throw(error);
    }

}