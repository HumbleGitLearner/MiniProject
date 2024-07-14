import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { JwtAuthStrategy } from './jwt-auth.strategy';
import { config } from './config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  constructor(private http: HttpClient, private auth: JwtAuthStrategy) {}

  getUserProfile(): Observable<any> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get<any>(`${config['usersUrl']}/${user.pemToken}`);
      }));
  }

  updateUserProfile(userdata: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.put<any>(`${config['usersUrl']}/${user.pemToken}`, userdata, { headers });
      }));
  }
  
}
