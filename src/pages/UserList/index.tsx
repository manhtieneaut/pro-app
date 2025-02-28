import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { PageContainer, ProTable, ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { User } from '@/models/user';

interface UserListProps {
  userList: User[];
  dispatch: Dispatch;
}

const UserList: React.FC<UserListProps> = ({ userList, dispatch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch({ type: 'user/fetchUsers' });
  }, [dispatch]);

  // Xử lý thêm/sửa người dùng
  const handleSubmit = async (values: Partial<User>) => {
    if (currentUser) {
      // Sửa
      await dispatch({ type: 'user/updateUser', payload: { ...currentUser, ...values } });
      message.success('Cập nhật người dùng thành công!');
    } else {
      // Thêm
      await dispatch({ type: 'user/addUser', payload: values });
      message.success('Thêm người dùng thành công!');
    }
    setModalVisible(false);
    setCurrentUser(null);
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = async (id: string) => {
    await dispatch({ type: 'user/deleteUser', payload: id });
    message.success('Xóa người dùng thành công!');
  };

  return (
    <PageContainer>
      <ProTable<User>
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          {
            title: 'Hành động',
            valueType: 'option',
            render: (_, record) => [
              <Button
                key="edit"
                onClick={() => {
                  setCurrentUser(record);
                  setModalVisible(true);
                }}
              >
                Sửa
              </Button>,
              <Popconfirm
                key="delete"
                title="Bạn có chắc muốn xóa?"
                onConfirm={() => handleDeleteUser(String(record.id))}
              >
                <Button danger>Xóa</Button>
              </Popconfirm>,
            ],
          },
        ]}
        dataSource={userList}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentUser(null);
              setModalVisible(true);
            }}
          >
            Thêm người dùng
          </Button>,
        ]}
      />

      {/* Modal Thêm/Sửa Người Dùng */}
      <ModalForm<User>
        title={currentUser ? 'Sửa Người Dùng' : 'Thêm Người Dùng'}
        open={modalVisible}
        onFinish={handleSubmit}
        modalProps={{ onCancel: () => setModalVisible(false) }}
        initialValues={currentUser || {}}
      >
        <ProFormText name="name" label="Tên" rules={[{ required: true }]} />
        <ProFormText name="email" label="Email" rules={[{ required: true, type: 'email' }]} />
      </ModalForm>
    </PageContainer>
  );
};

export default connect(({ user }: { user: { list: User[] } }) => ({
  userList: user.list,
}))(UserList);
