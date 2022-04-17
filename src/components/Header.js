import React, { Component } from "react";
import { Drawer, Button } from "antd";
// import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    current: "mail",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <Link to="/">
            <img alt="logo" src="salin-logo3.png" width="150" />
          </Link>
        </div>
        <div className="menuCon">
          <div className="rightMenu">
            <RightMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="خوش آمدید"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Header;
