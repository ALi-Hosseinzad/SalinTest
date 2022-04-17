import { Avatar, Button, message, Typography, Upload } from "antd";
import { UserOutlined, CameraOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../css/Avatar.css";

const AvatarPartDesktop = () => {
  const UserData = useSelector((state) => state.profile.value);
  const { Title } = Typography;

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className="avatar-wrapper">
      <div className="container">
        <Avatar
          className="avatar"
          shape="square"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={
            UserData.data?.icon ? (
              <img src={UserData.data?.icon} alt="avatar" />
            ) : (
              <UserOutlined />
            )
          }
        />
        <Upload {...props}>
          <Button
            type="primary"
            shape="circle"
            icon={UserData.data?.icon ? <EditOutlined /> : <CameraOutlined />}
            size="large"
            className="btn"
          />
        </Upload>
      </div>
      <div className="container">
        <div className="text-part">
          <Title level={5}>
            {UserData.data?.firstname} {UserData.data?.lastname}
          </Title>
          <p>{UserData.data?.phone}</p>
        </div>
      </div>
    </div>
  );
};
export default AvatarPartDesktop;
