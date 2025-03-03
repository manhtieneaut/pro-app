import React from 'react';
import { Button } from 'antd';

const AccountReportPreview = () => {
  const pdfUrl = "http://localhost:8083/account";

  const handleDownload = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <iframe src={pdfUrl} width="100%" height="600px" style={{ border: "none" }} />
      <Button type="primary" onClick={handleDownload} style={{ marginTop: "10px" }}>
        Tải Báo Cáo
      </Button>
    </div>
  );
};

export default AccountReportPreview;
