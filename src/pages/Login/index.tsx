import React, { useState } from 'react';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { message, Form, Input, Button } from 'antd';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { phone: string; password: string }) => {
    setLoading(true);
    try {
      const response: any = await fetch('http://localhost:8080/customer/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: values.phone,
          password: values.password,
        }),
      });

      const data: any = await response.json();

      console.log('Response:', data);

      if (data.result?.access_token) {
        localStorage.setItem('access_token', data.result.access_token);
        localStorage.setItem('refresh_token', data.result.refresh_token);
        message.success('Đăng nhập thành công!');
        window.location.href = '/dashboard';
      } else {
        message.error('Đăng nhập thất bại! Không có access_token.');
      }
    } catch (error) {
      message.error('Đăng nhập thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '50px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img alt="logo" src="/logo.svg" style={{ width: '100px', marginBottom: '10px' }} />
        <br />
        Kiên Long Bank
      </h2>
      <Form name="login" onFinish={handleLogin}>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Số điện thoại không được bỏ trống!' },
            { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' },
          ]}
        >
          <Input prefix={<MobileOutlined />} placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
