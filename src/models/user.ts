import { Effect, Reducer } from '@umijs/max';
import { fetchUsers, addUser, updateUser, deleteUser, searchUsers } from '@/services/user';

/**
 * Định nghĩa giao diện dữ liệu của một người dùng
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Định nghĩa trạng thái (state) của model
 */
export interface UserModelState {
  list: User[]; // Danh sách người dùng
  loading: boolean; // Trạng thái loading khi gọi API
}

/**
 * Định nghĩa model bao gồm namespace, state, effects (bất đồng bộ) và reducers (đồng bộ)
 */
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUserList: Effect; // Lấy danh sách người dùng
    createUser: Effect; // Thêm mới người dùng
    modifyUser: Effect; // Cập nhật thông tin người dùng
    removeUser: Effect; // Xóa người dùng
    searchUser: Effect; // Tìm kiếm người dùng
  };
  reducers: {
    saveUsers: Reducer<UserModelState>; // Lưu danh sách user vào state
    addUserSuccess: Reducer<UserModelState>; // Thêm user mới vào danh sách
    updateUserSuccess: Reducer<UserModelState>; // Cập nhật user trong danh sách
    deleteUserSuccess: Reducer<UserModelState>; // Xóa user khỏi danh sách
    setLoading: Reducer<UserModelState>; // Cập nhật trạng thái loading
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    list: [], // Mặc định danh sách user rỗng
    loading: false, // Mặc định không tải dữ liệu
  },

  effects: {
    /**
     * Lấy danh sách người dùng từ API
     */
    *fetchUserList(_, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true }); // Bật trạng thái loading
      const response = yield call(fetchUsers); // Gọi API lấy danh sách user
      if (response.success) {
        yield put({ type: 'saveUsers', payload: response.data }); // Lưu dữ liệu vào state
      }
      yield put({ type: 'setLoading', payload: false }); // Tắt trạng thái loading
    },

    /**
     * Thêm mới một người dùng
     */
    *createUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(addUser, payload); // Gọi API thêm user mới
      if (response.success) {
        yield put({ type: 'addUserSuccess', payload: response.data }); // Cập nhật state sau khi thêm thành công
      }
      yield put({ type: 'setLoading', payload: false });
    },

    /**
     * Cập nhật thông tin người dùng
     */
    *modifyUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(updateUser, payload.id, payload.data); // Gọi API cập nhật user
      if (response.success) {
        yield put({ type: 'updateUserSuccess', payload: response.data }); // Cập nhật user trong danh sách
      }
      yield put({ type: 'setLoading', payload: false });
    },

    /**
     * Xóa một người dùng
     */
    *removeUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(deleteUser, payload); // Gọi API xóa user
      if (response.success) {
        yield put({ type: 'deleteUserSuccess', payload }); // Xóa user khỏi danh sách
      }
      yield put({ type: 'setLoading', payload: false });
    },

    /**
     * Tìm kiếm người dùng theo từ khóa
     */
    *searchUser({ payload }, { call, put }): Generator<any, void, any> {
      yield put({ type: 'setLoading', payload: true });
      const response = yield call(searchUsers, payload); // Gọi API tìm kiếm
      if (response.success) {
        yield put({ type: 'saveUsers', payload: response.data || [] }); // Cập nhật danh sách, đảm bảo rỗng nếu không có kết quả
      } else {
        yield put({ type: 'saveUsers', payload: [] }); // Nếu lỗi, cũng hiển thị rỗng
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },

  reducers: {
    /**
     * Lưu danh sách người dùng vào state
     */
    saveUsers(state, { payload }) {
      return { ...state, list: payload };
    },

    /**
     * Thêm một người dùng mới vào danh sách
     */
    addUserSuccess(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },

    /**
     * Cập nhật thông tin của một người dùng trong danh sách
     */
    updateUserSuccess(state, { payload }) {
      return {
        ...state,
        list: state.list.map((user) => (user.id === payload.id ? { ...user, ...payload } : user)),
      };
    },

    /**
     * Xóa một người dùng khỏi danh sách
     */
    deleteUserSuccess(state, { payload }) {
      return {
        ...state,
        list: state.list.filter((user) => user.id !== payload),
      };
    },

    /**
     * Cập nhật trạng thái loading
     */
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};

export default UserModel;
