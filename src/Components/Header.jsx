import React from 'react';
import { Layout, Input, Avatar, Badge } from 'antd';
import { UserOutlined, BellOutlined, SearchOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

const { Header } = Layout;

const DashboardHeader = () => {
  // Role de l'utilisateur
  const role = "Administrateur";

  return (
    <Header className="header flex items-center justify-between">
      {/* Logo */}
      <div className="logo flex items-center">
        <FontAwesomeIcon icon={faHeartbeat} className="text-white text-2xl mr-2 " beat />
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

export default DashboardHeader;
