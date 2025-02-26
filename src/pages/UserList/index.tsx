import React, { useEffect } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { User } from '@/models/user';

interface UserListProps {
  userList: User[]; // Định nghĩa kiểu dữ liệu rõ ràng
  dispatch: Dispatch;
}

const UserList: React.FC<UserListProps> = ({ userList, dispatch }) => {
  useEffect(() => {
    dispatch({ type: 'user/fetchUsers' });
  }, [dispatch]);

  return (
    <PageContainer>
      <ProTable<User>
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
        ]}
        dataSource={userList}
        rowKey="id"
      />
    </PageContainer>
  );
};

export default connect(({ user }: { user: { list: User[] } }) => ({
  userList: user.list,
}))(UserList);
