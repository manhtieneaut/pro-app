declare namespace API {
  // 🏦 Loại tài khoản
  type AccountType = 'LOAN' | 'PAYMENT' | 'CREDIT' | 'SALARY' | 'BUSINESS' | 'SAVINGS';

  // 📌 Trạng thái khoản vay
  type LoanStatus = 'ACTIVE' | 'CLOSED' | 'DEFAULTED';

  // 🔄 Loại giao dịch
  type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';

  // 🏷️ Trạng thái chung
  type ObjectStatus = 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  // ⚡ Trạng thái giao dịch
  type State = 'PENDING' | 'SUCCESS' | 'FAILED';

  // 📝 1️⃣ Yêu cầu báo cáo tài khoản cá nhân
  type PersonalAccountRequest = {
    account: string;
    accountType: AccountType;
    customerId: string;
    startTransactionDate?: string;
    endTransactionDate?: string;
  };

  // 📝 2️⃣ Yêu cầu báo cáo khoản vay cá nhân
  type PersonalLoanRequest = {
    loanId: string;
    account: string;
    customerId: string;
  };

  // 📝 3️⃣ Yêu cầu báo cáo danh sách tài khoản (admin)
  type AccountsFilterRequest = {
    customerId?: string;
    accountType?: AccountType;
    bankBranch?: string;
    startBalance?: number;
    endBalance?: number;
    startAt?: string;
    endAt?: string;
    status?: ObjectStatus;
  };

  // 📝 4️⃣ Yêu cầu báo cáo danh sách khoản vay (admin)
  type LoansFilterRequest = {
    loanId?: string;
    customerId?: string;
    minLoanAmount?: number;
    maxLoanAmount?: number;
    loanType?: string;
    startAccountDate?: string;
    endAccountDate?: string;
    loanStatus?: LoanStatus;
  };

  // 📝 5️⃣ Yêu cầu báo cáo danh sách giao dịch (admin)
  type TransactionsFilterRequest = {
    startDate?: string;
    endDate?: string;
    customerId?: string;
    minAmount?: number;
    maxAmount?: number;
    transactionType?: TransactionType;
    transactionStatus?: State;
    senderAccountNumber?: string;
    recipientAccountNumber?: string;
  };

  type LoginRequest = {
    phone?: string;
    password?: string;
  };

  type LoginResponse = {
    code: number;
    result: {
      access_token: string;
      expires_in: string;
      refresh_expires_in: string;
      refresh_token: string;
      token_type: string;
      id_token: string;
      scope: string;
    };
  };
}
