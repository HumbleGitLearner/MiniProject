import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { Router } from '@angular/router';
import { CacheService } from 'app/services/cache.service';
import { config } from 'app/services/config';
import { Store } from '@ngxs/store';
import { Logout } from '../states/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly HOME_PATH = '/app/home';
  public readonly ADMIN_PATH = '/admin';
  public readonly LOGIN_PATH = '/login';

  constructor(
    private http: HttpClient,
    private auth: JwtAuthStrategy,
    private cacheService: CacheService,
    private router: Router,
    private store: Store
  ) {}

  login(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${config['usersUrl']}/login`, user, { headers })
      .pipe(
        tap((data) => {
          //          this.auth.doLoginUser({ token: data.token, id: data.id });
        }),
        catchError((error) => {
          if (error.status === 404) {
            return throwError('Incorrect password. Please try again.');
          } else {
            return throwError(error);
          }
        })
      );
  }

  signup(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${config['usersUrl']}/add`, user, { headers });
  }

  requestRecovery(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${config['usersUrl']}/recover`, user, {
      headers,
    });
  }

  logout() {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http
          .get<any>(`${config['usersUrl']}/logout?id=${user.pemToken}`)
          .pipe(tap(() => this.doLogoutUser()));
      }),
      catchError(() => of(false))
    );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user || !user.jwtToken.exp) {
          return of(false);
        }
        const expTimestampMillis = parseInt(user.jwtToken.exp) * 1000;
        const inputDate = new Date(expTimestampMillis);
        const today = new Date();
        if (!user.pemToken) {
          return this.signup({
            id: 0,
            email: user.jwtToken.email,
            password: '',
            secret: '',
            givenName: user.jwtToken.given_name,
            lastName: user.jwtToken.family_name,
            loginType: 'GOOGLE',
            mobile: '',
            notifTelegram: false,
            notifEmail: false,
            scanEmail: false,
            exp: Number(user.jwtToken.exp),
          }).pipe(
            switchMap((response) => {
              this.auth.doLoginGUser(response);
              return of(true);
            }),
            catchError((error) => {
              if (error.status === 409) {
                this.auth.doLoginGUser(error.error);
                return of(true);
              } else {
                return of(false);
              }
            })
          );
        }
        return of(!!user && inputDate >= today);
      }),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<any | null> {
    return this.auth.getCurrentUser();
  }

  private doLogoutUser() {
    this.cacheService.pruneAll();
    //this.auth.doLogoutUser();
  }

  getUserEmail$(): Observable<string | undefined> {
    return this.auth.getCurrentUser().pipe(map((user) => user!.jwtToken.email));
  }

  getUserFirstname$(): Observable<string | undefined> {
    return this.auth.getCurrentUser()
      .pipe(map((user) => user!.jwtToken.given_name));
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }
}

