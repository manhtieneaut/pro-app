import { Effect, Reducer } from '@umijs/max';
import { fetchUsers, getUserById, addUser, updateUser, deleteUser, searchUsers } from '@/services/user';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UserModelState {
  list: User[];
  currentUser: User | null;
  loading: boolean;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUserList: Effect;
    fetchUserDetail: Effect;
    createUser: Effect;
    modifyUser: Effect;
    removeUser: Effect;
    searchUser: Effect;
  };
  reducers: {
    saveUsers: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
    setLoading: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    list: [],
    currentUser: null,
    loading: false,
  },

  effects: {
    *fetchUserList(_, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(fetchUsers);
      if (response.success) {
        yield put({ type: 'saveUsers', payload: response.data });
      }
      yield put({ type: 'setLoading', payload: false });
    },

    *fetchUserDetail({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(getUserById, payload);
      if (response.success) {
        yield put({ type: 'saveCurrentUser', payload: response.data });
      }
      yield put({ type: 'setLoading', payload: false });
    },

    *createUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(addUser, payload);
      if (response.success) {
        yield put({ type: 'fetchUserList' });
      }
      yield put({ type: 'setLoading', payload: false });
    },

    *modifyUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(updateUser, payload.id, payload.data);
      if (response.success) {
        yield put({ type: 'fetchUserList' });
      }
      yield put({ type: 'setLoading', payload: false });
    },

    *removeUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(deleteUser, payload);
      if (response.success) {
        yield put({ type: 'fetchUserList' });
      }
      yield put({ type: 'setLoading', payload: false });
    },

    *searchUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(searchUsers, payload);
      if (response.success) {
        yield put({ type: 'saveUsers', payload: response.data });
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },

  reducers: {
    saveUsers(state, { payload }) {
      return { ...state, list: payload };
    },
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};

export default UserModel;
