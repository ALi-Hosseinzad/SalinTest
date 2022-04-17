import React from "react";
import { Row, Col } from "antd";

const ValuePart = () => {
  const list = [
    {
      title: "دنبال‌کنندگان",
      value: 38,
    },
    {
      title: "بازدیدکنندگان",
      value: 12,
    },
    {
      title: "مراجعه‌کنندگان",
      value: 52,
    },
  ];
  return (
    <Row gutter={[16, 16]} className="amounts-wrapper">
      {list.map((item, index) => (
        <Col span={8} key={index}>
          <div className="amounts">
            <p>{item.title}</p>
            <b>{item.value}</b>
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default ValuePart;
