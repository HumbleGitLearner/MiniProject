import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import { ExpenseServices } from '../../services/expense.service';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';
import { Expense, CatType, PmtsType } from '../../models/expense';
import { Router } from '@angular/router';
import { config } from 'app/services/config';
import { ImageDialogBoxComponent } from 'app/services/imagedialog.component';
import { Store } from '@ngxs/store';
import { AuthState } from 'app/auth/states/stores/auth.state';

@Component({
  selector: 'app-v2selectimage',
  templateUrl: './v2selectimage.component.html',
  styleUrls: ['./v2selectimage.component.css'],
})
export class V2SelectimageComponent implements OnInit {
  imageForm: FormGroup;
  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;
  uid: number = 0;
  today = new Date();

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
    private fb: FormBuilder,
    private ExpenseServices: ExpenseServices,
    private auth: JwtAuthStrategy,
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    this.imageForm = this.fb.group({
      category: [''],
      total: [''],
      merchant: [''],
      date: [''],
      paymentType: [''],
    });
  }

  ngOnInit(): void {
    this.store.select(AuthState.getUid).subscribe((user) => {
      if (user) {
        this.uid = Number(user)
      }
    })
    this.loadRecentExpenses();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadPhoto() {
    if (this.selectedFile) {
      const formData = new FormData();

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      const imageName = `${this.uid}_${year}${month}${day}${hours}${minutes}${seconds}.jpeg`;
      formData.append('file', this.selectedFile, imageName);
      // formData.append('category', this.imageForm.get('category')?.value);
      // formData.append('total', this.imageForm.get('total')?.value);
      // formData.append('merchant', this.imageForm.get('merchant')?.value);
      // formData.append('date', this.imageForm.get('date')?.value);
      // formData.append('paymentType', this.imageForm.get('paymentType')?.value);

      this.ExpenseServices.seluploadImage(formData, this.uid).subscribe({
        next: (response) => {
          this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Select Upload Image',
                `${imageName} : Image uploaded successfully`,
              ],
            },
          });
          this.loadRecentExpenses();
        },
        error: (error) => {
          this.dialog.open(cDialogBoxComponent, {
            data: {
              message: [
                'Select Upload Image',
                `Error uploading image: ${error}`,
              ],
            },
          });
        },
      });
    }
  }

  loadRecentExpenses() {
    this.ExpenseServices.getRecentExpenses().subscribe({
      next: (expenses) => {
        this.recentExpenses = expenses.slice(0, 25);
      },
      error: (error) => {
        const dialogRef = this.dialog.open(cDialogBoxComponent, {
          data: {
            message: ['Add Expense', `Error loading recent expenses: ${error}`],
          },
        });
        dialogRef.afterClosed().subscribe((result: boolean) => {
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
        this.ExpenseServices.updateExpense(expense).subscribe({
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
            dialogRef.afterClosed().subscribe((result: boolean) => {
              if (result) {
                this.router.navigate(['home']);
              }
            });
          },
        });
      } else {
        this.ExpenseServices.addExpense(expense).subscribe({
          next: (response) => {
            console.log('Expense added successfully', response);
            this.store.select(AuthState.getUid).subscribe((user) => {
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
            dialogRef.afterClosed().subscribe((result: boolean) => {
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteExpense(expense);
      }
    });
  }

  deleteExpense(expense: Expense) {
    this.ExpenseServices.deleteExpense(expense.id!).subscribe({
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with success');
      } else {
        console.log('Dialog closed with error');
      }
    });
  }
}
