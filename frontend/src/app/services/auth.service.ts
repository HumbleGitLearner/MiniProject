import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { tap, map, catchError, switchMap } from "rxjs/operators";

import { config} from "./config";
import { CacheService } from "./cache.service";
//import { AuthStrategy, AUTH_STRATEGY } from "./auth.strategy";
import { LoginRequest } from "../models/loginRequest";
import { User } from "../models/user";
import { JwtAuthStrategy } from "./jwt-auth.strategy";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly HOME_PATH = '/app/home';
  public readonly ADMIN_PATH = '/admin';
  public readonly LOGIN_PATH = '/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService,
    //    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
    private auth: JwtAuthStrategy
  ) {}

  signup(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${config['usersUrl']}/add`, user, { headers })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  login(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${config['usersUrl']}/login`, user, { headers })
      .pipe(
        tap((data) => {
          this.auth.doLoginUser({ token: data.token, id: data.id })
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

  requestRecovery(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${config['usersUrl']}/recover`, user, {
      headers,
    });
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map((user) => {
        if (!user || !user.jwtToken.exp) {
          return false;
        }
        const expTimestampMillis = parseInt(user.jwtToken.exp) * 1000;
        const inputDate = new Date(expTimestampMillis);
        const today = new Date();
        if (!user.pemToken) {
          this.signup({
            id: 0,
            email: user.jwtToken.email,
            password: '',
            token: '',
            secret: '',
            givenName: user.jwtToken.given_name,
            lastName: user.jwtToken.last_name,
            loginType: 'GOOGLE',
            mobile: '',
            notifTelegram: false,
            notifEmail: false,
            scanEmail: false,
            exp: 0,
          })
            .subscribe(
            (response) => {
              // this.auth.doLoginGUser(response);
            },
            (error) => {
              if (error.status === 409) {
                this.auth.doLoginGUser(error.error);
                return throwError(error);
              } else {
                return false;
              }
            }
          );
        }
        return !!user && inputDate >= today;
      }),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<any | null> {
    return this.auth.getCurrentUser();
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

  private doLogoutUser() {
    this.cacheService.pruneAll();
    this.auth.doLogoutUser();
  }

  getUserEmail$(): Observable<string | undefined> {
    return this.auth.getCurrentUser().pipe(map((user) => user!.jwtToken.email));
  }

  getUserFirstname$(): Observable<string | undefined> {
    return this.auth
      .getCurrentUser()
      .pipe(map((user) => user!.jwtToken.given_name));
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }
}
