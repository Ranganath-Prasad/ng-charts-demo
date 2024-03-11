import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CloudCost } from '../cloud-cost.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';


@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css']
})
export class StackedBarComponent {

  cloudCosts: CloudCost[] | undefined

  startDate: string = '2024-01-01';
  endDate: string = '2024-03-31';

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  // lineChartOptions: ChartConfiguration<'line'>['options'] = {
  //   responsive: false,
  //   scales: {
  //     x: { stacked: true },
  //     y: { stacked: true },
  //   },

  // };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  constructor(public dataService: DataService) {

    this.dataService.getCloudCosts().subscribe(result => {
      this.cloudCosts = result.filter(r=> moment(r.timestamp).format('M') == '1');
      this.lineChartData = { labels: [], datasets: [] };
    //  this.renderChartByMonthAndCloud();
    this.renderChartByDateAndCloud();
    });
  }

  ngOnInit() {

  }

  renderChartByMonthAndCloud(){
    this.lineChartData.labels = this.getAllMonthsInAGivenDateRange(this.startDate, this.endDate);
    console.log(this.getAllMonthsInAGivenDateRange(this.startDate, this.endDate));
    this.lineChartData.datasets.push({ data: this.getCostsByMonthAndCloud(this.getAllMonthsInAGivenDateRange(this.startDate, this.endDate), 'Azure'), label: 'Azure' });
    this.lineChartData.datasets.push({ data: this.getCostsByMonthAndCloud(this.getAllMonthsInAGivenDateRange(this.startDate, this.endDate), 'AWS'), label: 'AWS' });
    this.lineChartData.datasets.push({ data: this.getCostsByMonthAndCloud(this.getAllMonthsInAGivenDateRange(this.startDate, this.endDate), 'GCP'), label: 'GCP' });
  }


  renderChartByDateAndCloud(){
    let distinctDates = [
        ...new Set(this.cloudCosts?.map((item) => item.timestamp)),
      ];

    console.log(distinctDates);


    this.lineChartData.labels = distinctDates;
    this.lineChartData.datasets.push({ data: this.getCostsByDateAndCloud(distinctDates, "Azure"), label : "Azure"});
    this.lineChartData.datasets.push({ data: this.getCostsByDateAndCloud(distinctDates, "AWS"), label : "AWS" });
   this.lineChartData.datasets.push({ data: this.getCostsByDateAndCloud(distinctDates, "GCP"), label : "GCP" });


  }

  getCostsByMonthAndCloud(month: string[], cloud: string) {
    let costs: number[] = [];
    month.forEach(m => {
      let recordsByMonthAndCloud = this.cloudCosts?.filter(r => moment(r.timestamp).format("MMMM YYYY") == m && r.cloud === cloud);
      let costsByMonthAndCloud = recordsByMonthAndCloud?.map(m => parseFloat(m.costPerHour)).reduce((a, b) => a + b);
      console.log(cloud, costsByMonthAndCloud);
      costs.push(costsByMonthAndCloud ?? 0);
    }
    )
    return costs;
  }

  getCostsByDateAndCloud(dates: string[], cloud:string) {
    let costs: number[] = [];
    console.log(dates)
    dates.forEach(d => {
       let recordsByDateAndCloud = this.cloudCosts?.filter(r => d == r.timestamp && r.cloud == cloud);
       let costsByDateAndCloud = recordsByDateAndCloud?.map(m => parseFloat(m.costPerHour)).reduce((a, b) => a + b);
       costs.push(costsByDateAndCloud ?? 0);
       console.log(cloud, costsByDateAndCloud);
    })
    return costs;
  }



  // helpers
  monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  getAllMonthsInAGivenDateRange(fromDate: string, toDate: string): string[] {
    var startDate = moment(fromDate);
    var endDate = moment(toDate);

    var dates = [];
    startDate.subtract(1, "month"); //Substract one month to exclude endDate itself
    endDate.subtract(1, "month"); //Substract one month to exclude endDate itself

    var month = moment(startDate); //clone the startDate
    while (month < endDate) {
      month.add(1, "month");
      dates.push(month.format('MMMM YYYY'));
    }

    return dates;

  }

}