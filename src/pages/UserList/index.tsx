import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "@umijs/max";
import { ProTable, ProColumns, ActionType } from "@ant-design/pro-components";
import { Button, message, Modal, Form, Input } from "antd";
import { debounce } from "lodash"; // Debounce tìm kiếm
import { useCallback } from "react";

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

   // Chỉ gọi API khi trang được mở
   useEffect(() => {
    if (list.length === 0) {
      dispatch({ type: "user/fetchUserList" });
    }
  }, []);


  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue(user); // Gán dữ liệu cũ vào form
    } else {
      setEditingUser(null);
      form.resetFields(); // Xóa dữ liệu form khi thêm mới
    }
    setModalVisible(true);
  };

  const handleAddOrEditUser = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await dispatch({ type: "user/modifyUser", payload: { id: editingUser.id, data: values } });
        message.success("User updated successfully!");
      } else {
        await dispatch({ type: "user/createUser", payload: values });
        message.success("User added successfully!");
      }
      setModalVisible(false);
      form.resetFields();
      setEditingUser(null);
      dispatch({ type: "user/fetchUserList" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = (id: string) => {
    Modal.confirm({
      title: "Are you sure to delete this user?",
      onOk: async () => {
        await dispatch({ type: "user/removeUser", payload: id });
        message.success("User deleted successfully!");
        dispatch({ type: "user/fetchUserList" });
      },
    });
  };

  const columns: ProColumns<User>[] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>Delete</Button>
        </>
      ),
    },
  ];
// Hàm tìm kiếm có debounce
const handleSearch = useCallback(
  debounce((params: any) => {
    dispatch({ type: "user/searchUser", payload: params });
  }, 300), // Chờ 300ms trước khi gửi request
  [dispatch]
);

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
        loading={loading}
        toolBarRender={() => [<Button type="primary" onClick={() => openModal()}>Add User</Button>]}
        onSubmit={handleSearch}
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

export default UserList;
