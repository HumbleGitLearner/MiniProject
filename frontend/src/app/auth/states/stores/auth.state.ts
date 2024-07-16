import { Injectable } from '@angular/core';
import { Login, Logout, Glogin } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { tap, catchError, switchMap, concatMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { User } from 'app/models/user';

export class AuthStateModel {
  token!: string | null;
  uid!: string | null;
  isAuthenticated!: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    //  token: null,
    //  uid: null,
    token: localStorage.getItem('pemauth.token') || null,
    uid: localStorage.getItem('pemauth.uid') || null,
    isAuthenticated: !!localStorage.getItem('pemauth.token'),
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static hasToken(state: AuthStateModel) {
    return !!state.token;
  }

  @Selector()
  static getToken(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static hasUid(state: AuthStateModel) {
    return !!state.uid;
  }

  @Selector()
  static getUid(state: AuthStateModel) {
    return state.uid;
  }

  constructor(private authService: AuthService) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.authService.login(payload).pipe(
      tap(
        (result) => {
          patchState({
            token: result.token,
            uid: String(result.id),
            isAuthenticated: true,
          });
          localStorage.setItem('pemauth.token', result.token!);
          localStorage.setItem('pemauth.uid', String(result.id));
        },
        catchError((err) => {
          return throwError(`Invalid username or password. Please try again.`);
        })
      )
    );
  }

  @Action(Glogin)
  glogin({ patchState }: StateContext<AuthStateModel>, { payload }: Glogin) {
    patchState({
      uid: String(payload),
           });

    localStorage.setItem('pemauth.uid', String(payload));
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      concatMap(() => {
        localStorage.removeItem('pemauth.token');
        localStorage.removeItem('pemauth.uid');
        setState({
          uid: null,
          token: null,
          isAuthenticated: false,
        });
        return of(null);
      })
    );
  }
}  
