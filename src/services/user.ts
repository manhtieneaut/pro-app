import request from 'umi-request';

const API_URL = 'https://67c3f2fe89e47db83dd2d735.mockapi.io/api/v1/users';
const CACHE_KEY = 'users_cache';
const CACHE_TIME = 60 * 1000; // 1 phút

const handleError = (error: any, action: string) => {
  console.error(`Error ${action}:`, error);
  return { data: null, success: false };
};

export const fetchUsers = async () => {
  // Kiểm tra cache trước khi gọi API
  const cache = sessionStorage.getItem(CACHE_KEY);
  if (cache) {
    const { data, timestamp } = JSON.parse(cache);
    if (Date.now() - timestamp < CACHE_TIME) {
      console.log('[CACHE] Dùng cache danh sách user');
      return { success: true, data }; // Trả về dữ liệu từ cache
    }
  }

  // Nếu không có cache hợp lệ, gọi API thật
  return request
    .get(API_URL)
    .then((data) => {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      return { data, success: true };
    })
    .catch((error) => handleError(error, 'fetching users'));
};

export const getUserById = async (id: string) =>
  request
    .get(`${API_URL}/${id}`)
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, `fetching user ${id}`));

const updateCache = (users: any[]) => {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: users, timestamp: Date.now() }));
};

export const addUser = async (userData: object) => {
  return request
    .post(API_URL, { data: userData })
    .then((data) => {
      const cache = sessionStorage.getItem(CACHE_KEY);
      if (cache) {
        const { data: users } = JSON.parse(cache);
        updateCache([...users, data]); // Thêm user mới vào cache
      }
      return { data, success: true };
    })
    .catch((error) => handleError(error, 'adding user'));
};

export const updateUser = async (id: string, userData: object) => {
  return request
    .put(`${API_URL}/${id}`, { data: userData })
    .then((data) => {
      const cache = sessionStorage.getItem(CACHE_KEY);
      if (cache) {
        const { data: users } = JSON.parse(cache);
        updateCache(users.map((user: any) => (user.id === id ? { ...user, ...data } : user)));
      }
      return { data, success: true };
    })
    .catch((error) => handleError(error, `updating user ${id}`));
};

export const deleteUser = async (id: string) => {
  return request
    .delete(`${API_URL}/${id}`)
    .then(() => {
      const cache = sessionStorage.getItem(CACHE_KEY);
      if (cache) {
        const { data: users } = JSON.parse(cache);
        updateCache(users.filter((user: any) => user.id !== id)); // Xóa user khỏi cache
      }
      return { success: true };
    })
    .catch((error) => handleError(error, `deleting user ${id}`));
};

export const searchUsers = async (query: Record<string, string>) => {
  const queryString = new URLSearchParams(query).toString();
  return request
    .get(`${API_URL}?${queryString}`)
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, 'searching users'));
};
