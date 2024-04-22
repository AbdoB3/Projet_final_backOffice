import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    UserSwitchOutlined,
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { ToggleContext } from './store/ToggleContext';


const { Sider } = Layout;
const SideBar = () => {
  const { collapsed } = useContext(ToggleContext);

    const items =
        [
            {
                key: '/',
                icon: <HomeOutlined />,
                label: 'nav 1',
            },

            {
                key: '/patient',
                icon: <UserOutlined />,
                label: 'nav 2',
            },

            {
                key: '/doctor',
                icon: <UserSwitchOutlined />,
                label: 'nav 3',
            },
        ];
    const navigate = useNavigate();

    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    items={items}
                    onClick={
                        ({ key }) => {
                            if (key) {
                                navigate(key);
                            }
                        }
                    }
                />
            </Sider>
        </>
    );
};

export default SideBar;