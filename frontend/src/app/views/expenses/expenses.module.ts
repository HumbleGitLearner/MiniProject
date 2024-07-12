import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ExpensesRoutingModule } from "./expenses-routing.module";
import { MaterialsModule } from "../../services/materials.module";
import { ExpenseApi } from "./api/expense.api";
import { ExpensesService } from "./services/expenses.service";
import { ExpensesComponent } from "./containers/expenses/expenses.component";
import { ExpensesTableComponent } from "./components/expenses-table/expenses-table.component";
import { ConfirmDeleteComponent } from "./components/confirm-delete/confirm-delete.component";
import { ExpenseDialogComponent } from "./components/expense-dialog/expense-dialog-component";

@NgModule({
  imports: [MaterialsModule, ReactiveFormsModule, ExpensesRoutingModule],
  declarations: [
    ExpensesComponent,
    ExpensesTableComponent,
    ConfirmDeleteComponent,
    ExpenseDialogComponent,
  ],
 // entryComponents: [ExpenseDialogComponent, ConfirmDeleteComponent],
  providers: [ExpensesService, ExpenseApi],
})
export class ExpensesModule {}
