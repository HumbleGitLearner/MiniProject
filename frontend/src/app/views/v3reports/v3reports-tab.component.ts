import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'v3reports-tab',
  templateUrl: './v3reports-tab.component.html',
  styleUrl: './v3reports-tab.component.css',
})
export class v3ReportTabComponent implements OnInit {
  @Input() year!: number;
  barChartData: any[] = [];
  pieChartData: any[] = [];
  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  selectedMonth!: string;
  months = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },
  ];
  dataSource = new MatTableDataSource([]);
  totalTransactions = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.http
      .get(`/api/expenses/user/1`)
      .subscribe((data: any) => {
        // Assuming data is an array of expenses, group by month for bar chart
        this.barChartData = this.groupExpensesByMonth(data);
      });
  }

  groupExpensesByMonth(data: any[]): any[] {
    // Process data to get total expenses per month
    const monthlyExpenses: any[] = [];
    // Initialize months
    for (let i = 1; i <= 12; i++) {
      monthlyExpenses.push({ name: this.months[i - 1].viewValue, value: 0 });
    }
    // Aggregate expenses
    data.forEach((expense) => {
      const month = new Date(expense.trxTime).getMonth(); // 0-based month index
      monthlyExpenses[month].value += expense.total;
    });
    return monthlyExpenses;
  }

  onMonthChange(event: any): void {
    this.loadMonthlyExpenses(event.value);
  }

  loadMonthlyExpenses(month: string): void {
    this.http
      .get(
        `/api/expenses/user/1`
      )
      .subscribe((data: any) => {
        // Assuming data is an array of expenses for the selected month, group by category for pie chart
        this.pieChartData = this.groupExpensesByCategory(data);
      });
  }

  groupExpensesByCategory(data: any[]): any[] {
    // Process data to get total expenses by category
    const categoryExpenses: any[] = [];
    data.forEach((expense) => {
      let category = categoryExpenses.find(
        (cat) => cat.name === expense.category
      );
      if (!category) {
        category = { name: expense.category, value: 0 };
        categoryExpenses.push(category);
      }
      category.value += expense.total;
    });
    return categoryExpenses;
  }

  onPageChange(event: any): void {
    this.loadTransactions(event.pageIndex, event.pageSize);
  }

  loadTransactions(pageIndex: number, pageSize: number): void {
    this.http
      .get(
        `/api/expenses/user/1`
      )
      .subscribe((data: any) => {
        this.dataSource.data = data.transactions;
        this.totalTransactions = data.total;
      });
  }
}