import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './v1home.component.html',
  styleUrls: ['./v1home.component.css'],
})
export class V1HomeComponent implements OnInit {
  summaryData: any[];
  periods = ['Week to Today', 'Month to Date', 'Last Month'];
  selectedPeriod = 'Week to Today';
  categoryTreeMapData: { name: string; value: number }[] = [];
  transactions = new MatTableDataSource<any>([]);
  view: [number, number] = [700, 400];
  displayedColumns: string[] = ['date', 'category', 'amount'];

  constructor(private homeService: HomeService) {
    this.summaryData = [
      {
        label: 'Year to Date',
        value: this.homeService.getYearToDateTotal(),
      },
      {
        label: '2 Months Ago',
        value: this.homeService.getTotalTwoMonthsAgo(),
      },
      { label: 'Last Month', value: this.homeService.getTotalLastMonth() },
      {
        label: 'Month to Date',
        value: this.homeService.getMonthToDateTotal(),
      },
      {
        label: 'Week to Date',
        value: this.homeService.getWeekToDateTotal(),
      },
    ];
  }

  ngOnInit(): void {
    this.updateCategoryTreeMap();
    this.transactions.data = this.homeService.getLast20Transactions();
  }

  updateCategoryTreeMap() {
    this.categoryTreeMapData = this.homeService.getExpenseCategories(
      this.selectedPeriod
    );
  }

  onPeriodChange() {
    this.updateCategoryTreeMap();
  }
}
