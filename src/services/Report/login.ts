import request from 'umi-request';

const API_BASE_URL = 'http://localhost:8080/customer/api/v1/auth/token';

export async function Login(phone: string, password: string): Promise<any> {
  return request<any>(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      phone,
      password,
    },
  });
}
