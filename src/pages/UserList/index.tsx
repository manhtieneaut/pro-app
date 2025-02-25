import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Button, Modal, Form, Input } from 'antd';

const UserList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // setLoading(false);
      });
  }, []);
  const handleAddUser = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      setData([...data, { id: data.length + 1, ...values }]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };
  return (
    <PageContainer>
      <Button
        type="primary"
        onClick={handleAddUser}
        style={{
          marginBottom: 16,
        }}
      >
        Thêm người dùng
      </Button>
      <Table columns={[{ title: 'Tên', dataIndex: 'name' }]} dataSource={data} rowKey="id" />
      <Modal
        title="Thêm người dùng"
        open={isModalVisible}
        onOk={handleOk} // thay visible bằng open
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
export default UserList;
