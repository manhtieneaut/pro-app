# Prompt để thêm xác thực đăng nhập vào Ant Design Pro

Dùng khi bạn muốn thêm tính năng đăng nhập và bảo vệ route trong ứng dụng Ant Design Pro.

## Prompt

Hãy tạo trang đăng nhập cho ứng dụng Ant Design Pro:

- Form đăng nhập gồm: Tên đăng nhập, Mật khẩu.
- Khi nhập đúng `admin` / `123456`, lưu token vào localStorage và chuyển hướng về trang chính.
- Nếu không có token, tự động chuyển hướng về trang `/login`.
- Bảo vệ tất cả các route cần đăng nhập bằng wrapper.
- Mã nguồn đầy đủ bằng TypeScript.

### Kết quả mong đợi

- Form đăng nhập sử dụng ProForm.
- Lưu JWT token vào localStorage.
- Redirect người dùng chưa đăng nhập.
