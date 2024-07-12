import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable, filter } from "rxjs";

import { HomeService } from "./home.service";
import { PeriodService } from "../../services/period.service";
import { BudgetSummary } from "../../models/budgetSummary";
import { Budget } from "../../models/budget";

@Component({
  selector: 'home',
  templateUrl: './v1home.component.html',
  styleUrls: ['./v1home.component.scss'],
})
export class V1HomeComponent implements OnInit, OnDestroy {
  budgetSummary$!: Observable<BudgetSummary | null>;
  budgets!: Budget[];
  budgetsSub!: Subscription;
  budgetsLoaded = false;
  
  constructor(
    private home: HomeService,
    private periodService: PeriodService,
  ) {}

  ngOnInit() {
    //   const period = this.periodService.getCurrentPeriod();
    //   this.budgetSummary$ = this.dashboard.getBudgetSummary(period).pipe(
    //     filter((summary) => summary !== null)
    //   );

    //   this.budgetsSub = this.dashboard.getBudgets(period).subscribe((budgets) => {
    //     this.budgets = budgets;
    //     this.budgetsLoaded = true;
    //   });
    // }
    const period = this.periodService.getCurrentPeriod();
    this.budgetSummary$ = this.home.getBudgetSummary(period);
      // this.dashboard
      //   .getBudgetSummary(period)
      //   .pipe(filter((summary) => summary !== null));
    this.budgetsSub = this.home.getBudgets(period).subscribe((budgets) => {
      this.budgets = budgets;
      this.budgetsLoaded = true;
    });
  }

  ngOnDestroy() {
    this.budgetsSub?.unsubscribe();
  }
}
