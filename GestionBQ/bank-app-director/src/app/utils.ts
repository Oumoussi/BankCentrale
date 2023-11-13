import { TransactionStatus, TransactionType } from "../models/transaction.model";

export function getTransactionTypeName(type: TransactionType): string {
  switch (type) {
    case TransactionType.Deposit:
      return 'Deposit';
    case TransactionType.Withdraw:
      return 'Withdraw';
    case TransactionType.Transfer:
      return 'Transfer';
  }
}

export function getTransactionStatusName(status: TransactionStatus): string {
  switch (status) {
    case TransactionStatus.Pending:
      return 'Pending';
    case TransactionStatus.Completed:
      return 'Completed';
    case TransactionStatus.Failed:
      return 'Failed';
  }
}
