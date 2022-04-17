import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import FormItem from "./FormItem";
import apiService, { errorResponse } from "../api/apiService";
import endpointUrls from "../api/endpointUrls";
import cookie from "js-cookie";
import { setNotificationData } from "../redux/reducer/Toast/toastReducer";
import { useDispatch } from "react-redux";
import useApiCatcher from "../global/useApiCatcher";
import "../css/Avatar.css";

const ChangePassword = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values) => {
    setConfirmLoading(true);
    apiService
      .post(
        endpointUrls.changePassword +
          `?token=${token}&newPassword=${values.password}&curPassword=${values.password}`
      )
      .then((data) => {
        if (data.ok) {
          dispatch(
            setNotificationData({
              message: "شما با موفقیت وارد شدید",
              type: "success",
              time: 5000,
            })
          );

          setVisible(false);
        } else {
          dispatch(
            setNotificationData({
              message: "شماره تماس یا پسورد اشتباه هست",
              type: "success",
              time: 5000,
            })
          );
        }
      })
      .catch(() => {
        apiCatcher(errorResponse);
      });
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="change-password">
      <Button
        type="primary"
        htmlType="ورود"
        shape="round"
        size={"large"}
        block
        onClick={showModal}
      >
        تغییر رمز‌عبور
      </Button>
      <Modal
        title="تغییر رمز عبور"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>آیا مطمئن هستید می‌خواهید رمز عبور خود را تغییر بدهید؟</p>
        <FormItem
          label="پسورد قدیمی"
          name="curPassword"
          rules={[
            {
              required: true,
              message: "پسورد خود را وارد کنید",
            },
            {
              min: "6",
              message: "پسورد باید بیشتر از 6 کاراکتر باشد",
            },
          ]}
        >
          <Input.Password size="large" style={{ borderRadius: "20px" }} />
        </FormItem>
        <FormItem
          label="پسورد جدید"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "پسورد خود را وارد کنید",
            },
            {
              min: "6",
              message: "پسورد باید بیشتر از 6 کاراکتر باشد",
            },
          ]}
        >
          <Input.Password size="large" style={{ borderRadius: "20px" }} />
        </FormItem>
      </Modal>
    </div>
  );
};

export default ChangePassword;
