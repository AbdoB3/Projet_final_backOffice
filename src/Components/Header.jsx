import React, { useContext, useState } from 'react';
import { Layout, Input, Avatar, Badge, Button, Modal, List, Form, Input as AntdInput } from 'antd';
import { ToggleContext } from './store/ToggleContext';
import { UserOutlined,LogoutOutlined , BellOutlined, SearchOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faEnvelopeOpen, faEnvelope, faEdit,faClose } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import {Menu, Dropdown} from 'antd';
import { LoginContext } from './store/LoginContext';
import { jwtDecode } from 'jwt-decode';


const Header = () => {
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
const navigate = useNavigate();

  const Logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  const menu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
      <Menu.Item onClick={Logout} key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const role = decodedToken.role;
  const { Header } = Layout;
  const { collapsed, onClickHandler } = useContext(ToggleContext);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 3', read: false },
    { id: 2, message: 'Notification 2', read: true },
    // Add more notifications as needed
  ]);

  const showNotification = () => {
    setNotificationVisible(true);
  };

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const showProfile = () => {
    setProfileVisible(true);
  };

  const hideProfile = () => {
    setProfileVisible(false);
  };

  const toggleMessageReadStatus = (id) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: !notification.read };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  return (
    <Header className="header flex items-center justify-between" style={{ maxHeight: '100%', padding: '0 25px' }}>
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
        }}a
      />
      <div className="logo flex items-center">
        <FontAwesomeIcon icon={faHeartbeat} className="text-white text-2xl mr-2" beat />
        <span className="font-bold text-white text-2xl">ConsultaMed</span>
      </div>
      <div className="flex items-center ml-7 mr-auto">
        <Input placeholder="Rechercher..." prefix={<SearchOutlined />} className="w-48" />
      </div>
      <div className="flex items-center">
        <Avatar className="bg-blue-950 mr-2" icon={<UserOutlined />} size={40} onClick={showProfile} />
        <div className="text-white text-lg font-semibold mr-4 cursor-pointer" onClick={showProfile}>
          <div>{decodedToken.name}</div>
          <div className="text-sm">{role}</div>
        </div>
        <Badge count={notifications.filter(notification => !notification.read).length}>
          <BellOutlined className="text-white text-2xl mr-2" onClick={showNotification} />
        </Badge>
  

        <Dropdown overlay={menu}>
          <SettingOutlined className="text-white text-2xl ml-6" />
        </Dropdown>
      </div>
      <Modal
        title="Notifications"
        visible={notificationVisible}
        onCancel={hideNotification}
        footer={null}
      >
        <List
          dataSource={notifications}
          renderItem={item => (
            <List.Item className={item.read ? "text-gray-500 cursor-pointer" : "font-bold cursor-pointer flex items-center"}>
              <span className="mr-2" onClick={() => toggleMessageReadStatus(item.id)}>{item.message}</span>
              {item.read ? (
                <FontAwesomeIcon icon={faEnvelopeOpen} className="text-green-500 text-lg" />
              ) : (
                <FontAwesomeIcon icon={faEnvelope} className="text-red-600 text-lg" />
              )}
            </List.Item>
          )}
        />
      </Modal>
      <Modal
        title="Profile"
        visible={profileVisible}
        onCancel={hideProfile}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Nom">
            <AntdInput defaultValue={decodedToken.name} />
          </Form.Item>
          <Form.Item label="Rôle">
            <AntdInput defaultValue={role} />
          </Form.Item>
          <Link to="/profile">
          <Button  type="primary" icon={<FontAwesomeIcon icon={faEdit} />} className="mr-2">
            Edit
          </Button>
          </Link>
          <Button onClick={hideProfile} icon={<FontAwesomeIcon icon={faClose} />} >
            Close
          </Button>
        </Form>
      </Modal>
    </Header>
  );
}

export default Header;
