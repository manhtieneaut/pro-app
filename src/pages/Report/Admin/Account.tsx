import React, { useState } from "react";
import { Card, Form, Input, Select, DatePicker, Button, message, Modal } from "antd";
import { generateAccountsListReport } from "@/services/report";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminAccountReportPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = async (values: any) => {
    const { dateRange, ...rest } = values;
    const requestData = {
      ...rest,
      startAt: dateRange ? dateRange[0].format("YYYY-MM-DD") : undefined,
      endAt: dateRange ? dateRange[1].format("YYYY-MM-DD") : undefined,
    };

    try {
      setLoading(true);
      const response = await generateAccountsListReport(requestData);

      if (response instanceof Blob) {
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);

        const pdfObjectUrl = URL.createObjectURL(response);
        setPdfUrl(pdfObjectUrl);
        setIsModalVisible(true); // Mở modal hiển thị báo cáo
      } else {
        message.error("Lỗi khi tạo báo cáo.");
      }
    } catch (error) {
      message.error("Lỗi khi tải báo cáo.");
    } finally {
      setLoading(false);
    }
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
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Đang tải..." : "Lấy báo cáo"}
          </Button>
        </Form.Item>
      </Form>

      {/* Modal hiển thị PDF */}
      <Modal
        title="Xem trước báo cáo"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" style={{ border: "none" }} />}
      </Modal>
    </Card>
  );
};

export default AdminAccountReportPage;
