import { ConfigProvider, Layout, ThemeConfig } from 'antd';
import { CSSProperties, ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import { useUserContext } from '../contexts/user';
import axios from 'axios';
import { config } from 'process';

const { Header, Footer, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

interface SubLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const DefaultConfigProvider = ({ children }: LayoutProps) => {
  const dTheme: ThemeConfig = {
    components: {
      Layout: {
        bodyBg: 'white',
        headerBg: 'white',
        footerBg: 'white',
        siderBg: 'white',
      },
    },
    // algorithm: theme.darkAlgorithm
  };
  return <ConfigProvider theme={dTheme}>{children}</ConfigProvider>;
};

export const DefaultLayout = () => {
  // const { state: {auth}} = useUserContext();
  
  // if (auth) {
  //   axios.interceptors.request.use((config) => {
  //     config.headers['Authorization'] = `Bearer ${auth.access_token}`;
  //     return config;
  //   });
  // }

  return (
    <DefaultConfigProvider>
      <Layout
        style={{
          minWidth: '540px',
          // backgroundColor: 'white'
          minHeight: '100vh',
        }}
      >
        <Header
          style={{
            // backgroundColor: '#f0f0f0',
            marginBottom: '5px',
          }}
        >
          <NavBar />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <FooterLayout />
      </Layout>
    </DefaultConfigProvider>
  );
};

const FooterLayout = () => {
  return (
    <Footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        minWidth: '100px',
      }}
    >
      <div>
        <div>personal project, developing...</div>
        <div>
          developed by{' '}
          <a href='https://bangumi.github.io/api/' target='_blank'>
            Bangumi API
          </a>
        </div>
        <div>
          reference:{' '}
          <a href='https://bgm.tv' target='_blank'>
            bgm.tv
          </a>{' '}
        </div>
      </div>
    </Footer>
  );
};

export const PrivateLayout = ({ children }: LayoutProps) => {
  const { state: { user } } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return user ? <div>{children}</div> : <div>please login...</div>;
};

export const SubLayout = ({ children, style = {} }: SubLayoutProps) => {
  return (
    <Layout style={style}>
      <Content
        style={{
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
