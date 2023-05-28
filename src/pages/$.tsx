import React, { Suspense } from "react";
import { Layout } from "@douyinfe/semi-ui";
import Header from "@layout/header";
import Sider from "@layout/sider";
import Footer from "@layout/footer";
import { Outlet } from "react-router-dom";
import PageLoading from "@components/page-loading";

const { Content } = Layout;

const Index: React.FC = () => {
  return (
    <Layout className="layout-page">
      <Sider />
      <Layout>
        <Header />
        <Content className="layout-content">
          <Suspense fallback={<PageLoading message="正在加载中" />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Index;
