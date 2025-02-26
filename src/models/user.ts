import type { Effect } from 'dva';
import type { Reducer } from 'redux';
import { getUsers } from '@/services/user';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  [key: string]: any; // Cho phép các trường khác mà API có thể trả về
}

export interface UserModelState {
  list: User[]; // Dùng User[] thay vì any[]
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUsers: Effect;
  };
  reducers: {
    saveUsers: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    list: [],
  },
  effects: {
    *fetchUsers(_, { call, put }): Generator<any, void, any> {
      const response = yield call(getUsers);
      yield put({ type: 'saveUsers', payload: response });
    },
  },
  reducers: {
    saveUsers(state, { payload }) {
      return { ...state, list: payload };
    },
  },
};

export default UserModel;
