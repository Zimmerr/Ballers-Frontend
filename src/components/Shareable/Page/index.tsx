import React, { ReactNode } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Tooltip, theme } from "antd";
import "./style.scss";
import { listMenu } from "./menus";

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: ReactNode;
}

export const Page: React.FC<Props> = ({ children }) => {
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
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={listMenu.map((obj, index) => ({
            key: String(index),
            icon: React.createElement(obj.icon),
            label: obj.titulo,
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
