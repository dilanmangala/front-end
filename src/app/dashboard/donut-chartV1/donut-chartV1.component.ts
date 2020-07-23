import { Component, OnInit, OnChanges, Input, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-donut-chartV1',
  templateUrl: './donut-chartV1.component.html',
  styleUrls: ['./donut-chartV1.component.css']
})
export class DonutChartV1Component implements OnInit, OnChanges  {
  @Input()  donutChartData: any;
  donutChartData2: any[] = [];
  // Doughnut
  public doughnutChartLabels: string[] = [];
//     'Download Sales',
//     'In-Store Sales',
//     'Mail-Order Sales'
// ];
public doughnutChartData: number[] = [];//350, 450, 100];
public doughnutChartType: string = 'doughnut';
  // events
  public chartClicked(e: any): void {
   
}
ngOnInit() {

}
public chartHovered(e: any): void {

}

ngOnChanges(changes: SimpleChanges) {
  if (changes) {
    if (changes.donutChartData) {
      if (changes.donutChartData.currentValue) {
        this.donutChartData2 = changes.donutChartData.currentValue.payload.series;
        let curentData : any[] = [];
                changes.donutChartData.currentValue.payload.series.forEach(item => {
                  this.doughnutChartLabels.push(item.error);
          curentData.push(item.errorCount);

                   //  this.donuteChart1.data.series.push(item.errorCount);
        });
       this.doughnutChartData = curentData;

      }
    }
  }
}
}

