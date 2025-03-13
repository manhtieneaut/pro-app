// services/types.ts

// Định nghĩa các enum thay vì chỉ dùng string
export enum AccountType {
  LOAN = "LOAN",
  PAYMENT = "PAYMENT",
  CREDIT = "CREDIT",
  SALARY = "SALARY",
  BUSINESS = "BUSINESS",
  SAVINGS = "SAVINGS",
}


export enum LoanStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  DEFAULTED = "DEFAULTED",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  TRANSFER = "TRANSFER",
}

export enum ObjectStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum State {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

// 1️⃣ Yêu cầu báo cáo tài khoản cá nhân
export interface PersonalAccountRequest {
  account: string;
  accountType: AccountType;
  customerId: string;
  startTransactionDate?: string; // ISO 8601: YYYY-MM-DDTHH:mm:ss
  endTransactionDate?: string;
}

// 2️⃣ Yêu cầu báo cáo khoản vay cá nhân
export interface PersonalLoanRequest {
  loanId: string;
  account: string;
  accountType: AccountType;
  customerId: string;
}

// 3️⃣ Yêu cầu báo cáo danh sách tài khoản (admin)
export interface AccountsFilterRequest {
  customerId?: string;
  accountType?: AccountType;
  bankBranch?: string;
  startBalance?: number;
  endBalance?: number;
  startAt?: string; // YYYY-MM-DD
  endAt?: string;
  status?: ObjectStatus;
}

// 4️⃣ Yêu cầu báo cáo danh sách khoản vay (admin)
export interface LoansFilterRequest {
  loanId?: string;
  customerId?: string;
  minLoanAmount?: number;
  maxLoanAmount?: number;
  loanType?: string; // Enum từ backend
  startAccountDate?: string;
  endAccountDate?: string;
  loanStatus?: LoanStatus;
}

// 5️⃣ Yêu cầu báo cáo danh sách giao dịch (admin)
export interface TransactionsFilterRequest {
  startDate?: string;
  endDate?: string;
  customerId?: string;
  minAmount?: number;
  maxAmount?: number;
  transactionType?: TransactionType;
  transactionStatus?: State;
  senderAccountNumber?: string;
  recipientAccountNumber?: string;
}
