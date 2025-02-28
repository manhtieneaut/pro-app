import { PageContainer, ProTable } from '@ant-design/pro-components';

interface RecordType {
  id: number;
  title: string;
  body: string;
}

const handleEdit = (record: RecordType): void => {
  // Implement edit functionality
  console.log('Edit record', record);
};

const handleDelete = (id: number): void => {
  // Implement delete functionality
  console.log('Delete record with id', id);
};

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Content',
    dataIndex: 'body',
    key: 'body',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: { id: number; title: string; body: string }) => (
      <span>
        <a onClick={() => handleEdit(record)}>Edit</a>
        <a onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>
          Delete
        </a>
      </span>
    ),
  },
];

const Post = () => {
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={async () => {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await response.json();
          return {
            data,
            success: true,
          };
        }}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
      />
    </PageContainer>
  );
};
export default Post;
