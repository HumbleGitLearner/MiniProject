import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CustomValidators } from "../services/custom-validator";
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../services/cdialog.component';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./auth.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        secret: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{4} [0-9]{4}$/)]],
        ischktelegram: [false, []],
        ischkemail: [false, []],
        ischkscanemail: [false, []],
      },
      { validators: CustomValidators.passwordsMatching }
    );
  }

  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm');
  }

  get passwordsNotMatching() {
    return this.signupForm.errors?.['passwordsNotMatching'];
  }

  signup() {
    this.authService
      .signup({
        id: null,
        email: this.signupForm.controls['email'].value,
        password: this.signupForm.controls['password'].value,
        secret: this.signupForm.controls['secret'].value,
        givenName: this.signupForm.controls['firstname'].value,
        lastName: this.signupForm.controls['lastname'].value,
        loginType: 'LOCAL',
        mobile: this.signupForm.controls['mobile'].value,
        notifTelegram: this.signupForm.controls['ischktelegram'].value,
        notifEmail: this.signupForm.controls['ischkemail'].value,
        scanEmail: this.signupForm.controls['ischkscanemail'].value,
      })
      .subscribe(
        (data) => {
          const dialogRef = this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Signup new account',
                `Your account is created successfully`,
              ],
            },
          });
          dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/login']);
            }
          });
        },
        (error) => {        
          const dialogRef = this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Signup Error', `Problem with signup. ${error.error}`,
              ],
            },
          });
        }
      );
  }
}