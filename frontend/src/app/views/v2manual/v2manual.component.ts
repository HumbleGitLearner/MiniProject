import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'v2manual',
  templateUrl: './v2manual.component.html',
  styleUrls: ['./v2manual.component.css'],
})
export class V2ManualComponent implements OnInit, OnDestroy {
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

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseServices,
    private dialog: MatDialog,
    private router: Router,
    private auth: JwtAuthStrategy,
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
    this.mySubscription2 = this.expenseService.getRecentExpenses().subscribe({
      next: (expenses) => {
        this.recentExpenses = expenses.slice(0, 10);
      },
      error: (error) => {
        const dialogRef = this.dialog.open(cDialogBoxComponent, {
          data: {
            message: ['Add Expense', `Error loading recent expenses: ${error}`],
          },
        });
        this.mySubscription3 = dialogRef
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
        this.mySubscription4 = this.expenseService
          .updateExpense(expense)
          .subscribe({
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
              this.mySubscription5 = dialogRef
                .afterClosed()
                .subscribe((result: boolean) => {
                  if (result) {
                    this.router.navigate(['home']);
                  }
                });
            },
          });
      } else {
        this.mySubscription6 = this.expenseService
          .addExpense(expense)
          .subscribe({
            next: (response) => {
              console.log('Expense added successfully', response);
              this.mySubscription7 = this.store
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
              this.mySubscription8 = dialogRef
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

    this.mySubscription9 = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteExpense(expense);
      }
    });
  }

  deleteExpense(expense: Expense) {
    this.mySubscription10 = this.expenseService
      .deleteExpense(expense.id!)
      .subscribe({
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

  }
}