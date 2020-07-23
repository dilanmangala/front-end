import { Component,  OnChanges,
  SimpleChanges,
  Input} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements  OnChanges {
  @Input() barChartData: any;
  subtitle: string;
  public lineChartData2: any[] = [];
	constructor() {}
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        barThickness : 10
    };

    public barChartLabels: string[] = [];

    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;


    public barChartColors: Array<any> = [];
  
    public chartClicked(e: any): void {
     
    }

    public chartHovered(e: any): void {
      }

    public randomize(): void {
   
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes) {
        if (changes.barChartData) {
          if (changes.barChartData.currentValue) {
                     let success: any[] = [];
            let errornous: any[] = [];
            let failed: any[] = [];
            changes.barChartData.currentValue.payload.forEach(item => {
              this.barChartLabels.push(item.label);
              const total = item.success + item.failed + item.errornous;
              success.push((item.success * 100) / total);
              errornous.push((item.errornous * 100) / total);
              failed.push((item.failed * 100) / total);
            });
            this. barChartData = [
              { data: failed, label: "Failed %" },
              { data: errornous, label: "Errornous %" },
              { data: success, label: "Success %" }
            ];
            this. barChartColors = [
              {backgroundColor: '#ff5c6c'},
              {backgroundColor: '#ff9041'},
              {backgroundColor: '#24d2b5'}
          ];
          }
        }
      }
    }
  }
