import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { Column, Line, Pie, Area } from '@ant-design/charts';

const Dashboard = () => {
  const columnData = [
    { category: 'Tháng 1', value: 300 },
    { category: 'Tháng 2', value: 450 },
    { category: 'Tháng 3', value: 500 },
    { category: 'Tháng 4', value: 700 },
  ];

  const lineData = [
    { time: 'Thứ 2', value: 120 },
    { time: 'Thứ 3', value: 200 },
    { time: 'Thứ 4', value: 150 },
    { time: 'Thứ 5', value: 300 },
  ];

  const pieData = [
    { type: 'Sản phẩm A', value: 35 },
    { type: 'Sản phẩm B', value: 25 },
    { type: 'Sản phẩm C', value: 40 },
  ];

  const areaData = [
    { month: 'Jan', value: 50 },
    { month: 'Feb', value: 80 },
    { month: 'Mar', value: 65 },
    { month: 'Apr', value: 120 },
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

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Doanh thu theo tháng">
            <Column data={columnData} xField="category" yField="value" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Xu hướng lượt truy cập">
            <Line data={lineData} xField="time" yField="value" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Tỉ lệ sản phẩm bán ra">
            <Pie data={pieData} angleField="value" colorField="type" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tăng trưởng khách hàng">
            <Area data={areaData} xField="month" yField="value" />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
