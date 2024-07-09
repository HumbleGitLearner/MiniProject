import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { config} from "../../services/config";
import { CacheService } from "../../services/cache.service";
import { AuthStrategy, AUTH_STRATEGY } from "./auth.strategy";
import { LoginRequest } from "../../models/loginRequest";
import { User } from "../../models/user";
//import { Role } from "../../models/types";  //del

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly INITIAL_PATH = '/app/home';
  public readonly ADMIN_PATH = '/admin';
  public readonly LOGIN_PATH = '/login';
  //public readonly CONFIRM_PATH = '/confirm';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) {}

  // getInitialPathForRole(role: Role): string {
  //   return role === 'ADMIN' ? this.ADMIN_PATH : this.INITIAL_PATH;
  // }

  //HY  forprod, convert user:User to user:String
  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config['authUrl']}/signup`, user);
  }

  // confirm(email: string, code: string): Observable<void> {
  //   return this.http.post<any>(`${config['authUrl']}/confirm?`, {
  //     email,
  //     code,
  //   });
  // }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<any>(`${config['authUrl']}/login`, loginRequest).pipe(
      tap((data) => this.auth.doLoginUser(data)),
      catchError((error) => {
        if (error.status === 401) {
                return throwError('Invalid email or password'); 
        } else {
          return throwError(error); 
        }
      })
    );
  }

  // private handleError(error: any): Observable<never> {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(errorMessage);
  // }

  //HY
  logout() {
    return this.http
      .get<any>(`${config['authUrl']}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  //HY
  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map((user) => {
        if (!user || !user.exp) {
          return false;
        }
        const expTimestampMillis = parseInt(user.exp) * 1000;
        const inputDate = new Date(expTimestampMillis);
        const today = new Date();
        return !!user && inputDate >= today;
        // return !!user
      }),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User | null> {
    return this.auth.getCurrentUser();
  }

  // getUserRole$(): Observable<string | undefined> {
  //   return this.auth.getCurrentUser().pipe(map((user) => user!.role));
  // }

  getUserEmail$(): Observable<string | undefined> {
    return this.auth.getCurrentUser().pipe(map((user) => user!.email));
  }

  getUserFirstname$(): Observable<string | undefined> {
    return this.auth.getCurrentUser().pipe(map((user) => user!.first_name));
  }

  //HY
  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  // logoutAuth0() {
  //   return this.logout().subscribe(() => {
  //     window.location.href = `${auth0.url}/logout?client_id=${auth0.clientId}&returnTo=${auth0.returnUrl}`;
  //   });
  // }

  // isAuth0User(user: User | undefined): boolean {
  //   //return user.id.startsWith("auth0");
  //   if (user !== undefined) {
  //     return user.id.startsWith('auth0');
  //   } else return false;
  // }

  //HY
  private doLogoutUser() {
    this.cacheService.pruneAll();
    this.auth.doLogoutUser();
  }
}
