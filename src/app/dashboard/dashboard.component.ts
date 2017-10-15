import { Component, OnInit } from '@angular/core';
import { single, multi } from '../data';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  public intervals: Array<any>;
  public statusList: Array<any>;
  public temperatureChartResponse: any;

  single: any[];
  multi: any[];
  multidata:any;
  visible:Boolean=false;
  view: any[] = [700, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'State';

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // line, area
  autoScale = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _dashboardServiceInstance: DashboardService) {
    this.intervals = ['15 Min', '30 Min', '1 Hour', '6 Hour', '1 Day'];
    this.statusList = ['Normal', 'Warning', 'Critical'];
    //Object.assign(this, { single, multi });
  }

  ngOnInit() {
    this._dashboardServiceInstance.temperatureService()
      .subscribe((temperatureChartResponse) => {
        console.log(JSON.stringify(temperatureChartResponse)+ 'hello-------------=')
        var multi = [
          {
              'name': temperatureChartResponse.payload.title.text,
              'series':temperatureChartResponse.payload.series.data
          }
        ]
      this._dashboardServiceInstance.oilTemperatureService()
      .subscribe((oiltemperatureChartResponse) => {
        console.log(JSON.stringify(oiltemperatureChartResponse)+ 'hello-------------=')
        var multiple = [
          {
              'name': oiltemperatureChartResponse.payload.title.text,
              'series':oiltemperatureChartResponse.payload.series.data
          }
        ]
      this._dashboardServiceInstance.moistureService()
      .subscribe((moistureChartResponse) => {
        console.log(JSON.stringify(moistureChartResponse)+ 'hello-------------=')
       var multidata = [
          {
              'name': moistureChartResponse.payload.title.text,
              'series':moistureChartResponse.payload.series.data
          }
        ]
      this._dashboardServiceInstance.thresholdService()
      .subscribe((thresholdChartResponse) => {
        console.log(JSON.stringify(thresholdChartResponse)+ 'hello-------------=')
        var singleData = thresholdChartResponse.payload.series.data;

      this._dashboardServiceInstance.vibrationService()
      .subscribe((vibrationChartResponse) => {
        this.visible = true;
        console.log(JSON.stringify(vibrationChartResponse)+ 'hello-------------=')
      var single = vibrationChartResponse.payload.series.data
        Object.assign(this, { singleData, single, multidata, multiple, multi});
      });
    });
  });
});
});
  }

}
