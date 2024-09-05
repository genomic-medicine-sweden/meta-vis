import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const appMenuItems = () => [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'about',
      label: <Link to="/about">About</Link>,
    }
  ];

export const AppLayout = () => {
    const menuItems = appMenuItems();
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="logo">
                    <img src="/meta-vis-logo.svg" alt="logo" style={{ height: '40px' }} />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={menuItems}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div className='content'>
                    <Outlet /> {/* This is where your routed components will be rendered */}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Meta Vis {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
