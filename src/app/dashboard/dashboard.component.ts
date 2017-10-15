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
  multidata: any;
  visible: Boolean = false;
  view: any[] = [700, 300];
  viewPie: any[] = [400, 350];

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
  autoScale = false;

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

        var dataHave = []
        if (temperatureChartResponse.payload.series.data.length > 0) {
          console.log("----------kkkkdk---------" + temperatureChartResponse.payload.series.data.length)
          let data = temperatureChartResponse.payload.series.data.length - 1
          for (let i = 0; i <= data; i++) {
            console.log(JSON.stringify(temperatureChartResponse.payload.series.data[i]) + "------helllo-------------");
            dataHave.push({
              name: new Date(temperatureChartResponse.payload.series.data[i].name),
              value: temperatureChartResponse.payload.series.data[i].value
            });
          }
          console.log(JSON.stringify(dataHave) + 'hello----------abc---=')
        }
        var multi = [
          {
            'name': temperatureChartResponse.payload.title.text,
            'series': dataHave
          }
        ]
        this._dashboardServiceInstance.oilTemperatureService()
          .subscribe((oiltemperatureChartResponse) => {
            var dataHave = []
            if (oiltemperatureChartResponse.payload.series.data.length > 0) {
              console.log("----------kkkkdk---------" + oiltemperatureChartResponse.payload.series.data.length)
              let data = oiltemperatureChartResponse.payload.series.data.length - 1
              for (let i = 0; i <= data; i++) {
                console.log(JSON.stringify(oiltemperatureChartResponse.payload.series.data[i]) + "------helllo-------------");
                dataHave.push({
                  name: new Date(oiltemperatureChartResponse.payload.series.data[i].name),
                  value: oiltemperatureChartResponse.payload.series.data[i].value
                })
              }
              console.log(JSON.stringify(dataHave) + 'hello----------abc---=')
            }
            var multiple = [
              {
                'name': oiltemperatureChartResponse.payload.title.text,
                'series': dataHave
              }
            ]
            this._dashboardServiceInstance.moistureService()
              .subscribe((moistureChartResponse) => {
                var dataHave = []
                if (moistureChartResponse.payload.series.data.length > 0) {
                  console.log("----------kkkkdk---------" + moistureChartResponse.payload.series.data.length)
                  let data = moistureChartResponse.payload.series.data.length - 1
                  for (let i = 0; i <= data; i++) {
                    console.log(JSON.stringify(moistureChartResponse.payload.series.data[i]) + "------helllo-------------");
                    dataHave.push({
                      name: new Date(moistureChartResponse.payload.series.data[i].name),
                      value: moistureChartResponse.payload.series.data[i].value
                    })
                  }
                  console.log(JSON.stringify(dataHave) + 'hello----------abc---=')
                }
                var multidata = [
                  {
                    'name': moistureChartResponse.payload.title.text,
                    'series': dataHave
                  }
                ]
                this._dashboardServiceInstance.thresholdService()
                  .subscribe((thresholdChartResponse) => {
                    console.log(JSON.stringify(thresholdChartResponse) + 'hello-------------=')
                    var singleData = thresholdChartResponse.payload.series.data;

                    this._dashboardServiceInstance.vibrationService()
                      .subscribe((vibrationChartResponse) => {
                        this.visible = true;
                        var dataHave = []
                        if (vibrationChartResponse.payload.series.data.length > 0) {
                          console.log("----------kkkkdk---------" + vibrationChartResponse.payload.series.data.length)
                          let data = vibrationChartResponse.payload.series.data.length - 1
                          for (let i = 0; i <= data; i++) {
                            if (vibrationChartResponse.payload.series.data[i].value === 'abnormal') {
                              console.log(JSON.stringify(vibrationChartResponse.payload.series.data[i]) + "------helllo-------------");
                              dataHave.push({
                                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                                value: 0
                              })
                            } else if (vibrationChartResponse.payload.series.data[i].value === 'normal') {
                              console.log(JSON.stringify(vibrationChartResponse.payload.series.data[i]) + "------helllo-------------");
                              dataHave.push({
                                name: new Date(vibrationChartResponse.payload.series.data[i].name),
                                value: 1
                              })
                            }

                          }
                          console.log(JSON.stringify(dataHave) + 'hello----------abc---=')
                        }
                        var single = dataHave
                        Object.assign(this, { singleData, single, multidata, multiple, multi });
                      });
                  });
              });
          });
      });
  }

}
