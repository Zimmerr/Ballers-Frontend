import React, { ReactNode } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Tooltip, theme } from "antd";
import "./style.scss";
import { listMenu } from "./menus";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/ballers_logo.png"

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: ReactNode;
  titulo?: string;
}

export const Page: React.FC<Props> = ({ children, titulo }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <Layout className="system-layout">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical">
          <img src={logo} alt="Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={listMenu.map((obj, index) => ({
            key: String(index),
            icon: React.createElement(obj.icon),
            label: <NavLink to={obj.url}>{obj.titulo}</NavLink>,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex className="flex-reverse">
            <Tooltip title="Logout">
              <Button
                type="primary"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={logout}
              />
            </Tooltip>
          </Flex>
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div className="titulo-pagina">{titulo}</div>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ballers ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default Page;
