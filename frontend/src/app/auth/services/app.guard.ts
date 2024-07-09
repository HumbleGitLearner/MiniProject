import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
//export class AppGuard implements CanActivate, CanLoad {
export class AppGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    //    return this.canLoad();
    return this.authService.isLoggedIn$().pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  // canLoad(): Observable<boolean> {
  //   return this.authService.isLoggedIn$().pipe(
  //     tap((isLoggedIn) => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/login']);
  //       }
  //     })
  //   );
  // }
}
