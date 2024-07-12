import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class copyExpenseService {
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
    // Replace with actual data
    return [
      { name: 'Food', value: 300 },
      { name: 'Transport', value: 150 },
      { name: 'Rent', value: 500 },
      // Add more categories
    ];
  }

  getLast20Transactions() {
    // Replace with actual data
    return [
      { date: '2023-07-01', category: 'Food', amount: 20 },
      { date: '2023-07-02', category: 'Transport', amount: 15 },
      // Add more transactions
    ];
  }
}
