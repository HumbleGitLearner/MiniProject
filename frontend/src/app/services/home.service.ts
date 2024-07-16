import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { config } from 'app/services/config';
import { map, switchMap } from 'rxjs';
import { Expense } from 'app/models/expense';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private auth: JwtAuthStrategy) {}

  getExpenseCategories(period: string) {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        const periodEndpoints: { [key: string]: string } = {
          'Week to Today': 'wk2date',
          'Month to Date': 'mnth2date',
          'Last Month': 'mnthlast',
        };
        const endpoint = periodEndpoints[period];
        const apiUrl = `${config['expensesUrl']}/${endpoint}/${user.pemToken}`;

        return this.http.get<Expense[]>(apiUrl).pipe(
          map((response: Expense[]) => {
            const sumByName: { [category: string]: number } = {};

            for (const entry of response) {
              const { category, total } = entry;
              if (category) {
                if (sumByName.hasOwnProperty(category)) {
                  sumByName[category] += total || 0;
                } else {
                  sumByName[category] = total || 0;
                }
              }
            }

            return Object.entries(sumByName).map(([category, total]) => ({
              name: category,
              value: total || 0,
            }));
          })
        );
      })
    );
  }

  getLast20Transactions() {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get<Expense[]>(
          `${config['expensesUrl']}/user/${user.pemToken}/limit?limit=20`
        );
      })
    );
  }

  getSummary() {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get<any>(
          `${config['expensesUrl']}/summary/${user.pemToken}`
        );
      })
    );
  }
}
