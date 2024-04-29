import React from "react";
import SideBar from "./Components/SideBar";
import { Routes, Route } from "react-router-dom";
import { Layout, theme } from "antd";
import Header from "./Components/Header";
import ListPation from "./Components/Pages/Patient/ListPation";
import ListDoctor from "./Components/Pages/Doctor/ListDoctor";
import SignIn from  "./Components/Pages/Auth/SignIn"
import Dashboard from "./Components/Pages/Home";

const MainLayout = ({ children }) => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header />
      <Layout>
        <div className="flex min-h-screen">
          <SideBar />
        </div>
        <Content
          className="m-6 p-6"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

function App() {


  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard/>
          </MainLayout>
        }
      />
      <Route path="/login" element={<SignIn/>} />
      <Route
        path="/list-patient"
        element={
          <MainLayout>
            <ListPation />
          </MainLayout>
        }
      />
      <Route
        path="/list-doctor"
        element={
          <MainLayout>
            <ListDoctor />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;