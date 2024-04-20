import React,{useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
  
import { Button, Layout, theme } from 'antd';


const Header = () => {
    const [collapsed, setCollapsed] = useState(false);
  const { Header } = Layout;

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
    );
}

export default Header;
