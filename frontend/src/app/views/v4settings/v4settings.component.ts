import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user.service'; // Assume you have a UserService to handle HTTP requests
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      secret: ['', Validators.required],
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4} [0-9]{4}$/)],
      ],
      ischktelegram: [],
      ischkemail: [],
      ischkscanemail: [],
    });

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
        this.editUserForm.controls['passwordConfirm']=this.editUserForm.controls['password']
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
        // this.snackBar.open('Failed to load user profile', 'Close', {
        //   duration: 3000,
        // });
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
        
          // this.snackBar.open('Profile updated successfully', 'Close', {
          //   duration: 3000,
          // });
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
          // this.snackBar.open('Failed to update profile', 'Close', {
          //   duration: 3000,
          // });
        }
      );
    }
  }
}
