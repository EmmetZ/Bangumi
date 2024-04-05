import { ConfigProvider, Layout, ThemeConfig } from 'antd';
import { ReactNode, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import UserContext from '../contexts/user';

const { Header, Footer, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
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
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);
  return user ? <div>{children}</div> : <div>please login...</div>;
};
