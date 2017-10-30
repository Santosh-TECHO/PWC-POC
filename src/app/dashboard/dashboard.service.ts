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

  temperatureService(range, type): Observable<any> {
    let serviceUrl = this.serverUrl + 'cesc/chart/temperature?type=' + type + '&range=' + range;
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  moistureService(range, type): Observable<any> {
    let serviceUrl = this.serverUrl + 'cesc/chart/moisture?type=' + type + '&range=' + range;
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  oilTemperatureService(range, type): Observable<any> {
    let serviceUrl = this.serverUrl + 'cesc/chart/oil-temperature?type=' + type + '&range=' + range;
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  thresholdService(range, type): Observable<any> {
    let serviceUrl = this.serverUrl + 'cesc/chart/threshold?type=' + type + '&range=' + range;
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  vibrationService(range, type): Observable<any> {
    let serviceUrl = this.serverUrl + 'cesc/chart/vibration?type=' + type + '&range=' + range;
    console.log('serviceUrl :: ' + serviceUrl);
    return this._http.get(serviceUrl, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
