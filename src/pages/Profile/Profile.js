import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Layout, Grid } from "antd";
import Header from "../../components/Header";
import AvatarPartDesktop from "../../components/AvatarPartDesktop";
import AvatarPartMobile from "../../components/AvatarPartMobile";
import { profile } from "../../redux/reducer/Profile/profileReducer";
import { useDispatch } from "react-redux";
import useApiCatcher from "../../global/useApiCatcher";
import endpointUrls from "../../api/endpointUrls";
import ApiService, { errorResponse } from "../../api/apiService";
import jsCookie from "js-cookie";
import { setNotificationData } from "../../redux/reducer/Toast/toastReducer";
import "../../css/Profile.css";
import ValuePart from "../../components/ValuePart";
import ChangePassword from "../../components/ChangePassword";
import Footer from "../../components/Footer";
import UpgradePro from "../../components/UpgradePro";
import ProfileContent from "../../components/ProfileContent";

const { useBreakpoint } = Grid;

const Profile = () => {
  const { lg, xl, xxl } = useBreakpoint();
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();
  const token = jsCookie.get("token");

  useEffect(() => {
    ApiService.post(endpointUrls.getUserInfo + `?token=${token}`)
      .then((res) => {
        if (res.ok) {
          dispatch(profile({ data: res }));
        } else {
          dispatch(
            setNotificationData({
              message: "اطلاعات کاربر یافت نشد",
              type: "error",
              time: 5000,
            })
          );
        }
      })
      .catch(() => {
        dispatch(profile({ data: "" }));
        apiCatcher(errorResponse);
      });
  }, []);

  return (
    <Layout className="layout">
      <Header />
      <Layout.Content>
        <Row gutter={[24, 24]} className="row">
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 4 }}>
            {lg || xl || xxl ? (
              <div className="wrapper">
                <AvatarPartDesktop />
                <ValuePart />
                <ChangePassword />
                <UpgradePro />
              </div>
            ) : (
              <div className="wrapper">
                <AvatarPartMobile />
                <ValuePart />
                <ChangePassword />
                <UpgradePro />
              </div>
            )}
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 0 }}>
            <ProfileContent />
          </Col>
        </Row>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default Profile;
