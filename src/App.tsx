import React from "react";
import Routes from "./routes";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
