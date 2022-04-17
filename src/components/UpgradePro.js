import React, { useEffect } from "react";
import apiService, { errorResponse } from "../api/apiService";
import endpointUrls from "../api/endpointUrls";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../redux/reducer/Profile/profileReducer";
import useApiCatcher from "../global/useApiCatcher";
import { Button } from "antd";
import "../css/Avatar.css";

const UpgradePro = () => {
  const UserData = useSelector((state) => state.profile.value);
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  useEffect(() => {
    apiService
      .post(endpointUrls.getUpgradeToPro + `?token=${token}`)
      .then((res) => {
        if (res.ok) {
          dispatch(profile({ upgradeToPro: res }));
        } else {
          dispatch(profile({ upgradeToPro: 200000 }));
        }
      })
      .catch(() => {
        dispatch(profile({ data: "" }));
        apiCatcher(errorResponse);
      });
  }, [UserData.UpgradePro, token]);

  return (
    <Button type="text" className="upgrade-btn" size={"large"} block>
      ارتقا به حالت ویژه با {UserData.upgradeToPro} تومان
    </Button>
  );
};

export default UpgradePro;
