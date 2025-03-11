import React, { useState } from "react";
import { Card, Form, Select, DatePicker, Button } from "antd";
import { useDispatch, useModel } from "@umijs/max";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const AccountReportPage: React.FC = () => {
  const dispatch = useDispatch();
  const { initialState } = useModel("@@initialState");
  // const customerId = initialState?.currentUser?.customerId || "1"; // Mặc định ID = 1 nếu không có
  const customerId = "1"; // Mặc định ID = 1 nếu không có
  const [form] = Form.useForm();

  // Danh sách tài khoản của người dùng (kèm loại tài khoản)
  const accountsList = [
    { account: "123456789", type: "CURRENT" },
    { account: "987654321", type: "SAVINGS" },
  ];

  // Lấy tài khoản mặc định là tài khoản đầu tiên
  const [selectedAccount, setSelectedAccount] = useState(accountsList[0]);

  const [selectedDateOption, setSelectedDateOption] = useState("month");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(1, "month"),
    dayjs(),
  ]);

  const handleDateChange = (value: string) => {
    setSelectedDateOption(value);
    if (value === "today") {
      setDateRange([dayjs().startOf("day"), dayjs().endOf("day")]);
    } else if (value === "week") {
      setDateRange([dayjs().subtract(1, "week"), dayjs()]);
    } else if (value === "month") {
      setDateRange([dayjs().subtract(1, "month"), dayjs()]);
    }
  };

  const handleDatePickerChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
      setSelectedDateOption(""); // Xóa chọn trong dropdown nếu người dùng tự chọn
    }
  };

  const handleAccountChange = (accountNumber: string) => {
    const selected = accountsList.find((acc) => acc.account === accountNumber);
    if (selected) {
      setSelectedAccount(selected);
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: "accountReport/fetch",
      payload: {
        customerId,
        account: selectedAccount.account,
        accountType: selectedAccount.type, // Gửi loại tài khoản lên server
        startTransactionDate: dateRange[0].toISOString(),
        endTransactionDate: dateRange[1].toISOString(),
      },
    });
  };

  return (
    <Card title="Báo cáo hoạt động tài khoản">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Số tài khoản">
          <Select
            value={selectedAccount.account}
            onChange={handleAccountChange}
            style={{ width: "100%" }}
          >
            {accountsList.map((acc) => (
              <Option key={acc.account} value={acc.account}>
                {`${acc.account} (${acc.type === "CURRENT" ? "Thanh toán" : "Tiết kiệm"})`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Khoảng thời gian giao dịch">
          <Select
            value={selectedDateOption}
            onChange={handleDateChange}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            <Option value="today">Hôm nay</Option>
            <Option value="week">1 tuần trước</Option>
            <Option value="month">1 tháng trước</Option>
          </Select>
          <RangePicker value={dateRange} onChange={handleDatePickerChange} />
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

export default AccountReportPage;
