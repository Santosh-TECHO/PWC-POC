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

  multidata: any;
  visible: Boolean = false;
  view: any[] = [1200, 300];
  viewPie: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
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
  autoScale = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colorSchemeTemperatureChart = {
    domain: ['#a95963']
  };

  colorSchemeSystemChart = {
    domain: ['#ffa500', '#A10A28', '#5AA454']
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
        'value': '900'
      },
      {
        'label': '30 Min',
        'value': '1800'
      },
      {
        'label': '1 Hour',
        'value': '3600'
      },
      {
        'label': '6 Hour',
        'value': '21600'
      },
      {
        'label': '1 Day',
        'value': '86400'
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
    this.fetchData();
  }

  fetchData() {
    console.log('Range  :: ' + this.range);
    console.log('State  :: ' + this.state);

    // temperatureService
    this._dashboardServiceInstance.temperatureService(this.range, this.state)
      .subscribe((temperatureChartResponse) => {
        var dataHave = [];
        if (temperatureChartResponse.payload.series.data.length > 0) {
          let data = temperatureChartResponse.payload.series.data.length - 1;
          console.log('Length :: ' + data);
          for (let i = data; i <= data; i++) {
            dataHave.push({
              name: new Date(temperatureChartResponse.payload.series.data[i].name),
              value: temperatureChartResponse.payload.series.data[i].value
            });
          }
        }
        var temperatureChartData = [{
          'name': temperatureChartResponse.payload.title.text,
          'series': dataHave
        }];
        Object.assign(this, {
          temperatureChartData
        });

        // oilTemperatureService
        this._dashboardServiceInstance.oilTemperatureService(this.range, this.state)
          .subscribe((oiltemperatureChartResponse) => {
            var dataHave = [];
            if (oiltemperatureChartResponse.payload.series.data.length > 0) {
              let data = oiltemperatureChartResponse.payload.series.data.length - 1
              for (let i = 0; i <= data; i++) {
                dataHave.push({
                  name: new Date(oiltemperatureChartResponse.payload.series.data[i].name),
                  value: oiltemperatureChartResponse.payload.series.data[i].value
                });
              }
            }
            var oiltemperatureChartData = [{
              'name': oiltemperatureChartResponse.payload.title.text,
              'series': dataHave
            }];
            Object.assign(this, {
              oiltemperatureChartData
            });

            // moistureService
            this._dashboardServiceInstance.moistureService(this.range, this.state)
              .subscribe((moistureChartResponse) => {
                var dataHave = []
                if (moistureChartResponse.payload.series.data.length > 0) {
                  let data = moistureChartResponse.payload.series.data.length - 1;
                  for (let i = 0; i <= data; i++) {
                    dataHave.push({
                      name: new Date(moistureChartResponse.payload.series.data[i].name),
                      value: moistureChartResponse.payload.series.data[i].value
                    });
                  }
                }
                var moistureChartData = [{
                  'name': moistureChartResponse.payload.title.text,
                  'series': dataHave
                }];
                Object.assign(this, {
                  moistureChartData
                 });

                // thresholdService
                this._dashboardServiceInstance.thresholdService(this.range, this.state)
                  .subscribe((thresholdChartResponse) => {
                    var thresholdChartData = [];
                    if (thresholdChartResponse.payload.series.data.length > 0) {
                      let data = thresholdChartResponse.payload.series.data.length - 1;
                      for (let i = 0; i <= data; i++) {
                        thresholdChartData.push({
                          name: thresholdChartResponse.payload.series.data[i].name,
                          value: thresholdChartResponse.payload.series.data[i].value
                        });
                      }
                    }
                    Object.assign(this, {
                      thresholdChartData
                    });

                    // vibrationService
                    this._dashboardServiceInstance.vibrationService(this.range, this.state)
                      .subscribe((vibrationChartResponse) => {
                        this.visible = true;
                        var dataHave = [];
                        console.log('Length :: ' + vibrationChartResponse.payload.series.data.length);
                        if (vibrationChartResponse.payload.series.data.length > 0) {
                          let data = vibrationChartResponse.payload.series.data.length - 1;
                          for (let i = 0; i <= data; i++) {
                            if (vibrationChartResponse.payload.series.data[i].value === 'abnormal') {
                              dataHave.push({
                                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                                value: 3
                              });
                            } else if (vibrationChartResponse.payload.series.data[i].value === 'normal') {
                              dataHave.push({
                                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                                value: 1
                              });
                            } else if (vibrationChartResponse.payload.series.data[i].value === 'warning') {
                              dataHave.push({
                                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                                value: 2
                              });
                            }
                          }
                        }
                        var vibrationChartData = dataHave;
                        // console.log('temperatureChartData :: ' + JSON.stringify(temperatureChartData));
                        // console.log('oiltemperatureChartData :: ' + JSON.stringify(oiltemperatureChartData));
                        // console.log('moistureChartData :: ' + JSON.stringify(moistureChartData));
                        // console.log('thresholdChartData :: ' + JSON.stringify(thresholdChartData));
                        // console.log('vibrationChartData :: ' + JSON.stringify(vibrationChartData));
                        // bind data to chart
                        Object.assign(this, {
                          vibrationChartData
                        });
                      });
                  });
              });
          });
      });
  }

}