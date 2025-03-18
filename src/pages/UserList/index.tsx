import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '@umijs/max';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, message, Modal, Form, Input, Card, Space, Typography } from 'antd';
import { useAccess } from '@umijs/max';
import { debounce } from 'lodash';
import isEqual from 'lodash/isEqual';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

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
  const access = useAccess();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    dispatch({ type: 'user/fetchUserList' });
  }, [dispatch]);

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
    debounce((params: any) => {
      dispatch({ type: 'user/searchUser', payload: params });
    }, 300),
    [dispatch],
  );

  const columns = useMemo<ProColumns<User>[]>(() => {
    const baseColumns: ProColumns<User>[] = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Phone', dataIndex: 'phone', key: 'phone' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
    ];

    if (access.canAdmin) {
      baseColumns.push({
        title: 'Actions',
        key: 'actions',
        search: false,
        render: (_, record) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteUser(record.id)} />
          </Space>
        ),
      });
    }

    return baseColumns;
  }, [access.canAdmin, handleDeleteUser]);

  const handleAddOrEditUser = useCallback(async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        if (isEqual(values, editingUser)) {
          message.info('Không có thay đổi nào, không gửi request!');
          return;
        }
        await dispatch({ type: 'user/modifyUser', payload: { id: editingUser.id, data: values } });
        dispatch({ type: 'user/updateUserInState', payload: { id: editingUser.id, data: values } });
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
  }, [form, editingUser, dispatch]);

  return (
    <Card style={{ borderRadius: 10, padding: 20 }}>
      <Title level={3}>User Management</Title>
      <ProTable<User>
        columns={columns}
        dataSource={list}
        rowKey="id"
        actionRef={actionRef}
        search={{ filterType: 'light' }}
        pagination={{ pageSize: 5 }}
        loading={loading}
        toolBarRender={() => [
          <Button key="addUser" type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
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
        centered
        okText={editingUser ? 'Update' : 'Create'}
        cancelText="Cancel"
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
    </Card>
  );
};

export default UserList;
