import { Period } from "./period";
import { ExpenseCategory } from "./expenseCategory";

export class Expense {
  // public category?: ExpenseCategory;

  constructor(
    public id?: number | undefined,

    public accountId: string | number | undefined = '',
    public value: number = 0,
    public datetime: Date = new Date(),
    public period: Period | null = null,
    public categoryId: string | number | undefined = '',
    public counterparty: string = '',

    public userId?: number, //mandatory
    public fileUrl?: string,
    public payer?: string,
    public trxTime?: Date, //(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public total?: number, //mandatory
    public category?: string,
    public platform?: string,
    public merchant?: string,
    public consumer?: string,
    public paymentType?: string
  ) {}
}
