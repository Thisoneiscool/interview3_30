export interface ITransactionArray {
  categoryCode: string;
  dates: { valueDate: number };
  merchant: { accountNumber: string; name: string };
  transaction: {
    amountCurrency: { amount: number; currencyCode: string };
    creditDebitIndicator: string;
    type: string;
  };
}
