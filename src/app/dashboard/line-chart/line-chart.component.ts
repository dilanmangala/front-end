// import { HomePageService } from "./../../shared/services/home-page.service";
// import {
//   Component,
//   OnInit,
//   Input,
//   OnChanges,
//   SimpleChanges
//
// } from "@angular/core";
//
// @Component({
//   selector: "app-line-chart",
//   templateUrl: "./line-chart.component.html",
//   styleUrls: ["./line-chart.component.css"]
// })
// export class LineChartComponent implements OnInit, OnChanges {
//   @Input() barChartData: any;
//   // barChartData: any;
//   constructor(private homePageService: HomePageService) {}
//   public barChartData: any[] = [];
//   //   { data: [15, 5, 50, 8, 75], label: 'Failed' },
//   //   { data: [45, 3, 25, 2, 5], label: 'Errornous' },
//   //   { data: [56, 7, 22, 30, 100], label: 'Success' }
//   // ];
//   public lineChartLabels: Array<any> = [];
//   //   "Task-1",
//   //   "Task-2",
//   //   "Task-3",
//   //   "Task-4",
//   //   "Task-5"
//   // ];
//   public lineChartOptions: any = {
//     lineTension: 10,
//     responsive: true,
//     maintainAspectRatio: true
//   };
//   public lineChartColors: Array<any> = [];
//   //   {
//   //     //failed
//   //     backgroundColor: "rgb(255, 92, 108,0.1)",
//   //     borderColor: "#ff5c6c",
//   //     pointBackgroundColor: "#ff5c6c",
//   //     pointBorderColor: "#fff"
//   //     // pointHoverBackgroundColor: '#fff',
//   //     // pointHoverBorderColor: 'rgba(36,210,181,0.5)'
//   //   },
//   //   {
//   //     // Errornous
//   //     backgroundColor: "rgb(255, 144, 65,0.1)",
//   //     borderColor: "#ff9041",
//   //     pointBackgroundColor: "#ff9041",
//   //     pointBorderColor: "#fff"
//   //     // pointHoverBackgroundColor: '#fff',
//   //     // pointHoverBorderColor: 'rgba(32,174,227,0.5)'
//   //   },
//   //   {
//   //     // success
//   //     backgroundColor: "rgb(36, 210, 181,0.1)",
//   //     borderColor: "#24d2b5",
//   //     pointBackgroundColor: "#24d2b5",
//   //     pointBorderColor: "#fff"
//   //     // pointHoverBackgroundColor: '#fff',
//   //     // pointHoverBorderColor: 'rgba(36,210,181,0.5)'
//   //   }
//   // ];
//   public lineChartLegend: boolean = false;
//   public lineChartType: string = "line";
//
//   ngOnInit() {
//
//   }
//   ngOnChanges(changes: SimpleChanges) {
//     if (changes) {
//       if (changes.barChartData) {
//         if (changes.barChartData.currentValue) {
//           let success: any[] = [];
//           let errornous: any[] = [];
//           let failed: any[] = [];
//           changes.barChartData.currentValue.payload.forEach(item => {
//             this.lineChartLabels.push(item.label);
//             const total = item.success + item.failed + item.errornous;
//             success.push((item.success * 100) / total);
//             errornous.push((item.errornous * 100) / total);
//             failed.push((item.failed * 100) / total);
//           });
//           this.barChartData = [
//             { data: failed, label: "Failed" },
//             { data: errornous, label: "Errornous" },
//             { data: success, label: "Success" }
//           ];
//         this.lineChartColors = [
//     {
//       //failed
//       backgroundColor: "rgb(255, 92, 108,0.1)",
//       borderColor: "#ff5c6c",
//       pointBackgroundColor: "#ff5c6c",
//       pointBorderColor: "#fff"
//       // pointHoverBackgroundColor: '#fff',
//       // pointHoverBorderColor: 'rgba(36,210,181,0.5)'
//     },
//     {
//       // Errornous
//       backgroundColor: "rgb(255, 144, 65,0.1)",
//       borderColor: "#ff9041",
//       pointBackgroundColor: "#ff9041",
//       pointBorderColor: "#fff"
//       // pointHoverBackgroundColor: '#fff',
//       // pointHoverBorderColor: 'rgba(32,174,227,0.5)'
//     },
//     {
//       // success
//       backgroundColor: "rgb(36, 210, 181,0.1)",
//       borderColor: "#24d2b5",
//       pointBackgroundColor: "#24d2b5",
//       pointBorderColor: "#fff"
//       // pointHoverBackgroundColor: '#fff',
//       // pointHoverBorderColor: 'rgba(36,210,181,0.5)'
//     }
//   ];
//
//         }
//       }
//     }
//   }
// }
