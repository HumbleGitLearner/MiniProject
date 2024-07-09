import { Injectable } from "@angular/core";
import { shareReplay } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { CacheService, Prunable } from "../../services/cache.service";
import { BudgetApi } from "./budget.api";
import { BudgetSummary } from "../../models/budgetSummary";
import { Period } from "../../models/period";
import { Budget } from "../../models/budget";

@Injectable()
export class HomeService implements Prunable {
  private budgets!: Observable<Budget[]>;
  private budgetSummary!: Observable<BudgetSummary | null>;

  constructor(
    private budgetApi: BudgetApi,
    private cacheService: CacheService
  ) {
    this.cacheService.registerPrunable(this);
  }

  getBudgets(period: Period): Observable<Budget[]> {
    if (!this.budgets) {
      this.budgets = this.budgetApi.getBudgets(period).pipe(shareReplay(1));
    }
    return this.budgets;
  }

  getBudgetSummary(period: Period): Observable<BudgetSummary | null> {
    if (!this.budgetSummary) {
      this.budgetSummary = this.budgetApi
        .getBudgetSummary(period)
        .pipe(shareReplay(1));
    }
    return this.budgetSummary;
  }

  pruneCache() {
    this.budgets =of([]);
    this.budgetSummary = of(null);
  }
}
