
export async function login(data: { username: string; password: string }) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập độ trễ
  
    if (data.username === 'admin' && data.password === '123456') {
      return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.signature' };
    }
  
    return Promise.reject({ message: 'Sai tài khoản hoặc mật khẩu', code: 401 });
  }
  