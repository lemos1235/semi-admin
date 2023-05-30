import React, { Suspense } from "react";
import { Layout } from "@douyinfe/semi-ui";
import Header from "@components/layout/header";
import Sider from "@components/layout/sider";
import Footer from "@components/layout/footer";
import { Outlet } from "react-router-dom";
import PageLoading from "@components/page-loading";
import { RequireAuth } from "@src/context/auth";

const { Content } = Layout;

const Index: React.FC = () => {
  return (
    <RequireAuth>
      <Layout className="layout-page">
        <Sider />
        <Layout>
          <Header />
          <Content className="layout-content">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </RequireAuth>
  );
};

export default Index;
