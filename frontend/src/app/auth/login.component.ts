import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { retryWhen, tap, switchMap, filter } from "rxjs/operators";
import { Observable } from "rxjs";

import { SnackBarComponent } from "../services/snackbar.component";
//import { OtpComponent } from "./components/otp-dialog/otp.component";
import { AuthService } from "./services/auth.service";
import { OAuthService } from "./services/oauth.service";
import { LoginRequest } from "../models/loginRequest";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  googleLogin = 'Continue with Google';

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private formBuilder: FormBuilder,
    // private snackBar: MatSnackBar,
    // private dialog: MatDialog,
    // private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // const msg = this.route.snapshot.queryParams['msg'];
    // if (msg) {
    //   this.snackBar.openFromComponent(SnackBarComponent, {
    //     duration: 3000,
    //     data: msg,
    //   });
    // }
  }

  get lform() {
    return this.loginForm.controls;
  }

  login() {
    const loginRequest: LoginRequest = {
      email: this.lform['email'].value,
      password: this.lform['password'].value,
    };

    this.authService.login(loginRequest)
      //      .pipe(retryWhen(this.invalidOtp(loginRequest)))
      .subscribe(
        (user) => {
          this.router.navigate([this.authService.INITIAL_PATH]);
        },
        (error) => {
 //                    this.openErrorDialog('Incorrect password. Please try again.');
          this.showErrorDialog(error);
        }
      );
  }

  showErrorDialog(errorMessage: string) {
    // Your logic to open a modal dialog and display the error message
    // (e.g., using a modal service provided by your UI framework)
    console.error('Login error:', errorMessage); // Log error for debugging
  }

  //   openErrorDialog(errorMessage: string): void {
  //     // Open the modal dialog with the error message
  //     const dialogRef = this.dialog.open(ErrorDialogComponent, {
  //       data: { message: errorMessage }, // Pass the error message to the dialog
  //     });

  //     // You can handle dialog close events if needed
  //     dialogRef.afterClosed().subscribe(() => {
  //       // Do something after the dialog is closed (e.g., reset form fields)
  //     });
  //   }
  // }

  getIdToken() {
    this.oauthService.requestIdToken();
  }

  // private invalidOtp(loginRequest: LoginRequest) {
  //   return (errors: Observable<HttpErrorResponse>) =>
  //     errors.pipe(
  //       filter((err) => err.error.msg === "OTP_REQUIRED"),
  //       switchMap(() => this.requestOtp()),
  //       tap((otp) => (loginRequest.otp = otp))
  //     );
  // }

  // private requestOtp() {
  //   const config = {
  //     width: "400px",
  //     disableClose: true,
  //   };
  //   return this.dialog.open(OtpComponent, config).afterClosed();
  // }
}
