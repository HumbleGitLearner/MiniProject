import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { copyExpenseService } from './home.servicecopy';

@Component({
  selector: 'app-home',
  templateUrl: './v1home.componentcopy.html',
  styleUrls: ['./v1home.componentcopy.css'],
})
export class V1HomeComponentcopy implements OnInit {
  summaryData = [
    { label: 'Year to Date', value: this.expenseService.getYearToDateTotal() },
    {
      label: '2 Months Ago',
      value: this.expenseService.getTotalTwoMonthsAgo(),
    },
    { label: 'Last Month', value: this.expenseService.getTotalLastMonth() },
    {
      label: 'Month to Date',
      value: this.expenseService.getMonthToDateTotal(),
    },
    { label: 'Week to Date', value: this.expenseService.getWeekToDateTotal() },
  ];

  periods = ['Week to Today', 'Month to Date', 'Last Month'];
  selectedPeriod = 'Week to Today';
  categoryTreeMapData: { name: string; value: number }[] = [];
  transactions = new MatTableDataSource<any>([]);

  view: [number, number] = [700, 400];

  displayedColumns: string[] = ['date', 'category', 'amount'];

  constructor(private expenseService: copyExpenseService) {}

  ngOnInit(): void {
    this.updateCategoryTreeMap();
    this.transactions.data = this.expenseService.getLast20Transactions();
  }

  updateCategoryTreeMap() {
    this.categoryTreeMapData = this.expenseService.getExpenseCategories(
      this.selectedPeriod
    );
  }

  onPeriodChange() {
    this.updateCategoryTreeMap();
  }
}
