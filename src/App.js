import React, { Component } from "react";
import "./App.css";
import Routes from "./Routes";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="1">
              {" "}
              <a href="/">
                <span>Services</span>
              </a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/services/new">
                <span>Create New</span>
              </a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Routes />
        </Content>
      </Layout>
    );
  }
}

export default App;
