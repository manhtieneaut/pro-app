import { Effect, Reducer } from '@umijs/max';
import {
  getPersonalAccountReport,
  getPersonalLoanReport,
  getAccountsListReport,
  getLoansListReport,
  getTransactionsListReport,
} from '@/services/report';
import { message } from 'antd';

// Định nghĩa interface cho state của DVA model
export interface ReportModelState {
  loading: boolean;
  reportBlob: Blob | null;
}

// Định nghĩa model
const ReportModel = {
  namespace: 'report',

  state: {
    loading: false,
    reportBlob: null,
  },

  effects: {
    // Lấy báo cáo tài khoản cá nhân
    *fetchPersonalAccountReport({ payload }: { payload: any }, { call, put }: { call: Function, put: Function }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const response: Blob = yield call(getPersonalAccountReport, payload);
        yield put({ type: 'setReportBlob', payload: response });
      } catch (error) {
        message.error('Lỗi khi tải báo cáo tài khoản cá nhân.');
      }
      yield put({ type: 'setLoading', payload: false });
    },

    // Lấy báo cáo khoản vay cá nhân
    *fetchPersonalLoanReport({ payload }: { payload: any }, { call, put }: { call: Function, put: Function }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const response: Blob = yield call(getPersonalLoanReport, payload);
        yield put({ type: 'setReportBlob', payload: response });
      } catch (error) {
        message.error('Lỗi khi tải báo cáo khoản vay cá nhân.');
      }
      yield put({ type: 'setLoading', payload: false });
    },

    // Lấy báo cáo danh sách tài khoản (admin)
    *fetchAccountsListReport({ payload }: { payload: any }, { call, put }: { call: Function, put: Function }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const response: Blob = yield call(getAccountsListReport, payload);
        yield put({ type: 'setReportBlob', payload: response });
      } catch (error) {
        message.error('Lỗi khi tải báo cáo danh sách tài khoản.');
      }
      yield put({ type: 'setLoading', payload: false });
    },

    // Lấy báo cáo danh sách khoản vay (admin)
    *fetchLoansListReport({ payload }: { payload: any }, { call, put }: { call: Function, put: Function }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const response: Blob = yield call(getLoansListReport, payload);
        yield put({ type: 'setReportBlob', payload: response });
      } catch (error) {
        message.error('Lỗi khi tải báo cáo danh sách khoản vay.');
      }
      yield put({ type: 'setLoading', payload: false });
    },

    // Lấy báo cáo danh sách giao dịch (admin)
    *fetchTransactionsListReport({ payload }: { payload: any }, { call, put }: { call: Function, put: Function }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        const response: Blob = yield call(getTransactionsListReport, payload);
        yield put({ type: 'setReportBlob', payload: response });
      } catch (error) {
        message.error('Lỗi khi tải báo cáo danh sách giao dịch.');
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },

  reducers: {
    // Cập nhật trạng thái loading
    setLoading(state: ReportModelState, { payload }: { payload: boolean }): ReportModelState {
      return { ...state, loading: payload };
    },

    // Lưu blob của báo cáo để tải về
    setReportBlob(state: ReportModelState, { payload }: { payload: Blob | null }): ReportModelState {
      return { ...state, reportBlob: payload };
    },
  },
};

export default ReportModel;
