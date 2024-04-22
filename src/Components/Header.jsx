import React, { useContext } from 'react';


import { Layout, Input, Avatar, Badge, Button, theme } from 'antd';
import { ToggleContext } from './store/ToggleContext';


import { UserOutlined, BellOutlined, SearchOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';




const Header = () => {
  const role = "Administrateur";
  const { Header } = Layout;
  const { collapsed, onClickHandler } = useContext(ToggleContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header className="header flex items-center justify-between" style={{ maxHeight: '100%', padding: '0 25px' }}>

      {/* Sidebar Toggle Button */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> : <MenuFoldOutlined style={{ fontSize: '20px' }} />}
        onClick={onClickHandler}
        style={{
          fontSize: '20px',
          marginRight: '30px',
          color: '#fff',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}
      />

      {/* Logo */}
      <div className="logo flex items-center">
        <FontAwesomeIcon icon={faHeartbeat} className="text-white text-2xl mr-2" beat />
        <span className="font-bold text-white text-2xl">ConsultaMed</span>
      </div>



      {/* Search Bar */}
      <div className="flex items-center ml-7 mr-auto">
        <Input placeholder="Rechercher..." prefix={<SearchOutlined />} className="w-48" />
      </div>



      {/* User Info */}
      <div className="flex items-center">
        <Avatar className="bg-blue-950 mr-2" icon={<UserOutlined />} size={40} />
        <div className="text-white text-lg font-semibold mr-4">
          <div>Laila Danguir</div>
          <div className="text-sm">{role}</div>
        </div>
        <Badge count={1}>
          <BellOutlined className="text-white text-2xl mr-2" />
        </Badge>
        <SettingOutlined className="text-white text-2xl ml-6" />
      </div>


    </Header>
  );
}

export default Header;
