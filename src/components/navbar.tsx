import { Avatar, Button, Flex, Image, Popover, Space } from 'antd';
import '../styles/logo.css';
import { useContext } from 'react';
import UserContext from '../contexts/user';
import { getAvatarUrl } from '../services/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const { Compact } = Space;

const NavBar = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const logoStyle = Math.ceil(Math.random() * 6);
  const { user, dispatch } = useContext(UserContext);
  return (
    <Compact
      style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}
    >
      <Compact>
        <div className={`bg musume_${logoStyle}`} />
        <Image
          src='https://bgm.tv/img/rc3/logo_2x.png'
          preview={false}
          draggable={false}
          height='40px'
          style={{ marginLeft: 10 }}
        />
      </Compact>
      <div style={{ marginTop: '2px' }}>
        {user ? (
          <UserAvatar
            avatarUrl={getAvatarUrl(user.avatar.large)}
            username={user.nickname}
            logout={() => {
              dispatch({ type: 'remove' });
              if (loc.pathname === '/') navigate('/login');
            }}
          />
        ) : (
          <Button type='text' href='/login'>
            Login
          </Button>
        )}
      </div>
    </Compact>
  );
};

interface UserAvatarProps {
  avatarUrl: string;
  username: string;
  logout: () => void;
}
const UserAvatar = ({ avatarUrl, username, logout }: UserAvatarProps) => {
  const navigate = useNavigate();
  const content = (
    <div style={{ padding: 1 }}>
      <div>用户名: {username}</div>
      <Button type='link' onClick={logout} style={{ padding: 0 }}>
        Logout
      </Button>
    </div>
  );
  return (
    <Popover content={content}>
      <Avatar
        src={avatarUrl}
        size={40}
        shape='square'
        onClick={() => navigate('/')}
      />
    </Popover>
  );
};
export default NavBar;
