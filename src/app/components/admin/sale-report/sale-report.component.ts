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
import {danhSachDonHang , serviceRevenue , courtBookingRevenue} from '../../../../resources/selldata';
import * as XLSX from 'xlsx';

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

  exportExcel(){
    if(this.selectedService === "bookingOffline"){
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(danhSachDonHang);
      const fileName = 'SaleReport_' + new Date().toISOString().split('T')[0];
  
      // Generate a workbook and add the worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // Save to file
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
    else if(this.selectedService === "bookingOnline"){
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(courtBookingRevenue);
      const fileName = 'BookReport_' + new Date().toISOString().split('T')[0];
  
      // Generate a workbook and add the worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // Save to file
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
    else{
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(serviceRevenue);
      const fileName = 'ServiceReport_' + new Date().toISOString().split('T')[0];
  
      // Generate a workbook and add the worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      // Save to file
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    }

  }
}
