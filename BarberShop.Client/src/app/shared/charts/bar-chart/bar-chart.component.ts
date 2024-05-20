import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BarChartOptions } from '../pipe-chart/pipe-chart.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  public chartOptions: Partial<BarChartOptions>;
  @Input() series = [];
  @Input() categories = [];
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.categories
      },
      yaxis: {
        title: {
          text: "$ (Collected Amount)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }
 
  
  
}
