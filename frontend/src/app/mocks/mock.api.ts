import {
  InMemoryDbService,
  RequestInfo,
  RequestInfoUtilities,
  ParsedRequestUrl,
  STATUS,
  ResponseOptions,
} from "angular-in-memory-web-api";
import { tokens } from "./auth.mock";
import { budgets } from "./budget.mock";
import { expenses } from "./expenses.mock";
import { budgetSummary } from "./budgetSummary.mock";
import { budgetDefinition } from "./budgetDefinition.mock";
import { expenseCategories } from "./expenseCategory.mock";
import { HttpResponse } from "@angular/common/http";

export class MockApi implements InMemoryDbService {
  createDb() {
    return {
      users: [],
      budgets,
      expenses,
      'budget-summary': budgetSummary,
      'budget-definition': budgetDefinition,
      'expense-categories': expenseCategories,
    };
  }

  get(info: RequestInfo, db: unknown) {
    switch (this.findUrlSegmentForPost(info.req.url)) {
      case '/logout':
        return this.handleLogout(info);
      default:
        return undefined;
    }
  }

  post(info: RequestInfo, db: unknown) {
    switch (this.findUrlSegmentForPost(info.req.url)) {
      case '/login':
        console.log('login mocking', info);
        return this.handleLogin(info);
      case '/expenses':
        return this.interceptExpensesRequest(info);
      case '/recover-request':
        console.log('recover mocking', info);
        return this.handleLogin(info);
      default:
        return undefined;
    }
  }

  put(info: RequestInfo, db: unknown) {
    switch (this.findUrlSegmentForPut(info.req.url)) {
      case '/expenses':
        return this.interceptExpensesRequest(info);
      default:
        return undefined;
    }
  }

  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const newUrl = this.removePeriodFromUrl(url);
    const parsed = utils.parseRequestUrl(newUrl);
    return parsed;
  }

  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    // increase by 1 the greatest id in collection
    return (
      1 +
      collection.reduce(
        (prev, curr) => Math.max(prev, parseInt(curr.id, 0) || 0),
        1
      )
    );
  }

  /**
   * Extracts for example "/expenses" from "https://app.com/api/expenses"
   */
  private findUrlSegmentForPost(url: string) {
    const segmentMatcher = url.match(/(\/\w+)\/*$/);
    return segmentMatcher ? segmentMatcher[1] : null;
  }

  /**
   * Extracts for example "/expenses" from "https://app.com/api/expenses/6"
   */
  private findUrlSegmentForPut(url: string) {
    const segmentMatcher = url.match(/(\/\w+)\/*\/\d+$/);
    return segmentMatcher ? segmentMatcher[1] : null;
  }

  private handleLogin(info: RequestInfo) {
    const body = info.utils.getJsonBody(info.req);
    const token = tokens[body.email];
    const response = token
      ? {
          body: { jwt: token },
          status: STATUS.OK,
        }
      : {
          error: {
            msg: 'Login failed',
          },
        };
    return info.utils.createResponse$(() => response);
  }

  private handlerecover(info: RequestInfo) {
    // const body = info.utils.getJsonBody(info.req);
    // const token = tokens[body.email];
    // if (info.utils.getJsonBody(info.req).email === 'loo@app.com')
      const response = (info.utils.getJsonBody(info.req).email === 'loo@app.com')
        ? {
            body: { email: 'loo@app.com' },
            status: STATUS.OK
          }
        : {
            error: {
              msg: 'Login failed',
            },
          };
    return info.utils.createResponse$(() => response);
  }

  private handleLogout(info: RequestInfo) {
    const response = {
      status: STATUS.OK,
    };
    return info.utils.createResponse$(() => response);
  }

  private interceptExpensesRequest(info: RequestInfo) {
    const body = (<any>info.req).body;
    body.category = expenseCategories.find((c) => c.id === body.categoryId);
    body.categoryName = body.category?.name;
    return undefined;
  }

  private removePeriodFromUrl(url: string) {
    // In MockApi we don't filter data by period.
    // For example "/expenses/?month=3&year=2020" is mapped to "/expenses",
    // so any period-scoped request results in the same mock data
    return url.replace(/\/\?month=[\d]+&year=[\d]+/, '');
  }
}
