import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router} from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { AuthService } from "./services/auth.service";
import { cDialogBoxComponent } from "../services/cdialog.component";
import { Login } from "./states/actions/auth.actions";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  googleLogin = 'Continue with Google';

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get lform() {
    return this.loginForm.controls;
  }

  login() {
    const user: any =
      {
        id: 0,
        email: this.lform['email'].value,
        password: this.lform['password'].value,
        secret: '',
        givenName: '',
        lastName: '',
        loginType: 'LOCAL',
        mobile: '',
        notifTelegram: false,
        notifEmail: false,
        scanEmail: false,
      };
    this.store
      .dispatch(new Login(user)) //this.authService.login(user)
      .subscribe(
        (data) => {
          this.router.navigate([this.authService.HOME_PATH]);
        },
        (error) => {
          const dialogRef = this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Login Error',
                'Incorrect email or password. Please try again.',
              ],
            },
          });
        }
      );
  }
}
