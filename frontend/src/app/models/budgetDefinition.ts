import { Period } from "./period";
import { ExpenseCategory } from "./expenseCategory";

export class BudgetDefinition {
  constructor(
    public id: string | number | undefined,
    public period: Period,
    public category: ExpenseCategory,
    public maxExpenses: number
  ) {}
}
