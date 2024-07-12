export class ExpenseCategory {
  constructor(
    public id?: string | number | undefined,
    public accountId?: string | number | undefined,
    public name = "",
    public counterpartyPatterns: string[] = []
  ) {}
}
