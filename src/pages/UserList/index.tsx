import React, { useEffect, useState } from "react";
import { ProTable, ProColumns, ActionType } from "@ant-design/pro-components";
import { Button, message, Modal, Form, Input } from "antd";
import { useModel } from "@umijs/max";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserTable: React.FC = () => {
  const { list, fetchUserList, createUser, modifyUser, removeUser } = useModel("user");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const actionRef = React.useRef<ActionType>();

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleAddOrEditUser = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await modifyUser(editingUser.id, values);
        message.success("User updated successfully!");
      } else {
        await createUser(values);
        message.success("User added successfully!");
      }
      setModalVisible(false);
      form.resetFields();
      setEditingUser(null);
      actionRef.current?.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    Modal.confirm({
      title: "Are you sure to delete this user?",
      onOk: async () => {
        await removeUser(id);
        message.success("User deleted successfully!");
        actionRef.current?.reload();
      },
    });
  };

  const columns: ProColumns<User>[] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => {
            setEditingUser(record);
            form.setFieldsValue(record);
            setModalVisible(true);
          }}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<User>
        columns={columns}
        dataSource={list}
        rowKey="id"
        actionRef={actionRef}
        search={{ filterType: "light" }}
        pagination={{ pageSize: 5 }}
        options={{ reload: true, setting: true }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => setModalVisible(true)}>Add User</Button>,
        ]}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={modalVisible}
        onOk={handleAddOrEditUser}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please enter phone" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter address" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserTable;
