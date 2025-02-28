import { history } from '@umijs/max';
import { Outlet } from '@umijs/max';
import React from 'react';

export default () => {
  const token = localStorage.getItem('token');

  if (!token) {
    history.push('/login');
    return null;
  }

  return <Outlet />; // Thay vì dùng props.children
};
