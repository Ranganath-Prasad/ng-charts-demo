import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { SharedService } from './shared.service';
import { Complaint } from './complaint.model';
import { ResponseModel } from './response-model.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng2-charts-demo';

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public includeField: string = '';
  public data: ResponseModel | undefined;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false,
    // scales: {
    //   x: { stacked: true },
    //   y: { stacked: true },
    // },
  };

  constructor(public sharedService: SharedService) {
    this.getChartData('month', '', '');
  }

  public chartClicked(e: any): void {
    if (e.active.length > 0) {
      console.log(e.active[0]);
      const chart = e.active[0];
      let datasetIndex = chart['datasetIndex'];
      let index = parseInt(chart['index']);
      let selectedLabel = this.lineChartData.datasets[datasetIndex].label ?? '';
      let selectedPeriod = this.data?.labels[index] ?? '01/01/1999';
      console.log(datasetIndex, index);
      console.log(selectedLabel);
      this.getChartData('day', selectedLabel, selectedPeriod);
    }
  }

  public getChartData(drillDownLevel: string, label: string, value: string) {
    this.sharedService.getData(drillDownLevel, value).subscribe((result) => {
      this.data = result;
      this.lineChartData = { labels: [], datasets: [] };
      if (label) {
        console.log(result.labels.filter((r) => r == label));
        this.lineChartData.labels = result.labels;
        this.lineChartData.datasets = result.datasets.filter(
          (r) => r.label == label
        );
      } else {
        this.lineChartData.labels = result.labels;
        this.lineChartData.datasets = result.datasets;
      }
    });
  }
}
