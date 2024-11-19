import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {}; // required
  constructor(){
this.chartOptions={
  chart: {
    type: 'pie'
},
title: {
    text: 'Employee Details'
},
tooltip: {
    valueSuffix: '%'
},
plotOptions: {
    series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
            enabled: true,
            distance: 20
        }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7
            },
            filter: {
                operator: '>',
                property: 'percentage',
                value: 10
            }
        }]
    }
},
series: [
    {
        name: 'Percentage',
        colorByPoint: true,
        data: [
            {
                name: 'Manager',
                y: 20
            },
            {
                name: 'Senior Software Engineers',
                sliced: true,
                selected: true,
                y: 40
            },
            {
                name: 'Testers',
                y: 10
            },
            {
                name: 'Team Lead',
                y: 10
            },
            {
                name: 'mern',
                y: 10
            }
        ]
    }
]
}
  }
}
