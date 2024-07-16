export type CatType = 'OUTFOOD' | 'GROCERY' | 'TRANSPORT' | 'EDUCATION' | 'CLOTHING' | 'ENTERTAINMENT' | 'HEALTH' | 'APPLIANCES' | 'OTHERS';
export type PltfmType = 'GRAB' | 'NTUC' | 'FOODPANDA' | 'DELIVEROO' | 'SHOPEE' | 'LAZADA' | 'AMAZON' | 'QOO10' | 'CAROUSELL' | 'OTHER';
export type PmtsType = 'CASH' | 'CREDIT' | 'DEBIT' | 'PAYNOW' | 'PAYLAH' | 'PAYPAL' | 'GOOGLEPAY' | 'APPLEPAY';

export class Expense {
  constructor(
    public id?: number | undefined,
    public userId?: number, //mandatory
    public fileUrl?: string,
    public payer?: string,
    public trxTime?: Date, //(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    public total?: number, //mandatory
    public category?: CatType,
    public platform?: PltfmType,
    public merchant?: string,
    public consumer?: string,
    public paymentType?: PmtsType
  ) {}
}
