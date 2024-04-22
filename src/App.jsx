import React from 'react';
import SideBar from './Components/SideBar';
import { Routes, Route } from 'react-router-dom'
import { Layout, theme } from 'antd';
import Patient from './Components/Pages/Patient';
import Doctor from './Components/Pages/Doctor';
import Header from './Components/Header';

function App() {
  const { Content } = Layout;
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='h-screen'>
      <Header />
     <Layout >
        <div className="flex h-full">
          <SideBar />
        </div>
        <Content className="m-6 p-6 min-h-280 "
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path='/' element={<div>Home</div>} />
            <Route path='/patient' element={<Patient />} />
            <Route path='/doctor' element={<Doctor />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>

  );
}

export default App
