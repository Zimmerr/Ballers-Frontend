import React from "react";
import { App as AntdApp } from "antd";
import Routes from "./routes";
import "./App.css";
import "./styles/customBootstrap.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
      locale={ptBR}
    >
      <QueryClientProvider client={queryClient}>
        <AntdApp>
          <Routes />
        </AntdApp>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
