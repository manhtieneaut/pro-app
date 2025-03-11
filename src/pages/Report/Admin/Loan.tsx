import React, { useState } from "react";
import { Card, Form, Input, Select, Button, DatePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminLoanReportPage: React.FC = () => {
  const [form] = Form.useForm();
  
  const handleSubmit = (values: any) => {
    console.log("Lọc báo cáo khoản vay với dữ liệu:", values);
    // Dispatch action hoặc gọi API backend để lấy báo cáo
  };

  return (
    <Card title="Báo cáo khoản vay - Admin">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="loanId" label="ID Khoản vay">
          <Input placeholder="Nhập ID khoản vay" />
        </Form.Item>
        <Form.Item name="customerId" label="ID Khách hàng">
          <Input placeholder="Nhập ID khách hàng" />
        </Form.Item>
        <Form.Item name="minLoanAmount" label="Số tiền vay tối thiểu">
          <Input type="number" placeholder="Nhập số tiền tối thiểu" />
        </Form.Item>
        <Form.Item name="maxLoanAmount" label="Số tiền vay tối đa">
          <Input type="number" placeholder="Nhập số tiền tối đa" />
        </Form.Item>
        <Form.Item name="loanType" label="Loại khoản vay">
          <Select placeholder="Chọn loại khoản vay">
            <Option value="SHORT_TERM">Ngắn hạn</Option>
            <Option value="LONG_TERM">Dài hạn</Option>
          </Select>
        </Form.Item>
        <Form.Item name="accountDateRange" label="Ngày mở khoản vay">
          <RangePicker />
        </Form.Item>
        <Form.Item name="loanStatus" label="Trạng thái khoản vay">
          <Select placeholder="Chọn trạng thái">
            <Option value="ACTIVE">Đang hoạt động</Option>
            <Option value="CLOSED">Đã đóng</Option>
            <Option value="DEFAULT">Nợ xấu</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lấy báo cáo
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminLoanReportPage;
