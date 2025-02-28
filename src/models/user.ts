import type { Effect, Reducer } from '@umijs/max';
import { getUsers, addUser, deleteUser, updateUser } from '@/services/user';

export interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any; // Cho phép mở rộng dữ liệu
}

export interface UserModelState {
  list: User[];
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUsers: Effect;
    createUser: Effect;
    removeUser: Effect;
    modifyUser: Effect;
  };
  reducers: {
    saveUsers: Reducer<UserModelState>;
    appendUser: Reducer<UserModelState>;
    removeUserFromList: Reducer<UserModelState>;
    updateUserInList: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    list: [],
  },
  effects: {
    *fetchUsers(_, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(getUsers);
        if (response) {
          yield put({ type: 'saveUsers', payload: response });
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
      }
    },

    *createUser({ payload }, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(addUser, payload);
        if (response) {
          yield put({ type: 'appendUser', payload: response });
        }
      } catch (error) {
        console.error('Lỗi khi thêm người dùng:', error);
      }
    },

    *removeUser({ payload }, { call, put }): Generator<any, void, any> {
      try {
        yield call(deleteUser, payload);
        yield put({ type: 'removeUserFromList', payload });
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    },

    *modifyUser({ payload }, { call, put }): Generator<any, void, any> {
      try {
        const response = yield call(updateUser, payload);
        if (response) {
          yield put({ type: 'updateUserInList', payload: response });
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error);
      }
    },
  },
  reducers: {
    saveUsers(state, { payload }) {
      return { ...state, list: payload };
    },

    appendUser(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },

    removeUserFromList(state, { payload }) {
      return { ...state, list: state.list.filter((user) => user.id !== payload) };
    },

    updateUserInList(state, { payload }) {
      return {
        ...state,
        list: state.list.map((user) => (user.id === payload.id ? { ...user, ...payload } : user)),
      };
    },
  },
};

export default UserModel;
