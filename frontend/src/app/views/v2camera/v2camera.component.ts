import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Pipe,
  PipeTransform,
  OnDestroy,
} from '@angular/core';

import { Camera, CameraResultType } from '@capacitor/camera';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseServices } from '../../services/expense.service';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';
import { ImageDialogBoxComponent } from '../../services/imagedialog.component';
import { Expense, CatType, PmtsType } from '../../models/expense';
import { Router } from '@angular/router';
import {
  lessThanToday,
  greaterThanZeroValidator,
} from '../../services/custom-validator';
import { config } from 'app/services/config';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/auth/states/stores/auth.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'camera-upload',
  templateUrl: './v2camera.component.html',
  styleUrls: ['./v2camera.component.css'],
})
export class V2CameraComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  photo: string | null | undefined = null;
  selectedCamera: string = '';
  cameras: MediaDeviceInfo[] = [];
  uid: number = 0;
  today = new Date();
  private mySubscription1!: Subscription;
  private mySubscription2!: Subscription;
  private mySubscription3!: Subscription;
  private mySubscription4!: Subscription;
  private mySubscription5!: Subscription;
  private mySubscription6!: Subscription;
  private mySubscription7!: Subscription;
  private mySubscription8!: Subscription;
  private mySubscription9!: Subscription;
  private mySubscription10!: Subscription;
  private mySubscription11!: Subscription;
  private mySubscription12!: Subscription;

  expenseForm!: FormGroup;
  recentExpenses: Expense[] = [];
  currentExpenseId: number | null | undefined = null;
  categories: CatType[] = [
    'OUTFOOD',
    'GROCERY',
    'TRANSPORT',
    'EDUCATION',
    'CLOTHING',
    'ENTERTAINMENT',
    'HEALTH',
    'APPLIANCES',
    'OTHERS',
  ];
  paymentTypes: PmtsType[] = [
    'CASH',
    'CREDIT',
    'DEBIT',
    'PAYNOW',
    'PAYLAH',
    'PAYPAL',
    'GOOGLEPAY',
    'APPLEPAY',
  ];
  displayedColumns: string[] = [
    'trxTime',
    'merchant',
    'category',
    'total',
    'paymentType',
    'fileUrl',
    'actions',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private ExpenseServices: ExpenseServices,
    private auth: JwtAuthStrategy,
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.mySubscription1 = this.store
      .select(AuthState.getUid)
      .subscribe((user) => {
        if (user) {
          this.uid = Number(user);
        }
      });
    this.getCameras();
    // this.startCamera();
    this.expenseForm = this.formBuilder.group({
      userId: [this.uid, Validators.required],
      fileUrl: [''],
      payer: [''],
      trxTime: [new Date(), [Validators.required, lessThanToday]],
      total: [0, [Validators.required, greaterThanZeroValidator]],
      category: ['OUTFOOD', Validators.required],
      platform: ['GRAB'],
      merchant: ['', Validators.required],
      consumer: [''],
      paymentType: ['CREDIT', Validators.required],
    });
    this.loadRecentExpenses();
  }

  async getCameras() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.cameras = devices.filter((device) => device.kind === 'videoinput');
    if (this.cameras.length > 0) {
      this.selectedCamera = this.cameras[0].deviceId;
      this.startCamera(this.selectedCamera);
    }
  }

  async startCamera(deviceId: string) {
    if (Capacitor.isNativePlatform()) {
      // For mobile platforms
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.photo = cameraResult.dataUrl;
    } else {
      // For web
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } });
      this.videoElement.nativeElement.srcObject = stream;
    }
  }

  switchCamera(deviceId: string) {
    this.startCamera(deviceId);
  }

  async takePhoto() {
    if (Capacitor.isNativePlatform()) {
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      this.photo = cameraResult.dataUrl;
    } else {
      const video = this.videoElement.nativeElement;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context!.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photo = canvas.toDataURL('image/jpeg');
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }

  retakePhoto() {
    this.photo = null;
    this.startCamera(this.selectedCamera);
  }

  uploadPhoto() {
    if (this.photo) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      const imageName = `${this.uid}_${year}${month}${day}${hours}${minutes}${seconds}.jpeg`;
      this.mySubscription2 = this.ExpenseServices.camuploadImage(
        this.photo,
        this.uid,
        imageName
      ).subscribe(
        (response) => {
          this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Camera Upload Image',
                `${imageName} : Upload successful`,
              ],
            },
          });
          this.loadRecentExpenses();
        },
        (error) => {
          this.dialog.open(cDialogBoxComponent, {
            data: { message: ['Camera Upload Image', `Upload failed`] },
          });
        }
      );
    }
  }

  loadRecentExpenses() {
    this.mySubscription3 = this.ExpenseServices.getRecentExpenses().subscribe({
      next: (expenses) => {
        this.recentExpenses = expenses.slice(0, 25);
      },
      error: (error) => {
        const dialogRef = this.dialog.open(cDialogBoxComponent, {
          data: {
            message: ['Add Expense', `Error loading recent expenses: ${error}`],
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
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expense: Expense = this.expenseForm.value;

      if (this.currentExpenseId !== null) {
        expense.id = this.currentExpenseId;
        this.mySubscription5 = this.ExpenseServices.updateExpense(
          expense
        ).subscribe({
          next: (response) => {
            console.log('Expense updated successfully', response);
            this.resetForm();
            this.loadRecentExpenses();
          },
          error: (error) => {
            const dialogRef = this.dialog.open(cDialogBoxComponent, {
              data: {
                message: ['Edit Expense', `Error updating expense: ${error}`],
              },
            });
            this.mySubscription6 = dialogRef
              .afterClosed()
              .subscribe((result: boolean) => {
                if (result) {
                  this.router.navigate(['home']);
                }
              });
          },
        });
      } else {
        this.mySubscription7 = this.ExpenseServices.addExpense(
          expense
        ).subscribe({
          next: (response) => {
            console.log('Expense added successfully', response);
            this.mySubscription8 = this.store
              .select(AuthState.getUid)
              .subscribe((user) => {
                if (user) {
                  this.uid = Number(user);
                }
              });
            this.resetForm();
            this.loadRecentExpenses();
          },
          error: (error) => {
            const dialogRef = this.dialog.open(cDialogBoxComponent, {
              data: {
                message: ['Add Expense', `Error adding expense: ${error}`],
              },
            });
            this.mySubscription9 = dialogRef
              .afterClosed()
              .subscribe((result: boolean) => {
                if (result) {
                  this.router.navigate(['home']);
                }
              });
          },
        });
      }
    }
  }

  editExpense(expense: Expense) {
    this.currentExpenseId = expense.id;
    this.expenseForm.patchValue(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmDelete(expense: Expense) {
    const dialogRef = this.dialog.open(cDialogBoxComponent, {
      data: {
        message: [
          'Delete Expense',
          `Are you sure you want to delete this expense?`,
        ],
      },
    });

    this.mySubscription10 = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteExpense(expense);
      }
    });
  }

  deleteExpense(expense: Expense) {
    this.mySubscription11 = this.ExpenseServices.deleteExpense(
      expense.id!
    ).subscribe({
      next: () => {
        console.log('Expense deleted successfully');
        this.loadRecentExpenses();
      },
      error: (error) => {
        const dialogRef = this.dialog.open(cDialogBoxComponent, {
          data: {
            message: ['Delete Expense', `Error deleting expense: ${error}`],
          },
        });
      },
    });
  }

  resetForm() {
    this.expenseForm.reset();
    this.currentExpenseId = null;
    this.expenseForm.get('userId')?.setValue(this.uid);
    this.expenseForm.get('trxTime')?.setValue(this.today);
    this.expenseForm.get('total')?.setValue(0);
    this.expenseForm.get('category')?.setValue('OUTFOOD');
    this.expenseForm.get('platform')?.setValue('GRAB');
    this.expenseForm.get('paymentType')?.setValue('CREDIT');
  }

  openImagePreview(imageUrl: string): void {
    const imageblob = `${config['expensesUrl']}/download?fileUrl=${imageUrl}`;
    const dialogRef = this.dialog.open(ImageDialogBoxComponent, {
      data: { imageBlob: imageblob },
    });

    this.mySubscription12 = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with success');
      } else {
        console.log('Dialog closed with error');
      }
    });
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
    if (this.mySubscription6) {
      this.mySubscription6.unsubscribe();
    }
    if (this.mySubscription7) {
      this.mySubscription7.unsubscribe();
    }
    if (this.mySubscription8) {
      this.mySubscription8.unsubscribe();
    }
    if (this.mySubscription9) {
      this.mySubscription9.unsubscribe();
    }
    if (this.mySubscription10) {
      this.mySubscription10.unsubscribe();
    }
    if (this.mySubscription11) {
      this.mySubscription11.unsubscribe();
    }
    if (this.mySubscription12) {
      this.mySubscription12.unsubscribe();
    }
  }
}
