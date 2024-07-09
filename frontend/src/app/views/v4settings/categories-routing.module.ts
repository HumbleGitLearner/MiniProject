import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "./categories.component";
import { EditingGuard } from "./editing.guard";
import { ExpenseCategoryResolver } from "./expenseCategory.resolver";

const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
    canDeactivate: [EditingGuard],
    resolve: {
      expenseCategories: ExpenseCategoryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
