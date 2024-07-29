import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../services/custom-validator';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'v4settings',
  templateUrl: './v4settings.component.html',
  styleUrl: './v4settings.component.css',
})
export class V4SettingsComponent implements OnInit, OnDestroy {
  editUserForm!: FormGroup;
  private mySubscription1!: Subscription;
  private mySubscription2!: Subscription;
  private mySubscription3!: Subscription;
  private mySubscription4!: Subscription;
  private mySubscription5!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServices,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.editUserForm = this.formBuilder.group(
      {
        id: [0],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        token: [0],
        secret: ['', Validators.required],
        givenName: ['', Validators.required],
        lastName: ['', Validators.required],
        loginType: ['LOCAL'],
        mobile: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{4}[0-9]{4}$/)],
        ],
        notifTelegram: [false],
        notifEmail: [false],
        scanEmail: [false],
        exp: [0],
        passwordConfirm: ['', Validators.required],
      },
      { validators: CustomValidators.passwordsMatching }
    );
    this.loadUserProfile();
  }

  get passwordConfirm() {
    return this.editUserForm.get('passwordConfirm');
  }

  get passwordsNotMatching() {
    return this.editUserForm.errors?.['passwordsNotMatching'];
  }

  loadUserProfile(): void {
    this.mySubscription1 = this.userService.getUserProfile().subscribe(
      (data) => {
        this.editUserForm.patchValue(data);
        this.editUserForm.controls['passwordConfirm'].patchValue(
          this.editUserForm.controls['password'].value
        );
      },
      // (error) => {
      //   const dialogRef = this.dialog.open(cDialogBoxComponent, {
      //     data: {
      //       message: ['Update Profile', `Failed to load user profile`],
      //     },
      //   });
      //   this.mySubscription2 = dialogRef
      //     .afterClosed()
      //     .subscribe((result: boolean) => {
      //       if (result) {
      //         this.router.navigate(['home']);
      //       }
      //     });
      // }
    );
  }

  updateProfile(): void {
    if (this.editUserForm.valid) {
      const profileData = this.editUserForm.getRawValue();
      this.mySubscription3 = this.userService
        .updateUserProfile(profileData)
        .subscribe(
          () => {
            const dialogRef = this.dialog.open(cDialogBoxComponent, {
              data: {
                message: ['Update Profile', `Profile updated successfully`],
              },
            });
            this.mySubscription4 = dialogRef
              .afterClosed()
              .subscribe((result: boolean) => {
                if (result) {
                  this.router.navigate(['home']);
                }
              });
          },
          // (error) => {
          //   const dialogRef = this.dialog.open(cDialogBoxComponent, {
          //     data: {
          //       message: ['Update Profile', `Failed to update profile`],
          //     },
          //   });
          //   this.mySubscription5 = dialogRef
          //     .afterClosed()
          //     .subscribe((result: boolean) => {
          //       if (result) {
          //         this.router.navigate(['home']);
          //       }
          //     });
          // }
        );
    }
  }

  ngOnDestroy() {
    if (this.mySubscription1) {
      this.mySubscription1.unsubscribe();
    }
    if (this.mySubscription2) {
      this.mySubscription2.unsubscribe();
    }

    if (this.mySubscription3) {
      this.mySubscription3.unsubscribe();
    }

    if (this.mySubscription4) {
      this.mySubscription4.unsubscribe();
    }

    if (this.mySubscription5) {
      this.mySubscription5.unsubscribe();
    }
  }
}
