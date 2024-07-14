import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtAuthStrategy } from '../../services/jwt-auth.strategy';
import { config } from '../../services/config';
import { switchMap } from 'rxjs';
import { Expense } from '../../models/expense';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  
  constructor(
    private http: HttpClient,
    private auth: JwtAuthStrategy,
  ) {}

  getYearToDateTotal() {
    return 5000;
  }

  getTotalTwoMonthsAgo() {
    return 1500;
  }

  getTotalLastMonth() {
    return 1800;
  }

  getMonthToDateTotal() {
    return 1200;
  }

  getWeekToDateTotal() {
    return 300;
  }

  getExpenseCategories(period: string) {
    let origlist = [
      { name: 'Food', value: 300, Category: 'AAA', Payment: 'CASH' },
      { name: 'Transport', value: 150, Category: 'AAA', Payment: 'CASH' },
      { name: 'Rent', value: 500, Category: 'AAA', Payment: 'CREDIT' },
      { name: 'Rent', value: 500, Category: 'AAA', Payment: 'CASH' },
      { name: 'Rent', value: 500, Category: 'AAA', Payment: 'CREDIT' },
      { name: 'Rent', value: 500, Category: 'AAA', Payment: 'CASH' },
      { name: 'Food', value: 300, Category: 'BBB', Payment: 'CREDIT' },
      { name: 'Transport', value: 150, Category: 'AAA', Payment: 'CASH' },
      { name: 'Food', value: 300, Category: 'AAA', Payment: 'CREDIT' },
      { name: 'Transport', value: 150, Category: 'AAA', Payment: 'CASH' },
      { name: 'Food', value: 300, Category: 'AAA', Payment: 'CASH' },
      { name: 'Transport', value: 150, Category: 'AAA', Payment: 'CASH' },
      { name: 'Food', value: 300, Category: 'BBB', Payment: 'CASH' },
      { name: 'Transport', value: 150, Category: 'AAA', Payment: 'CREDIT' },
      { name: 'Food', value: 300, Category: 'AAA', Payment: 'CASH' },
      { name: 'Transport', value: 150, Category: 'AAA', Payment: 'CREDIT' },
      { name: 'Food', value: 300, Category: 'AAA', Payment: 'CASH' },
      { name: 'Transport', value: 1050, Category: 'AAA', Payment: 'CASH' },
    ];

    const sumByName: { [name: string]: number } = {};

    for (const entry of origlist) {
      const { name, value } = entry;
      if (sumByName[name]) {
        sumByName[name] += value;
      } else {
        sumByName[name] = value;
      }
    }

    return Object.entries(sumByName).map(([name, value]) => ({
      name,
      value,
    }));
  }

  getLast20Transactions() {
    // Replace with actual data
    return [
      { date: '2023-07-01', category: 'Food', amount: 20 },
      { date: '2023-07-02', category: 'Transport', amount: 15 },
      // Add more transactions
    ];


    // return this.auth.getCurrentUser().pipe(
    //   switchMap((user) => {
    //     return this.http.get<Expense[]>(
    //       `${config['expensesUrl']}/user/${user.pemToken}/limit?limit=20`
    //     );
    //   })
    // );
  }
}
