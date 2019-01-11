import { Injectable } from '@angular/core';
import { IUser } from '../components/User/User.interface';
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class UserService {
    constructor(private _http: Http) { }

    getUsers(): Observable<IUser[]> {
        return this._http.get("http://localhost:57626/api/UserAPI/GetUserList")
            .map((response: Response) => <IUser[]>response.json())
            .catch(this.handleError);
    }

    getUserById(userId: number): Observable<IUser[]> {
        return this._http.get("http://localhost:57626/api/UserAPI/GetUserById?Id=" + userId)
            .map((response: Response) => <IUser[]>response.json())
            .catch(this.handleError);
    }
    handleError(error: Response) {
        return Observable.throw(error);
    }

}