import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '@umijs/max';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, message, Modal, Form, Input } from 'antd';
import { useCallback, useMemo } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    dispatch({ type: 'user/fetchUserList' });
  }, []); // ✅ Chỉ gọi API khi component mount

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue(user);
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        await dispatch({ type: 'user/removeUser', payload: id });
        message.success('User deleted successfully!');
      } catch (error) {
        console.error(error);
        message.error('Failed to delete user.');
      }
    },
    [dispatch],
  );

  const handleSearch = useCallback(
    (params: any) => {
      dispatch({ type: 'user/searchUser', payload: params });
    },
    [dispatch],
  );

  const columns: ProColumns<User>[] = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Phone', dataIndex: 'phone', key: 'phone' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => openModal(record)}>
              Edit
            </Button>
            <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    [], // ✅ Chỉ tạo lại khi component mount
  );

  const handleAddOrEditUser = useCallback(async () => {
    try {
      const values = await form.validateFields();

      if (editingUser) {
        const isChanged = Object.keys(values).some(
          (key) => values[key] !== editingUser[key as keyof User],
        );

        if (!isChanged) {
          message.info('Không có thay đổi nào, không gửi request!');
          return;
        }

        await dispatch({
          type: 'user/modifyUser',
          payload: { id: editingUser.id, data: values },
        });

        // Cập nhật state trực tiếp để tránh fetch lại danh sách
        dispatch({
          type: 'user/updateUserInState',
          payload: { id: editingUser.id, data: values },
        });

        message.success('User updated successfully!');
      } else {
        await dispatch({ type: 'user/createUser', payload: values });
        message.success('User added successfully!');
      }

      setModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  }, [form, editingUser, dispatch]); // Chỉ tạo lại khi một trong các dependencies thay đổi

  return (
    <>
      <ProTable<User>
        columns={columns}
        dataSource={list}
        rowKey="id"
        actionRef={actionRef}
        search={{ filterType: 'light' }}
        pagination={{ pageSize: 5 }}
        options={{ reload: true, setting: true }}
        loading={loading}
        toolBarRender={() => [
          <Button key="addUser" type="primary" onClick={() => openModal()}>
            Add User
          </Button>,
        ]}
        onSubmit={handleSearch}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={modalVisible}
        onOk={handleAddOrEditUser}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserList;
