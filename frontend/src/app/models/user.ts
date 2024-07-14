type LoginType = 'LOCAL' | 'GOOGLE' | 'GITHUB' | 'HOTMAIL';

export class User {
  id?: number | null;

  email?: string; //for login name
  password?: string;
  token?: string | null;
  secret?: string;
  givenName?: string;
  lastName?: string;
  lastMod?: string;
  loginType?: LoginType;
  mobile?: string; //for telegram
  notifTelegram?: boolean;
  notifEmail?: boolean;
  scanEmail?: boolean;
  exp?: number;
  iat?: string;
  iss?: string;
}
