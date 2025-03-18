import request from 'umi-request';

const API_BASE_URL = 'http://localhost:8083/api/v1';

export const generatePersonalAccountReportTest = (data: API.PersonalAccountRequest) =>
  request(`${API_BASE_URL}/test-pdf`, { method: 'POST', responseType: 'blob', data });

export const generatePersonalAccountReport = (data: API.PersonalAccountRequest) =>
  request(`${API_BASE_URL}/account/pdf`, { method: 'POST', responseType: 'blob', data });

export const generatePersonalLoanReport = (data: API.PersonalLoanRequest) =>
  request(`${API_BASE_URL}/loan/pdf`, { method: 'POST', responseType: 'blob', data });

export const generateAccountsListReport = (data: API.AccountsFilterRequest) =>
  request(`${API_BASE_URL}/accounts/pdf`, { method: 'POST', responseType: 'blob', data });

export const generateLoansListReport = (data: API.LoansFilterRequest) =>
  request(`${API_BASE_URL}/loans/pdf`, { method: 'POST', responseType: 'blob', data });

export const generateTransactionsListReport = (data: API.TransactionsFilterRequest) =>
  request(`${API_BASE_URL}/transactions/pdf`, { method: 'POST', responseType: 'blob', data });
