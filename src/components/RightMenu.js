import React from "react";
import { Menu, Button } from "antd";
import { setNotificationData } from "../redux/reducer/Toast/toastReducer";
import { useNavigate } from "react-router-dom";
import useAuth from "../global/useAuth";
import cookie from "js-cookie";

const RightMenu = () => {
  let navigate = useNavigate();
  const { setAuth } = useAuth();

  const onClick = () => {
    navigate("/profile");
    cookie.remove("token");
    cookie.remove("auth");
    setAuth(false);
    setNotificationData({
      message: "با موفقیت خارج شدید",
      type: "success",
      time: 5000,
    });
  };
  return (
    <Menu>
      <Menu.Item key="mail">
        <Button type="text" onClick={onClick}>
          خروج
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
