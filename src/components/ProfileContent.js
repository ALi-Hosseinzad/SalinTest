import React, { useEffect } from "react";
import apiService, { errorResponse } from "../api/apiService";
import endpointUrls from "../api/endpointUrls";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../redux/reducer/Profile/profileReducer";
import useApiCatcher from "../global/useApiCatcher";
import { Col, Row } from "antd";
import "../css/Avatar.css";
import { ExperimentOutlined, ScheduleOutlined } from "@ant-design/icons";
import CardComponent from "./Card";

const list = [
  {
    id: 0,
    icon: ExperimentOutlined,
    title: "آموزش",
    steps: "04",
    color: "#edb009",
  },
  {
    id: 1,
    icon: ScheduleOutlined,
    title: "حرفه‌ای",
    steps: "02",
    color: "#3ab9f0",
  },
];
const ProfileContent = () => {
  const UserData = useSelector((state) => state.profile.value);
  const token = cookie.get("token");
  const dispatch = useDispatch();
  const apiCatcher = useApiCatcher();

  useEffect(() => {
    apiService
      .post(endpointUrls.getProfileContent + `?token=${token}`)
      .then((res) => {
        if (res.ok) {
          dispatch(profile({ profileContent: res }));
        } else {
          dispatch(profile({ profileContent: list }));
        }
      })
      .catch(() => {
        dispatch(profile({ data: "" }));
        apiCatcher(errorResponse);
      });
  }, [UserData.profileContent, token]);

  return (
    <Row gutter={[16, 16]}>
      {UserData.profileContent?.map((item) => (
        <Col
          xs={{ span: 12, offset: 0 }}
          lg={{ span: 8, offset: 1 }}
          key={item.id}
        >
          <CardComponent
            title={item.title}
            color={item.color}
            steps={item.steps}
            icon={<item.icon style={{ color: item.color }} />}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ProfileContent;
