import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense, CatType, PmtsType } from '../../models/expense';
import { ExpenseServices } from '../../services/expense.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { cDialogBoxComponent } from '../../services/cdialog.component';
import { JwtAuthStrategy } from 'app/auth/services/jwt-auth.strategy';
import {
  lessThanToday,
  greaterThanZeroValidator,
} from '../../services/custom-validator';
import { AuthState } from 'app/auth/states/stores/auth.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'v2manual',
  templateUrl: './v2manual.component.html',
  styleUrls: ['./v2manual.component.css'],
})
export class V2ManualComponent implements OnInit {
  expenseForm!: FormGroup;
  uid: number = 0;
  today = new Date();
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
    'actions',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseServices,
    private dialog: MatDialog,
    private router: Router,
    private auth: JwtAuthStrategy,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(AuthState.getUid).subscribe((user) => {
      if (user) {
        this.uid = Number(user);
      }
    });

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

  loadRecentExpenses() {
    this.expenseService.getRecentExpenses().subscribe({
      next: (expenses) => {
        this.recentExpenses = expenses.slice(0, 10);
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
        this.expenseService.updateExpense(expense).subscribe({
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
        this.expenseService.addExpense(expense).subscribe({
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
    this.expenseService.deleteExpense(expense.id!).subscribe({
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
}