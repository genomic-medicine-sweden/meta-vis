import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './AppLayout.css';

const { Header, Content, Footer } = Layout;

const appMenuItems = () => [
    {
        key: '/',
        label: <Link to="/">Quality Control</Link>,
    },
    {
        key: '/classification-results',
        label: <Link to="/classification-results">Classification Results</Link>,
    },
    {
        key: '/metadata',
        label: <Link to="/metadata">Metadata</Link>,
    }
];

export const AppLayout = () => {
    const menuItems = appMenuItems();
    const location = useLocation();

    return (
        <Layout>
            <Header className="header">
                <div className="logo">
                <Link to="/">
                        <img src="/meta-vis-logo.svg" alt="logo" />
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={menuItems}
                    style={{ flex: 1, minWidth: 0 }}
                    defaultSelectedKeys={[location.pathname]}
                />
            </Header>
            <Content className="content">
                <div>
                    <Outlet /> {/* This is where your routed components will be rendered */}
                </div>
            </Content>
            <Footer className="footer">
                Meta Vis {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
