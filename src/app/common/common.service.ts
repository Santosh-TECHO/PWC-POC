import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CommonService {
    responseBody: any;
    // serverUrl = 'http://cesc-922705458.ap-south-1.elb.amazonaws.com/';
    serverUrl = 'http://cescnlb-50a7daa50eb135ee.elb.ap-south-1.amazonaws.com/';
    headers = new Headers({ 'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'});
    options = new RequestOptions({ headers: this.headers });

    extractData(res: Response | any) {
        let body = res.json();
        return body || {};
    }


    handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}