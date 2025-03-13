import request from 'umi-request';
import {
  PersonalAccountRequest,
  PersonalLoanRequest,
  AccountsFilterRequest,
  LoansFilterRequest,
  TransactionsFilterRequest,
} from './types';

const API_BASE_URL = 'http://localhost:8080/report/api/v1';

export const generatePersonalAccountReportTest = (data: PersonalAccountRequest) =>
  request(`${API_BASE_URL}/test-pdf`, { method: "POST", responseType: "blob", data });

export const generatePersonalAccountReport = (data: PersonalAccountRequest) =>
  request(`${API_BASE_URL}/account/pdf`, { method: "POST", responseType: "blob", data });

export const generatePersonalLoanReport = (data: PersonalLoanRequest) =>
  request(`${API_BASE_URL}/loan/pdf`, { method: "POST", responseType: "blob", data });

export const generateAccountsListReport = (data: AccountsFilterRequest) =>
  request(`${API_BASE_URL}/accounts/pdf`, { method: "POST", responseType: "blob", data });

export const generateLoansListReport = (data: LoansFilterRequest) =>
  request(`${API_BASE_URL}/loans/pdf`, { method: "POST", responseType: "blob", data });

export const generateTransactionsListReport = (data: TransactionsFilterRequest) =>
  request(`${API_BASE_URL}/transactions/pdf`, { method: "POST", responseType: "blob", data });
