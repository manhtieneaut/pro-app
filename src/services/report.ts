import { request } from '@umijs/max';
import {
  PersonalAccountRequest,
  PersonalLoanRequest,
  AccountsFilterRequest,
  LoansFilterRequest,
  TransactionsFilterRequest,
} from './types'; // Import các type đã định nghĩa

const API_BASE_URL = 'http://localhost:8080/report/api/v1/reports';

// Hàm chung gọi API báo cáo
async function fetchReport<T>(endpoint: string, data: T): Promise<Blob> {
  return request(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    data,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'blob',
  });
}

// Gọi API báo cáo theo loại tương ứng
export const getPersonalAccountReport = (data: PersonalAccountRequest) =>
  fetchReport('personal-account', data);

export const getPersonalLoanReport = (data: PersonalLoanRequest) =>
  fetchReport('personal-loan', data);

export const getAccountsListReport = (data: AccountsFilterRequest) =>
  fetchReport('accounts-list', data);

export const getLoansListReport = (data: LoansFilterRequest) =>
  fetchReport('loans-list', data);

export const getTransactionsListReport = (data: TransactionsFilterRequest) =>
  fetchReport('transactions-list', data);
