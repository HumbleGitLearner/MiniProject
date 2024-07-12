import { Period } from "./period";

export class BudgetSummary {
  totalExpenses = 0;
  totalBudget = 0;
  get totalLeft() {
    return this.totalBudget - this.totalExpenses;
  }

  constructor(
    public accountId: string | number | undefined,
    public period: Period
  ) {}

  static buildFromJson(json: any): BudgetSummary {
    const budgetSummary = new BudgetSummary(json.accountId, json.period);
    return Object.assign(budgetSummary, json);
  }
}
