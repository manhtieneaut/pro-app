import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { Bar } from '@ant-design/charts';
const Dashboard: React.FC = () => {
  const data = [
    { category: 'A', value: 30 },
    { category: 'B', value: 80 },
    { category: 'C', value: 45 },
    { category: 'D', value: 60 },
  ];
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Người dùng mới" value={1203} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Doanh thu" value={15432} prefix="$" />
          </Card>
        </Col>
      </Row>
      <Card title="Thống kê doanh số">
        <Bar data={data} xField="category" yField="value" />
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
