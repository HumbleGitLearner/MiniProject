//import { Account } from "./account";

export class User {
  id?: number | null;
  // accountId?: string;
  // account?: Account;

  email?: string; //for login name
  password?: string;
  token?: string | null;
  secret?: string;
  givenName?: string;
  lastName?: string;
  lastMod?: string;
  loginType?: string; //LOCAL, GOOGLE, GITHUB, HOTMAIL

  mobile?: string; //for telegram
  notifTelegram?: boolean | null;
  notifEmail?: boolean | null;
  scanEmail?: boolean | null;
  exp?: number;
  iat?: string;
  iss?: string;
}
