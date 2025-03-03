import React from 'react';
import { history } from '@umijs/max';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import { login } from '@/services/auth';

const Login = () => {
    const handleLogin = async (values: any) => {
        try {
            const res = await login(values);
            localStorage.setItem('token', res.token);
            message.success('Đăng nhập thành công!');
            history.push('/');
        } catch (err: any) {
            message.error(err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ maxWidth: 400, width: '100%' }}>
                <ProForm onFinish={handleLogin}>
                    <ProFormText name="username" label="Tên đăng nhập" rules={[{ required: true }]} />
                    <ProFormText.Password name="password" label="Mật khẩu" rules={[{ required: true }]} />
                </ProForm>
            </Card>
        </div>
    );
};

export default Login;
