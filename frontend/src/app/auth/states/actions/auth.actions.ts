export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public payload: {
      id: number;
      email: string;
      password: string;
      secret: string;
      givenName: string;
      lastName: string;
      loginType: 'LOCAL' | 'GOOGLE' | 'GITHUB' | 'HOTMAIL';
      mobile: string;
      notifTelegram: boolean;
      notifEmail: boolean;
      scanEmail: boolean;
    }
  ) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class Glogin {
  static readonly type = '[Auth] Glogin';
  constructor(
    public payload: number
  ) {}
}