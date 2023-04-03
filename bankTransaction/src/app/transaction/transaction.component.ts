import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { CommonUtil } from '../utils/common.util';
import { ITransactionArray } from '../interfaces/transaction.interface';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transferForm: FormGroup = new FormGroup({
    fromAccnt: new FormControl(''),
    toAccnt: new FormControl(''),
    amnt: new FormControl(''),
  });
  transactionsArray: {
    categoryCode: string;
    dates: { valueDate: number };
    merchant: { accountNumber: any; name: string };
    transaction: {
      amountCurrency: { amount: any; currencyCode: string };
      creditDebitIndicator: string;
      type: string;
    }
  }[] = [];
  isSubmitted: Boolean = false;
  balance: number = 5824.76;

  constructor(private transactionService: DataService) {}

  getMerchantLogoUrl(merchantName: string) {
    return CommonUtil.getMerchantLogoUrl(merchantName);
  }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((response) => {
      this.transactionsArray = response.data;
    });
  }
  onSubmit() {
    this.isSubmitted = false
    this.balance -= this.transferForm.get('amnt')?.value;
    const obj: ITransactionArray = {
      categoryCode: '#12a580',
      dates: {
        valueDate: new Date().getTime(),
      },
      merchant: {
        accountNumber: this.transferForm.get('toAccnt')?.value,
        name: 'Test',
      },
      transaction: {
        amountCurrency: {
          amount: this.transferForm.get('amnt')?.value,
          currencyCode: 'EUR',
        },
        creditDebitIndicator: 'DBIT',
        type: 'Card Payment',
      },
    };
    this.transactionsArray = [obj, ...this.transactionsArray]
  }
}
