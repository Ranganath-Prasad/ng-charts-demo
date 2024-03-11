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
  public barChartLegend = true;
  public barChartPlugins = [];
  public includeField: string = '';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  constructor(public sharedService: SharedService) {
    this.sharedService.getJSON().subscribe((result) => {
      this.complaintList = result;
      let years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      this.barChartData = { labels: [], datasets: [] };
      this.barChartData.labels = years;

      let distinctProducts = [
        ...new Set(this.complaintList.map((item) => item.product)),
      ]; // [ 'A', 'B']

      console.log(distinctProducts);
      distinctProducts.forEach((i) => {
        let complaints: number[] = [];

        years.forEach((y) =>
          complaints.push(
            this.complaintList.filter(
              (c) => c.submittedData.slice(0, 4) == y && c.product == i
            ).length
          )
        );
        console.log(complaints);
        this.barChartData.datasets.push({
          data: complaints,
          label: i,
        });
      });

      // this.barChartData.datasets = [
      //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
      // ];
    });
  }
}
