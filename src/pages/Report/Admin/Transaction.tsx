import React from 'react';
import { Card, Form, Input, Select, DatePicker, Button } from 'antd';
import { useDispatch } from '@umijs/max';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionReportPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  interface FormValues {
    dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
    minAmount?: number;
    maxAmount?: number;
    transactionType?: string;
    transactionStatus?: string;
    senderAccountNumber?: string;
    recipientAccountNumber?: string;
  }

  const handleSubmit = (values: FormValues) => {
    dispatch({
      type: 'transactionReport/fetch',
      payload: {
        ...values,
        startDate: values.dateRange ? values.dateRange[0].toISOString() : null,
        endDate: values.dateRange ? values.dateRange[1].toISOString() : null,
      },
    });
  };

  return (
    <Card title="Báo cáo giao dịch - Admin">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="dateRange" label="Khoảng thời gian giao dịch">
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="minAmount" label="Số tiền tối thiểu">
          <Input type="number" placeholder="Nhập số tiền tối thiểu" />
        </Form.Item>
        <Form.Item name="maxAmount" label="Số tiền tối đa">
          <Input type="number" placeholder="Nhập số tiền tối đa" />
        </Form.Item>
        <Form.Item name="transactionType" label="Loại giao dịch">
          <Select placeholder="Chọn loại giao dịch">
            <Option value="DEPOSIT">Nạp tiền</Option>
            <Option value="WITHDRAWAL">Rút tiền</Option>
            <Option value="TRANSFER">Chuyển khoản</Option>
          </Select>
        </Form.Item>
        <Form.Item name="transactionStatus" label="Trạng thái giao dịch">
          <Select placeholder="Chọn trạng thái">
            <Option value="PENDING">Chờ xử lý</Option>
            <Option value="COMPLETED">Hoàn thành</Option>
            <Option value="FAILED">Thất bại</Option>
          </Select>
        </Form.Item>
        <Form.Item name="senderAccountNumber" label="Số tài khoản gửi">
          <Input placeholder="Nhập số tài khoản gửi" />
        </Form.Item>
        <Form.Item name="recipientAccountNumber" label="Số tài khoản nhận">
          <Input placeholder="Nhập số tài khoản nhận" />
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

export default TransactionReportPage;
