import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserRoleService {
    myAppUrl: string = "http://localhost:57626/api/TestNew";

    constructor(private _http: Http) {
    }

    saveUserRoles(userRole: any) {
        debugger
        return this._http.post(this.myAppUrl, userRole)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}  