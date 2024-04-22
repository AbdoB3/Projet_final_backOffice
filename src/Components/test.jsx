 import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, Link,Routes, Route } from 'react-router-dom';
const { Header, Content } = Layout;

const navigation = 
[
    { label: "Home", key: "/" },
    { label: "Holiday Calendar", key: "/holidaycalendar" },
    { label: "Event", key: "/event" },
];

const TopNav = () => {

    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        if (key) {
            navigate(key);
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/holidaycalendar']}
                    items={navigation}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                    onClick={handleMenuClick}
                />

            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >

                    
                    <Contents/>
                </div>
            </Content>
        </Layout>
    );
};

function Contents() {

    return (
        <>
        <Routes>
            <Route path='/' element={<div>Home</div>}/>
            <Route path='/holidaycalendar' element={<div>Holiday Calendar</div>}/>
            <Route path='/event' element={<div>Event</div>}/>
        </Routes>
        </>
    )
}

export default TopNav;

