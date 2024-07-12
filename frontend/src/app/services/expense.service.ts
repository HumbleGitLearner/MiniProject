import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { config } from './config';

@Injectable({
  providedIn: 'root',
})
export class ExpenseServices {
//  private apiUrl = 'http://localhost:8080/api/expenses'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${config['expensesUrl']}`, expense);
  }
}
