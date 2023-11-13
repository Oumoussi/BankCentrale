export class Transaction {
    id!: string;
    amount: number = null!;
    date!: Date;
    sourceAccount?: string;
    destinationAccount: string = null!;
    type: TransactionType = null!;
    status: TransactionStatus = null!;
    agency: string = null!;
  }
  
  export enum TransactionType {
    Deposit,
    Withdraw,
    Transfer
  }
  
  export enum TransactionStatus {
    Pending,
    Completed,
    Failed
  }
  