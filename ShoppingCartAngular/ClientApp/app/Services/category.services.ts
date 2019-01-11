import { Injectable } from '@angular/core';
import { ICategory } from '../components/Category/category.interface';
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';


@Injectable()
export class CategoryService {
    constructor(private _http: Http) { }

    getCategories(): Observable<ICategory[]> {
        debugger;
        return this._http.get("http://localhost:57626/api/CategoryAPI/GetCategoryList")
            .map((response: Response) => <ICategory[]>response.json())
            .catch(this.handleError);
    }

    getCategoryById(categoryId: number): Observable<ICategory[]> {
        return this._http.get("http://localhost:57626/api/CategoryAPI/GetCategoryById?CategoryId=" + categoryId)
            .map((response: Response) => <ICategory[]>response.json())
            .catch(this.handleError);
    }

    addCategory(category: any): Observable<string> {
        return this._http.post("http://localhost:57626/api/CategoryAPI/AddCategory", category)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    updateCategory(category: any): Observable<string> {
        return this._http.put("http://localhost:57626/api/CategoryAPI/UpdateCategory", category)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    deleteCategoryById(categoryId: number): Observable<string> {
        return this._http.delete("http://localhost:57626/api/CategoryAPI/DeleteCategory?CategoryId=" + categoryId)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        return Observable.throw(error);
    }

}