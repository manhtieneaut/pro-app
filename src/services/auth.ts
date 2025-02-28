export async function login(data: { username: string; password: string }) {
  if (data.username === 'admin' && data.password === '123456') {
    return { token: 'fake-jwt-token' };
  }
  throw new Error('Sai tài khoản hoặc mật khẩu');
}
