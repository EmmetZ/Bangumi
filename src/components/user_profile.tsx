import { Avatar, Flex, Skeleton, Typography } from 'antd';
import { useUserContext } from '../contexts/user';

const UserProfile = () => {
  const { state: { user } } = useUserContext();
  // const { data: user, isLoading } = useUser(id);
  if (!user)
    return (
      <Flex style={{ margin: '10px' }}>
        <Skeleton.Image active />
        <Skeleton
          title
          style={{
            maxWidth: '150px',
            margin: '5px',
            objectFit: 'cover',
            padding: 0,
          }}
          paragraph={{ rows: 1 }}
        />
      </Flex>
    );
  // if (!user) return null;
  return (
    <Flex style={{ margin: '10px' }}>
      <Avatar
        src={user.avatar.large}
        size={100}
        shape='square'
        style={{ borderRadius: '10px' }}
      />
      <Flex style={{ margin: '2px 5px', padding: 0 }} vertical align='start'>
        <Typography.Title
          level={2}
          style={{ margin: '5px', boxSizing: 'border-box' }}
        >
          {user.nickname}
          <Typography.Text style={{ marginLeft: '10px', color: '#888' }}>
            @{user.id}
          </Typography.Text>
        </Typography.Title>
        <Typography.Text
          style={{
            marginLeft: '10px',
            marginBottom: 0,
            color: '#888',
            maxWidth: '300px',
            whiteSpace: 'wrap',
          }}
        >
          {user.sign}
        </Typography.Text>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
