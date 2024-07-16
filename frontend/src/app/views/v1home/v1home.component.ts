import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from 'app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './v1home.component.html',
  styleUrls: ['./v1home.component.css'],
})
export class V1HomeComponent implements OnInit {
  summaryData: any[]=[];
  cardColor: string = '#232837';
  textColor: string = 'black';
  periods = ['Week to Today', 'Month to Date', 'Last Month'];
  selectedPeriod = 'Week to Today';
  categoryTreeMapData: { name: string; value: number }[] = [];
  transactions = new MatTableDataSource<any>([]);
  view: [number, number] = [700, 400];
  displayedColumns: string[] = [
    'trxTime',
    'merchant',
    'total',
    'category',
    'paymentType',
  ];

  constructor(private homeService: HomeService) {
    this.homeService.getSummary().subscribe((data) => {
      this.summaryData = [
        { name: 'Year to Date', value: data.yearToDate, },
        { name: '2 Months Ago', value: data.mon2ago, },
        { name: 'Last Month', value: data.mon1ago, },
        { name: 'Month to Date', value: data.monToDate, },
        { name: 'Week to Date', value: data.weekToDate, },
      ];
    })
  }

  ngOnInit(): void {
    this.updateCategoryTreeMap();
    this.homeService.getLast20Transactions().subscribe((data) => {
      this.transactions.data = data;
    });
  }

  updateCategoryTreeMap() {
    this.homeService
      .getExpenseCategories(this.selectedPeriod)
      .subscribe((categories) => {
        this.categoryTreeMapData = categories;
      });
  }

  onPeriodChange() {
    this.updateCategoryTreeMap();
  }
}
