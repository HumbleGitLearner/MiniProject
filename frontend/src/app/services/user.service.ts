import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { config } from './config';
import { User } from '../models/user';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/auth/states/stores/auth.state';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  constructor(
    private http: HttpClient,
    private auth: JwtAuthStrategy,
    private store: Store
  ) {}

  getUserProfile(): Observable<any> {
    return this.store.select(AuthState.getUid).pipe(
      switchMap((user) => {
        return this.http.get<any>(`${config['usersUrl']}/${user}`);
      })
    );
  }

  updateUserProfile(userdata: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.store.select(AuthState.getUid).pipe(    
      switchMap((user) => {
        return this.http.put<any>(
          `${config['usersUrl']}/${user}`,
          userdata,
          { headers }
        );
      })
    );
  }
}
