import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck,faTools , faCalendar, faHome, faUser, faUserMd, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Layout, Menu } from 'antd';

import { ToggleContext } from './store/ToggleContext';
import { LoginContext } from './store/LoginContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
    const { collapsed } = useContext(ToggleContext);
    const { decodedToken } = useContext(LoginContext);

    const items = [
        {
            key: '/',
            icon: <FontAwesomeIcon icon={faHome} />,
            label: 'Dashboard',
        },
        {
            key: '/patient',
            icon: <FontAwesomeIcon icon={faUser} />,
            label: 'Patients',
            children: [
                {
                    key: '/list-patient',
                    label: 'List Patients',
                    icon: <FontAwesomeIcon icon={faList} />,
                }
            ]
        },
        {
            key: '/doctor',
            icon: <FontAwesomeIcon icon={faUserMd} />,
            label: 'Doctors',
            children: [
                {
                    key: '/list-doctor',
                    label: 'List Doctor',
                    icon: <FontAwesomeIcon icon={faList} />,
                }
            ]
        },
        {
            key: '/calendar',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            label: 'Calendar',
            role: 'Doctor',
        },
        {
            key: '/appointments',
            icon: <FontAwesomeIcon icon={faCalendarCheck} />,
            label: 'Appointments',
        },
        {
            key: '/speciality',
            icon: <FontAwesomeIcon icon={faTools } />,
            label: 'Speciality',
        },
    ];

    const navigate = useNavigate();

    const filteredItems = items.filter(item => {
        if (item.role) {
            return decodedToken.role === item.role;
        }
        return true;
    });

    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    className='mt-5'
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    onClick={({ key }) => {
                        if (key) {
                            navigate(key);
                        }
                    }}
                >
                    {filteredItems.map(item => (
                        item.children ? (
                            <SubMenu key={item.key} icon={item.icon} title={item.label}>
                                {item.children.map(child => (
                                    <Menu.Item key={child.key} icon={child.icon}>{child.label}</Menu.Item>
                                ))}
                            </SubMenu>
                        ) : (
                            <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
                        )
                    ))}
                </Menu>
            </Sider>
        </>
    );
};

export default SideBar;
