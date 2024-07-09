import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { PasswordService } from "./services/password.service";
import { MatDialog } from '@angular/material/dialog';
import { RecoverDialogComponent } from './recoverpass.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'recover',
  templateUrl: './recover.component.html',
  //styleUrls: ['./recover.component.scss'],
  styleUrls: ['./auth.scss'],
})
export class RecoverComponent implements OnInit {
  isRequestSent!: boolean;
  public recoveryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isRequestSent = false;
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      secret: ['', Validators.required],
    });
  }

  get recoverform() {
    return this.recoveryForm.controls;
  }

  recovery() {
    this.passwordService
      .requestRecovery(this.recoverform['email'].value,
        this.recoverform['firstname'].value,
        this.recoverform['secret'].value)
      .subscribe(() => (this.isRequestSent = true));

    const dialogRef = this.dialog.open(RecoverDialogComponent, {
      data: { message: 'Your password is secret code' },
    });
    
    // dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if (result) {
    //     this.authService.logout().subscribe(() => {
    //       this.router.navigate([this.authService.LOGIN_PATH]);
    //     });
    //   } else {
    //   }
    // });
  }
}
