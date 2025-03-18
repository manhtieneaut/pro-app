import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Form, Select, DatePicker, Button, App, message, Space, Modal } from 'antd';
import dayjs from 'dayjs';
import { generatePersonalAccountReport } from '@/services/Report/api';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AccountReportPage: React.FC = () => {
  const accountsList = useMemo(() => [{ account: '119016308300358', type: 'Thanh toán' }], []);
  const customerId = 'ad9b4c9f-3b4c-4875-8b1c-5173f80a9cf6';

  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accountsList[0].account);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(1, 'month'),
    dayjs(),
  ]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleQuickSelect = useCallback((rangeType: string) => {
    let startDate = dayjs();
    switch (rangeType) {
      case 'today':
        startDate = dayjs();
        break;
      case 'week':
        startDate = dayjs().subtract(1, 'week');
        break;
      case 'month':
        startDate = dayjs().subtract(1, 'month');
        break;
      case 'threeMonths':
        startDate = dayjs().subtract(3, 'month');
        break;
      default:
        return;
    }
    setDateRange([startDate, dayjs()]);
  }, []);

  const handleSubmit = async () => {
    if (!dateRange[0] || !dateRange[1]) {
      message.error('Vui lòng chọn khoảng thời gian hợp lệ.');
      return;
    }

    const requestData: API.PersonalAccountRequest = {
      customerId,
      account: selectedAccount,
      accountType: 'PAYMENT',
      startTransactionDate: dateRange[0].format('YYYY-MM-DDTHH:mm:ss'),
      endTransactionDate: dateRange[1].format('YYYY-MM-DDTHH:mm:ss'),
    };

    try {
      setLoading(true);
      const response = await generatePersonalAccountReport(requestData);

      if (response instanceof Blob && response.type === 'application/pdf') {
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        const pdfObjectUrl = URL.createObjectURL(response);
        setPdfUrl(pdfObjectUrl);
        setIsModalVisible(true);
      } else {
        message.error('Lỗi: Định dạng file không hợp lệ.');
      }
    } catch (error: any) {
      message.error(error?.message || 'Lỗi khi tải báo cáo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <App>
      <Card title="Báo cáo hoạt động tài khoản">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Số tài khoản">
            <Select value={selectedAccount} onChange={setSelectedAccount} style={{ width: '100%' }}>
              {accountsList.map((acc) => (
                <Option key={acc.account} value={acc.account}>
                  {`${acc.account} (${acc.type})`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Khoảng thời gian giao dịch">
            <Space style={{ marginBottom: 10 }}>
              <Button onClick={() => handleQuickSelect('today')}>Hôm nay</Button>
              <Button onClick={() => handleQuickSelect('week')}>1 Tuần</Button>
              <Button onClick={() => handleQuickSelect('month')}>1 Tháng</Button>
              <Button onClick={() => handleQuickSelect('threeMonths')}>3 Tháng</Button>
            </Space>

            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
              disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? 'Đang tải...' : 'Lấy báo cáo'}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="Xem trước báo cáo"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" style={{ border: 'none' }} />}
      </Modal>
    </App>
  );
};

export default AccountReportPage;
