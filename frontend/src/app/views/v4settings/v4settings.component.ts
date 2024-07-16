import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../services/custom-validator';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';

@Component({
  selector: 'v4settings',
  templateUrl: './v4settings.component.html',
  styleUrl: './v4settings.component.css',
})
export class V4SettingsComponent implements OnInit {
  editUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServices,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group(
      {
        id: [0],
        email: ['', [Validators.required, Validators.email]],
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
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.editUserForm.patchValue(data);
        this.editUserForm.controls['passwordConfirm'].patchValue(
          this.editUserForm.controls['password'].value
        );
      },
      (error) => {
        const dialogRef = this.dialog.open(cDialogBoxComponent, {
          data: {
            message: ['Update Profile', `Failed to load user profile`],
          },
        });
        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.router.navigate(['/app/home']);
          }
        });
      }
    );
  }

  updateProfile(): void {
    if (this.editUserForm.valid) {
      const profileData = this.editUserForm.getRawValue();
      this.userService.updateUserProfile(profileData).subscribe(
        () => {
            const dialogRef = this.dialog.open(cDialogBoxComponent, {
              data: {
                message: ['Update Profile', `Profile updated successfully`],
              },
            });
            dialogRef.afterClosed().subscribe((result: boolean) => {
              if (result) {
                this.router.navigate(['/app/home']);
              }
            });        
        },
        (error) => {
          const dialogRef = this.dialog.open(cDialogBoxComponent, {
            data: {
              message: ['Update Profile', `Failed to update profile`],
            },
          });
          dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this.router.navigate(['/app/home']);
            }
          });
        }
      );
    }
  }
}
