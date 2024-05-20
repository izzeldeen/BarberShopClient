import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";


@Component({
  selector: 'app-pipe-chart',
  templateUrl: './pipe-chart.component.html',
  styleUrls: ['./pipe-chart.component.scss']
})
export class PipeChartComponent implements OnChanges {
  public chartOptions: Partial<ChartOptions>;
  @Input() series = [];
  @Input() labels = [];
  constructor() {
  
   }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.labels && this.series){
      this.chartOptions = {
        series: this.series,
        chart: {
          width: 380,
          type: "pie"
        },
        labels: this.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
      };
    }
  
  }
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
