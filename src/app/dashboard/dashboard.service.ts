import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { CommonService } from '../common/common.service';

@Injectable()
export class DashboardService extends CommonService {

  data: any;
  option: any;
  constructor(private _http: Http) {
    super();
  }

  temperatureService(): Observable<any> {
    let serviceUrl = 'http://cesc-922705458.ap-south-1.elb.amazonaws.com/cesc/chart/temperature?type=event&range=1800';
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  moistureService(): Observable<any> {
    let serviceUrl = 'http://cesc-922705458.ap-south-1.elb.amazonaws.com/cesc/chart/moisture?type=event&range=1800';
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  oilTemperatureService(): Observable<any> {
    let serviceUrl = 'http://cesc-922705458.ap-south-1.elb.amazonaws.com/cesc/chart/oil-temperature?type=event&range=1800';
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  thresholdService(): Observable<any> {
    let serviceUrl = 'http://cesc-922705458.ap-south-1.elb.amazonaws.com/cesc/chart/threshold?range=1800';
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  vibrationService(): Observable<any> {
    let serviceUrl = 'http://cesc-922705458.ap-south-1.elb.amazonaws.com/cesc/chart/vibration?range=1800';
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
