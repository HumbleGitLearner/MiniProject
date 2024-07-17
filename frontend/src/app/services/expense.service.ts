import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { config } from './config';
import { Expense } from '../models/expense';
import { MatDialog } from '@angular/material/dialog';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmptyFileUrl',
})
export class FilterEmptyFileUrlPipe implements PipeTransform {
  transform(items: any[], field: string): any[] {
    if (!items) {
      return [];
    }
    return items.filter((item) => item[field] && item[field].trim().length > 0);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseServices {
  constructor(
    private http: HttpClient,
    private auth: JwtAuthStrategy,
    private dialog: MatDialog
  ) {}

  addExpense(expense: Expense): Observable<Expense> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.post<Expense>(
          `${config['expensesUrl']}/add`,
          expense,
          { headers }
        );
      })
    );
  }

  getRecentExpenses(): Observable<Expense[]> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get<Expense[]>(
          `${config['expensesUrl']}/user/${user.pemToken}/limit?limit=25`
        );
      })
    );
  }

  deleteExpense(tid: number): Observable<any> {
    return this.http.delete<any>(`${config['expensesUrl']}/${tid}`);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      `${config['expensesUrl']}/${expense.id}`,
      expense
    );
  }

  camuploadImage(photo: string, uid: number, imageName: string): Observable<any> {
    const blob = this.dataURItoBlob(photo);
    const formData = new FormData();
    formData.append('file', blob, imageName);
    return this.http.post(`${config['expensesUrl']}/upload/${uid}`, formData);
  }

  private dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  seluploadImage(formData: FormData, uid:number): Observable<any> {
    return this.http.post(`${config['expensesUrl']}/upload/${uid}`, formData);

  }

}
