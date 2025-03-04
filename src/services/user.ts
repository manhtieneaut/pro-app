import request from 'umi-request';

const API_URL = 'https://67c3f2fe89e47db83dd2d735.mockapi.io/api/v1/users';

const handleError = (error: any, action: string) => {
  console.error(`Error ${action}:`, error);
  return { data: null, success: false };
};

export const fetchUsers = async () =>
  request
    .get(API_URL)
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, 'fetching users'));

export const getUserById = async (id: string) =>
  request
    .get(`${API_URL}/${id}`)
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, `fetching user ${id}`));

export const addUser = async (userData: object) =>
  request
    .post(API_URL, { data: userData })
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, 'adding user'));

export const updateUser = async (id: string, userData: object) =>
  request
    .put(`${API_URL}/${id}`, { data: userData })
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, `updating user ${id}`));

export const deleteUser = async (id: string) =>
  request
    .delete(`${API_URL}/${id}`)
    .then(() => ({ success: true }))
    .catch((error) => handleError(error, `deleting user ${id}`));

export const searchUsers = async (query: Record<string, string>) => {
  const queryString = new URLSearchParams(query).toString();
  return request
    .get(`${API_URL}?${queryString}`)
    .then((data) => ({ data, success: true }))
    .catch((error) => handleError(error, 'searching users'));
};
