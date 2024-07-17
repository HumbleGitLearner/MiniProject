import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { config } from 'app/services/config';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { Expense } from 'app/models/expense';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/auth/states/stores/auth.state';

@Component({
  selector: 'v3reports-tab',
  templateUrl: './v3reports-tab.component.html',
  styleUrl: './v3reports-tab.component.css',
})
export class v3ReportTabComponent implements OnInit {
  @Input() month!: number;
  uid: number = 0;
  alldata: Expense[] = [];
  barChartData: any[] = [];
  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  dataSource = new MatTableDataSource<Expense>([]);
  totalTransactions = 0;

  constructor(
    private http: HttpClient,
    private auth: JwtAuthStrategy,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(AuthState.getUid).subscribe((user) => {
      if (user) {
        this.uid = Number(user);
        this.loadExpenses();
      }
    });
  }

  loadExpenses(): void {
    this.http
      .get(`${config['expensesUrl']}/user/${this.uid}`)
      .subscribe((data: any) => {
        this.alldata = data;
        const filteredExpenses = this.filterExpensesByMonth(data, this.month);
        this.barChartData = this.groupExpensesByCategory(filteredExpenses);
        this.dataSource.data = filteredExpenses;
      });
  }

  groupExpensesByCategory(data: Expense[]): any[] {
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

  filterExpensesByMonth(data: Expense[], month: number): Expense[] {
    return data.filter((expense) => {
      if (!expense.trxTime) {
        return false;
      }
      const expenseDate = new Date(expense.trxTime);
      return expenseDate.getMonth() + 1 === month || month === 0;
    });
  }

  onPageChange(event: any): void {
    this.loadTransactions(event.pageIndex, event.pageSize);
  }

  loadTransactions(pageIndex: number, pageSize: number): void {
    const apiUrl = `${config['expensesUrl']}/user/${this.uid}`;
    this.http.get(`/api/expenses/user/1`).subscribe((data: any) => {
      this.dataSource.data = data.transactions;
      this.totalTransactions = data.total;
    });
  }

  generatePDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Expenses Report', 10, 10);

    const tableColumn = [
      'Transaction Date',
      'Merchant',
      'Category',
      'Total',
      'Payment Type',
    ];
    const tableRows: any[] = [];

    this.dataSource.data.forEach((expense) => {
      const expenseData = [
        expense.trxTime,
        expense.merchant,
        expense.category,
        expense.total!.toFixed(2),
        expense.paymentType,
      ];
      tableRows.push(expenseData);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save('expenses-report.pdf');
  }
}
