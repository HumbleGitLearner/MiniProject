import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from "../services/cdialog.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./auth.scss'],
})
export class RecoverComponent implements OnInit {
  isRequestSent!: boolean;
  public recoveryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.isRequestSent = false;
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      secret: ['', Validators.required],
    });
  }

  recovery() {
    this.authService.requestRecovery({
        id: null,
        email: this.recoveryForm.controls['email'].value,
        password: "",
        secret: this.recoveryForm.controls['secret'].value,
        givenName: this.recoveryForm.controls['firstname'].value,
        lastName: "",
        loginType: "LOCAL",
        mobile: "",
        notifTelegram: false,
        notifEmail: false,
        scanEmail: false
      })
      .subscribe(
        (data) => {
          const dialogRef = this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Password Recovery',
                `Your password code is "` + data.password + `"`,
              ],
            },
          });
          dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/recover']);
            }
          });
        },
        (error) => {
          const dialogRef = this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Password Recovery',
                'Your secret code is incorrect. Please try again.',
              ],
            },
          });
        }
      );
  }
}
