import {  Layout } from 'antd';
import './App.css';
import { AppHeader } from './app/AppHeader';

const {  Content, Footer } = Layout;

const App = () => {
  return (
    
    <Layout>
      <AppHeader />
    <Content style={{ padding: '0 48px' }}>
      <div className='content'>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Meta Vis {new Date().getFullYear()} 
    </Footer>
  </Layout>
  );
};

export default App;