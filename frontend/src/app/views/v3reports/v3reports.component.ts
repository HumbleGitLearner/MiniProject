import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { V3ReportsService } from './v3reports.service';

@Component({
  selector: 'app-v3reports',
  templateUrl: './v3reports.component.html',
  styleUrl: './v3reports.component.css',
})
export class V3ReportsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'category', 'amount'];
  weeklyExpenses = new MatTableDataSource<any>([]);
  monthlyExpenses = new MatTableDataSource<any>([]);
  yearlyExpenses = new MatTableDataSource<any>([]);

  weeklyBarChartData!: any[];
  monthlyBarChartData!: any[];
  yearlyBarChartData!: any[];

  weeklyPieChartData!: any[];
  monthlyPieChartData!: any[];
  yearlyPieChartData!: any[];

  view: [number, number] = [700, 400];

  // options for charts
  showLegend: boolean = true;
  showLabels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;

  constructor(private expenseService: V3ReportsService) {}

  ngOnInit(): void {
    this.loadWeeklyExpenses();
    this.loadMonthlyExpenses();
    this.loadYearlyExpenses();
  }

  loadWeeklyExpenses() {
    const expenses = this.expenseService.getWeeklyExpenses();
    this.weeklyExpenses.data = expenses;
    this.weeklyBarChartData = [
      {
        name: 'Weekly Expenses',
        series: expenses.map((exp) => ({ name: exp.date, value: exp.amount })),
      },
    ];
    this.weeklyPieChartData = this.transformToPieData(expenses);
  }

  loadMonthlyExpenses() {
    const expenses = this.expenseService.getMonthlyExpenses();
    this.monthlyExpenses.data = expenses;
    this.monthlyBarChartData = [
      {
        name: 'Monthly Expenses',
        series: expenses.map((exp) => ({ name: exp.date, value: exp.amount })),
      },
    ];
    this.monthlyPieChartData = this.transformToPieData(expenses);
  }

  loadYearlyExpenses() {
    const expenses = this.expenseService.getYearlyExpenses();
    this.yearlyExpenses.data = expenses;
    this.yearlyBarChartData = [
      {
        name: 'Yearly Expenses',
        series: expenses.map((exp) => ({ name: exp.date, value: exp.amount })),
      },
    ];
    this.yearlyPieChartData = this.transformToPieData(expenses);
  }

  transformToPieData(expenses: any[]) {
    const categories = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    return Object.keys(categories).map((key) => ({
      name: key,
      value: categories[key],
    }));
  }
}
