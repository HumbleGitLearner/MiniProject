import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { JwtAuthStrategy } from './jwt-auth.strategy';
import { config } from './config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  //private apiUrl = 'http://localhost:8080/api/user'; // Replace with your API endpoint

  constructor(private http: HttpClient, private auth: JwtAuthStrategy) {}

  getUserProfile(): Observable<any> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get<any>(`${config['usersUrl']}/${user.pemToken}`);
      }));
  }

  updateUserProfile(user: User): Observable<any> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.put<any>(`${config['usersUrl']}/${user.pemToken}`, user);
      }));
  }
  
}
