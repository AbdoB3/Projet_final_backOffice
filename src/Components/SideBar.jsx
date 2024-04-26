import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarCheck,faCalendar, faHome, faUser, faUserMd,faList,faPlus } from '@fortawesome/free-solid-svg-icons';
import { Layout, Menu } from 'antd';

import { ToggleContext } from './store/ToggleContext';


const { Sider } = Layout;
const SideBar = () => {
  const { collapsed } = useContext(ToggleContext);

  const items = [

    {
        key: '/home',
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
                key: '/add-doctor',
                label: 'Add Doctor',
                icon: <FontAwesomeIcon icon={faPlus} />,
            },
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
    },
    {
        key: '/appointments',
        icon: <FontAwesomeIcon icon={faCalendarCheck} />,
        label: 'Appointments',
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