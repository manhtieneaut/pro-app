import React, { useEffect, useState } from "react";
import { Card, Form, Select, Button } from "antd";
import { useDispatch } from "@umijs/max";

const { Option } = Select;

interface Loan {
  loanId: string;
  account: string;
}

const fakeLoans: Loan[] = [
  { loanId: "LN001", account: "123456789" },
  { loanId: "LN002", account: "987654321" },
  { loanId: "LN003", account: "456789123" },
];

const LoanReportPage: React.FC = () => {
  const dispatch = useDispatch();
  const customerId = "1"; // Đặt cứng ID nếu không tồn tại
  const [loans, setLoans] = useState<Loan[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoans(fakeLoans); // Gán danh sách khoản vay giả lập
  }, []);

  const handleSubmit = (values: { loanId: string }) => {
    dispatch({
      type: "loanReport/fetch",
      payload: {
        ...values,
        customerId,
        accountType: "LOAN_ACCOUNT",
      },
    });
  };

  const handleAllLoansReport = () => {
    dispatch({
      type: "loanReport/fetchAll",
      payload: { customerId, accountType: "LOAN_ACCOUNT" },
    });
  };

  return (
    <Card title="Báo cáo khoản vay">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="loanId"
          label="Chọn khoản vay"
          rules={[{ required: true, message: "Vui lòng chọn khoản vay" }]}
        >
          <Select placeholder="Chọn khoản vay">
            {loans.map((loan) => (
              <Option key={loan.loanId} value={loan.loanId}>
                {loan.loanId} - {loan.account}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lấy báo cáo
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="default"
            onClick={handleAllLoansReport}
          >
            Báo cáo tất cả khoản vay
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoanReportPage;
