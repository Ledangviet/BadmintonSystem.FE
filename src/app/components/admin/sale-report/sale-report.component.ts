import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexXAxis,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-sale-report',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './sale-report.component.html',
  styleUrl: './sale-report.component.scss',
})
export class SaleReportComponent implements OnInit {
  selectedRange: string = 'week';
  selectedService: string = 'bookingOnline';
  chartOptions: any = {};

  ngOnInit() {
    this.updateChartData();
  }

  updateChartData() {
    const isWeek = this.selectedRange === 'week';
    const step = isWeek ? 7 : 3;
    const dataPoints = isWeek ? 5 : 10;

    const categories = this.generateDateCategories(dataPoints, step);

    this.chartOptions = {
      series: [
        {
          name: 'Booking',
          data: this.generateRandomData(dataPoints, 20, 150),
        },
        {
          name: 'Services',
          data: this.generateRandomData(dataPoints, 10, 100),
        },
      ],
      chart: {
        height: 550,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: categories,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy',
        },
      },
    };
  }

  generateDateCategories(dataPoints: number, step: number): string[] {
    const dates: string[] = [];
    const today = new Date();

    today.setDate(1);

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i * step);
      dates.push(date.toISOString().split('T')[0]);
    }
    console.log(dates);
    return dates;
  }

  generateRandomData(points: number, min: number, max: number): number[] {
    return Array.from({ length: points }, () =>
      Math.floor(Math.random() * (max - min + 1) + min)
    );
  }
}
