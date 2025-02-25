import React, { useEffect, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { getUsers, deleteUser } from '@/services/user';
const UserList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setData(response);
    } catch (error) {
      message.error('Lỗi tải dữ liệu');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk: async () => {
        await deleteUser(id);
        message.success('Xóa thành công!');
        loadUsers();
      },
    });
  };
  return (
    <PageContainer>
      <ProTable
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          {
            title: 'Thao tác',
            render: (_, record) => (
              <Button type="link" danger onClick={() => handleDelete(record.id)}>
                Xóa
              </Button>
            ),
          },
        ]}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />
    </PageContainer>
  );
};
export default UserList;
