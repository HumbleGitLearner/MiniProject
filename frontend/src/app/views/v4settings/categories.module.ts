import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../../services/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { CategoryFormComponent } from "./category-form.component";
import { CategoryListComponent } from "./category-list.component";
import { EditingDialogComponent } from "./editing-dialog.component";
import { ExpenseCategoryResolver } from "./expenseCategory.resolver";
import { CategoriesFacade } from "./categories.facade";
import { CategoriesState } from "./categories.state";
import { EditingGuard } from "./editing.guard";

@NgModule({
  imports: [SharedModule, CategoriesRoutingModule, ReactiveFormsModule],
  declarations: [
    CategoriesComponent,
    CategoryFormComponent,
    CategoryListComponent,
    EditingDialogComponent,
  ],
  providers: [
    ExpenseCategoryResolver,
    CategoriesFacade,
    CategoriesState,
    EditingGuard,
  ],
})
export class CategoriesModule {}
