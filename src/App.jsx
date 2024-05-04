import React from 'react';
import SideBar from './Components/SideBar';
import { Routes, Route } from 'react-router-dom'
import { Layout, theme } from 'antd';
import Header from './Components/Header';
import ListPation from './Components/Pages/Patient/ListPation';
import ListDoctor from './Components/Pages/Doctor/ListDoctor';
import Dashboard from './Components/Pages/Home';
import Calendar from './Components/Pages/Calendar';
import Appoint from './Components/Pages/Appoint';
import Profile from './Components/Pages/Profile';




function App() {
  const { Content } = Layout;
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout >
      <Header />
     <Layout >
        <div className="flex min-h-screen">
          <SideBar />
        </div>
        <Content className="m-6 p-6"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>

            <Route path='/' element={<Dashboard/>} />
            <Route path='/calendar' element={<Calendar/>} />
            <Route path='/appointments' element={<Appoint/>} />
            <Route path='/list-patient' element={<ListPation />} />
            <Route path='/list-doctor' element={<ListDoctor />} />
            <Route path="/profile" element={<Profile/>} />

          </Routes>
        </Content>
      </Layout>
    </Layout>

  );
}

export default App
