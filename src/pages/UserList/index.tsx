import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Tag } from 'antd';
const UserList: React.FC = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (text: string) => (
        <a href={`http://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => <Tag color="green">Active</Tag>,
    },
  ];
  return (
    <PageContainer>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
    </PageContainer>
  );
};
export default UserList;
