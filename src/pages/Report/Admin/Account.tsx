import React from "react";
import { Card, Form, Input, Select, DatePicker, Button } from "antd";
import { useDispatch } from "@umijs/max";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminAccountReportPage: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const { dateRange, ...rest } = values;
    dispatch({
      type: "adminAccountReport/fetch",
      payload: {
        ...rest,
        startAt: dateRange ? dateRange[0].format("YYYY-MM-DD") : undefined,
        endAt: dateRange ? dateRange[1].format("YYYY-MM-DD") : undefined,
      },
    });
  };

  return (
    <Card title="Báo cáo tài khoản - Admin">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="customerId" label="ID Khách hàng">
          <Input placeholder="Nhập ID khách hàng" />
        </Form.Item>

        <Form.Item name="accountType" label="Loại tài khoản">
          <Select placeholder="Chọn loại tài khoản">
            <Option value="SAVINGS">Tiết kiệm</Option>
            <Option value="CURRENT">Thanh toán</Option>
          </Select>
        </Form.Item>

        <Form.Item name="bankBranch" label="Chi nhánh ngân hàng">
          <Input placeholder="Nhập chi nhánh" />
        </Form.Item>

        <Form.Item name="startBalance" label="Số dư tối thiểu">
          <Input type="number" placeholder="Nhập số dư tối thiểu" />
        </Form.Item>

        <Form.Item name="endBalance" label="Số dư tối đa">
          <Input type="number" placeholder="Nhập số dư tối đa" />
        </Form.Item>

        <Form.Item name="dateRange" label="Khoảng thời gian mở tài khoản">
          <RangePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái tài khoản">
          <Select placeholder="Chọn trạng thái">
            <Option value="ACTIVE">Hoạt động</Option>
            <Option value="INACTIVE">Không hoạt động</Option>
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

export default AdminAccountReportPage;
