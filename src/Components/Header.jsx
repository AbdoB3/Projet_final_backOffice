import React, { useContext } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Button, Layout, theme } from 'antd';
import { ToggleContext } from './store/ToggleContext';

const Header = () => {
  const { Header } = Layout;
  const { collapsed, onClickHandler } = useContext(ToggleContext);

  const {
    token: { colorBgContainer },
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
        onClick={onClickHandler}
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
