import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent implements OnInit {
  public rangeList: Array<any>;
  public stateList: Array<any>;
  public range: any;
  public state: any;
  public emptyTemperatureData: Boolean = false;
  public emptyOilTemperatureData: Boolean = false;
  public emptyMoistureData: Boolean = false;
  public emptyThresholdData: Boolean = false;
  public emptyVibrationData: Boolean = false;
  public visible: Boolean = false;


  multidata: any;
  view: any[] = [1200, 300];
  viewPie: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Time';
  showYAxisLabel = false;
  yAxisLabel = 'Temperature';

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // line, area
  autoScale = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colorSchemeTemperatureChart = {
    domain: ['#a95963']
  };

  colorSchemeSystemChart = {
    // domain: ['#ffa500', '#A10A28', '#5AA454']
    domain: ['#7aa3e5', '#A10A28', '#5AA454']
  };

  colorSchemeOilTemperatureChart = {
    domain: ['#7aa3e5']
  };

  colorSchemeMoistureChart = {
    domain: ['#a27ea8']
  };

  colorSchemeVibrationChart = {
    domain: ['#a8385d']
  };

  constructor(private _dashboardServiceInstance: DashboardService) {
    this.rangeList = [
      {
        'label': '15 Min',
        'value': '15'
      },
      {
        'label': '30 Min',
        'value': '30'
      },
      {
        'label': '1 Hour',
        'value': '60'
      },
      {
        'label': '6 Hour',
        'value': '360'
      },
      {
        'label': '12 Hour',
        'value': '720'
      },
      {
        'label': '1 Day',
        'value': '1440'
      },
      {
        'label': '2 Day',
        'value': '2880'
      }
    ];
    this.stateList = [
      {
        'label': 'Normal',
        'value': 'normal'
      },
      {
        'label': 'Event',
        'value': 'event'
      }
    ];
  }

  ngOnInit() {
    this.range = '15';
    this.state = 'normal';
    this.fetchData();
  }

  fetchTemperatureData() {
    // temperatureService
    this._dashboardServiceInstance.temperatureService(this.range, this.state)
      .subscribe((temperatureChartResponse) => {
        let dataSet = [];
        let temperatureChartData = [];
        // console.log('Length :: ' + temperatureChartResponse.payload.series.data.length);
        // console.log('temperatureChartResponse :: ' + JSON.stringify(temperatureChartResponse));
        if (temperatureChartResponse.payload.series.data.length > 0) {
          let data = temperatureChartResponse.payload.series.data.length - 1;
          for (let i = 0; i <= data; i++) {
            dataSet.push({
              name: new Date(temperatureChartResponse.payload.series.data[i].name),
              value: temperatureChartResponse.payload.series.data[i].value
            });
          }
          temperatureChartData = [{
            'name': temperatureChartResponse.payload.title.text,
            'series': dataSet
          }];
          console.log('temperatureChartData ::: ' + JSON.stringify(temperatureChartData));
          Object.assign(this, { temperatureChartData });
        } else {
          this.emptyTemperatureData = true;
        }
      });
  }

  fetchOilTemperatureData() {
    // oilTemperatureService
    this._dashboardServiceInstance.oilTemperatureService(this.range, this.state)
      .subscribe((oiltemperatureChartResponse) => {
        let dataSet = [];
        if (oiltemperatureChartResponse.payload.series.data.length > 0) {
          let data = oiltemperatureChartResponse.payload.series.data.length - 1
          for (let i = 0; i <= data; i++) {
            dataSet.push({
              name: new Date(oiltemperatureChartResponse.payload.series.data[i].name),
              value: oiltemperatureChartResponse.payload.series.data[i].value
            });
          }
          var oiltemperatureChartData = [{
            'name': oiltemperatureChartResponse.payload.title.text,
            'series': dataSet
          }];
          console.log('oiltemperatureChartData ::: ' + JSON.stringify(oiltemperatureChartData));
          Object.assign(this, { oiltemperatureChartData });
        } else {
          this.emptyOilTemperatureData = true;
        }
      });
  }

  fetchMoistureData() {
    // moistureService
    this._dashboardServiceInstance.moistureService(this.range, this.state)
      .subscribe((moistureChartResponse) => {
        let dataSet = [];
        if (moistureChartResponse.payload.series.data.length > 0) {
          let data = moistureChartResponse.payload.series.data.length - 1;
          for (let i = 0; i <= data; i++) {
            dataSet.push({
              name: new Date(moistureChartResponse.payload.series.data[i].name),
              value: moistureChartResponse.payload.series.data[i].value
            });
          }

          var moistureChartData = [{
            'name': moistureChartResponse.payload.title.text,
            'series': dataSet
          }];
          console.log('moistureChartData ::: ' + JSON.stringify(moistureChartData));
          Object.assign(this, { moistureChartData });
        } else {
          this.emptyMoistureData = true;
        }
      });
  }

  fetchThresholdData() {
    // thresholdService
    this._dashboardServiceInstance.thresholdService(this.range, this.state)
      .subscribe((thresholdChartResponse) => {
        // console.log('thresholdChartResponse :: ' + JSON.stringify(thresholdChartResponse));
        let dataSet = [];
        if (thresholdChartResponse.payload.series.data.length > 0) {
          let data = thresholdChartResponse.payload.series.data.length - 1;
          for (let i = 0; i <= data; i++) {
            dataSet.push({
              name: thresholdChartResponse.payload.series.data[i].name,
              value: thresholdChartResponse.payload.series.data[i].value
            });
          }

          var thresholdChartData = dataSet;
          console.log('thresholdChartData ::: ' + JSON.stringify(thresholdChartData));
          Object.assign(this, { thresholdChartData });
        } else {
          this.emptyThresholdData = true;
        }
      });
  }

  fetchVibrationData() {

    // vibrationService
    this._dashboardServiceInstance.vibrationService(this.range, this.state)
      .subscribe((vibrationChartResponse) => {
        let dataSet = [];
        this.visible = true;

        // console.log('Length :: ' + vibrationChartResponse.payload.series.data.length);
        if (vibrationChartResponse.payload.series.data.length > 0) {
          let data = vibrationChartResponse.payload.series.data.length - 1;
          for (let i = 0; i <= data; i++) {
            if (vibrationChartResponse.payload.series.data[i].value === 'abnormal') {
              dataSet.push({
                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                value: 3
              });
            } else if (vibrationChartResponse.payload.series.data[i].value === 'normal') {
              dataSet.push({
                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                value: 1
              });
            } else if (vibrationChartResponse.payload.series.data[i].value === 'warning') {
              dataSet.push({
                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                value: 2
              });
            }
          }
          var vibrationChartData = [{
            'name': vibrationChartResponse.payload.title.text,
            'series': dataSet
          }];
          console.log('vibrationChartData ::: ' + JSON.stringify(vibrationChartData));
          Object.assign(this, { vibrationChartData });
        } else {
          this.emptyVibrationData = true;
        }
      });
  }

  fetchData() {
    if (this.range === undefined || this.state === undefined) {
      this.range = '15';
      this.state = 'normal';
    }
    this.emptyTemperatureData = false;
    this.emptyOilTemperatureData = false;
    this.emptyMoistureData = false;
    this.emptyThresholdData = false;
    this.emptyVibrationData = false;
    this.visible = false;

    console.log('Range  :: ' + this.range);
    console.log('State  :: ' + this.state);
    this.fetchTemperatureData();
    this.fetchOilTemperatureData();
    this.fetchMoistureData();
    this.fetchThresholdData();
    this.fetchVibrationData();
  }

}