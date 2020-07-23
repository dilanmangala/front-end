// import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
// import * as Chartist from 'chartist';
// import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
// declare var require: any;
// export interface Chart {
//   type: ChartType;
//   data: Chartist.IChartistData;
//   options?: any;
//   responsiveOptions?: any;
//   events?: ChartEvent;
// }
// // const data: any = require('./data.json');
// @Component({
//   selector: 'app-donut-chat',
//   templateUrl: './donut-chat.component.html',
//   styleUrls: ['./donut-chat.component.css']
// })
//
//
// export class DonutChatComponent implements OnInit, OnChanges {
//   @Input()  donutChartData: any;
//   donutChartData2: any[] = [];
//   donuteChart1: Chart = {
//     type: 'Pie',
//     data: {
//       "series": []
//       //   20,
//       //   10,
//       //   30,
//       //   40
//       // ]
//      },
//       options: {
//       donut: true,
//       showLabel: true,
//       donutWidth: 40
//     },
//     events: {
//       draw(data: any): boolean {
//         return data;
//       }
//     }
//   };
//   constructor() { }
//
//   ngOnInit() {
//   }
//   ngOnChanges(changes: SimpleChanges) {
//     if (changes) {
//       if (changes.donutChartData) {
//         if (changes.donutChartData.currentValue) {
//           this.donutChartData2 = changes.donutChartData.currentValue.payload.series;
//           let curentData : any[] = [];
//                   changes.donutChartData.currentValue.payload.series.forEach(item => {
//
//             curentData.push(item.errorCount);
//
//                      //  this.donuteChart1.data.series.push(item.errorCount);
//           });
//          this.donuteChart1.data.series = curentData;
//
//         }
//       }
//     }
// }
// }
