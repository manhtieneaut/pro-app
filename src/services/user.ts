import request from "umi-request";

const API_URL = "https://67c3f2fe89e47db83dd2d735.mockapi.io/api/v1/users";

/**
 * Lấy danh sách người dùng
 */
export const fetchUsers = async () => {
  try {
    const data = await request(API_URL, { method: "GET" });
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { data: [], success: false };
  }
};

/**
 * Lấy thông tin người dùng theo ID
 */
export const getUserById = async (id: string) => {
  try {
    const data = await request(`${API_URL}/${id}`, { method: "GET" });
    return { data, success: true };
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return { data: null, success: false };
  }
};

/**
 * Thêm người dùng mới
 */
export const addUser = async (userData: { name: string; email: string; phone: string; address: string }) => {
  try {
    const data = await request(API_URL, {
      method: "POST",
      data: userData,
    });
    return { data, success: true };
  } catch (error) {
    console.error("Error adding user:", error);
    return { data: null, success: false };
  }
};

/**
 * Cập nhật thông tin người dùng
 */
export const updateUser = async (id: string, userData: Partial<{ name: string; email: string; phone: string; address: string }>) => {
  try {
    const data = await request(`${API_URL}/${id}`, {
      method: "PUT",
      data: userData,
    });
    return { data, success: true };
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    return { data: null, success: false };
  }
};

/**
 * Xóa người dùng
 */
export const deleteUser = async (id: string) => {
  try {
    await request(`${API_URL}/${id}`, { method: "DELETE" });
    return { success: true };
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    return { success: false };
  }
};
