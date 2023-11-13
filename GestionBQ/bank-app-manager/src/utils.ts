import { TransactionStatus, TransactionType } from "./models/transaction.model";

export function getTransactionTypeName(type: TransactionType): string {
    switch (type) {
      case TransactionType.Deposit:
        return 'Deposit';
      case TransactionType.Withdraw:
        return 'Withdraw';
      case TransactionType.Transfer:
        return 'Transfer';
      default:
        return '';
    }
  }
  
  export function getTransactionStatusName(status: TransactionStatus): string {
    switch (status) {
      case TransactionStatus.Pending:
        return 'Pending';
      case TransactionStatus.Completed:
        return 'Completed';
      default:
        return '';
    }
  }

  export function setPort() {
    let manager = localStorage.getItem('manager');
    if (manager) {
      let agency = JSON.parse(manager).agency;
      return mapAgencyWithPort(agency);
    }
    return undefined;
  }
  
  export function mapAgencyWithPort(agencyId: string) {
    switch (agencyId) {
      case '64654f4e373a17165adafa84':
        return 5101;
      case '6465555a0276105f50734a30':
        return 5102;
      default:
        return undefined;
    }
  }