import { Col, Row, Layout } from "antd";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const LoginLayout = ({ children, profile }) => {
  return (
    <Layout className="layout">
      {profile ? <Header /> : <Layout.Header className="App-header" />}
      <Layout.Content>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset: 8 }}>
            {children}
          </Col>
        </Row>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default LoginLayout;
