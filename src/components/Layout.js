import React from 'react';
import { PhoneOutlined, LogoutOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom"
const { Content, Footer, Sider } = Layout;


const App = ({ children }) => {
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const sidebarMenu = [
        {
            key: '1',
            icon: React.createElement(PhoneOutlined),
            label: 'My Phonebook',
            onClick: () => {
                navigate("/list-entries");
            }
        },
        {
            key: '2',
            icon: React.createElement(PlusCircleFilled),
            label: 'Add Entry',
            onClick: () => {

                navigate("/create-entry");
            }
        },
        {
            key: '3',
            icon: React.createElement(LogoutOutlined),
            label: 'Logout',
            onClick: () => {
                localStorage.setItem('token', "")
                navigate("/");
            }
        }
    ];

    return (
        <Layout
            style={
                {
                    minHeight: '100vh',
                }
            }>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={(e) => {
                        sidebarMenu[e.key - 1].onClick();
                    }
                    }
                    items={sidebarMenu} />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            height: '100%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Phonebook ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;