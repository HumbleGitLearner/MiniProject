import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class V3ReportsService {
  getWeeklyExpenses() {
    return [
      { date: '2023-07-01', category: 'Food', amount: 20 },
      { date: '2023-07-02', category: 'Transport', amount: 15 },
      // Add more sample data
    ];
  }

  getMonthlyExpenses() {
    return [
      { date: '2023-07-01', category: 'Rent', amount: 500 },
      { date: '2023-07-02', category: 'Food', amount: 150 },
      // Add more sample data
    ];
  }

  getYearlyExpenses() {
    return [
      { date: '2023-01-01', category: 'Rent', amount: 6000 },
      { date: '2023-02-01', category: 'Food', amount: 1800 },
      // Add more sample data
    ];
  }
}
