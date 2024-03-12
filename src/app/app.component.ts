import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { SharedService } from './shared.service';
import { Complaint } from './complaint.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng2-charts-demo';

  public complaintList: Complaint[] = [];
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public includeField: string = '';

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
    this.sharedService.getData().subscribe((result) => {
      this.lineChartData = { labels: [], datasets: [] };
      this.lineChartData.labels = result.labels;
      this.lineChartData.datasets = result.datasets;
    });
  }
}
