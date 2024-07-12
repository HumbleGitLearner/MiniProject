import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../models/expense';

import { ExpenseServices } from '../../services/expense.service';

@Component({
  selector: 'app-v2manual',
  templateUrl: './v2manual.component.html',
  styleUrl: './v2manual.component.css',
})
export class V2ManualComponent {
  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseServices) {
    this.expenseForm = this.fb.group({
      userId: [null, Validators.required],
      fileUrl: [''],
      payer: [''],
      trxTime: [null],
      total: [null, Validators.required],
      category: [''],
      platform: [''],
      merchant: [''],
      consumer: [''],
      paymentType: [''],
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expense: Expense = this.expenseForm.value;
      this.expenseService.addExpense(expense).subscribe({
        next: (response) => {
          console.log('Expense added successfully', response);
        },
        error: (error) => {
          console.error('Error adding expense', error);
        },
      });
    }
  }
}
