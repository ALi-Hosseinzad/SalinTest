import React from "react";
import { Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../css/Card.css";

const { Title } = Typography;
const CardComponent = ({ className, icon, title, steps, color, ...props }) => {
  return (
    <div
      {...props}
      className={`card-wrapper ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="card-icon">{icon}</span>
      <br />
      <b className="card-text">{title}</b>
      <Title level={5} className="card-steps">
        {steps} مرحله{" "}
      </Title>
      <div className="card-left">
        <Title level={5} className="card-left-text">
          بعدی
        </Title>
        <ArrowLeftOutlined />
      </div>
    </div>
  );
};

export default CardComponent;
