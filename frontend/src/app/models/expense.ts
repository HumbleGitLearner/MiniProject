export type CatType = 'OUTFOOD' | 'GROCERY' | 'TRANSPORT' | 'EDUCATION' | 'CLOTHING' | 'ENTERTAINMENT' | 'HEALTH' | 'APPLIANCES' | 'OTHERS';
export type PltfmType = 'GRAB' | 'NTUC' | 'FOODPANDA' | 'DELIVEROO' | 'SHOPEE' | 'LAZADA' | 'AMAZON' | 'QOO10' | 'CAROUSELL' | 'OTHER';
export type PmtsType = 'CASH' | 'CREDIT' | 'DEBIT' | 'PAYNOW' | 'PAYLAH' | 'PAYPAL' | 'GOOGLEPAY' | 'APPLEPAY';

export interface Expense {
  // constructor(
    id?: number | undefined,
    userId?: number, //mandatory
    fileUrl?: string,
    payer?: string,
    trxTime?: Date, //(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    total?: number, //mandatory
    category?: CatType,
    platform?: PltfmType,
    merchant?: string,
    consumer?: string,
    paymentType?: PmtsType
  // ) {}
}
