import { Avatar, Button, Divider, Flex, Space, Typography } from 'antd';
import { useSubjectsContext } from '../contexts/subject';
import { Blog } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Blogs = () => {
  const data = useSubjectsContext('blog');
  const subjectId = useSubjectsContext('id');
  const navigate = useNavigate();
  // console.log('data: ', data)
  if (!data) return null;
  if (data.length === 0) return null;
  return (
    <>
      <Title level={4} className='board-title'>
        评论
      </Title>
      <Flex vertical style={{ padding: '0 10px' }}>
        {data.map((item, index) =>
          index < 5 ? <BlogItem blog={item} key={item.id} /> : null
        )}
      </Flex>
      <div>
        <Button
          className='more'
          type='link'
          // onClick={() => navigate(`/subject/${subjectId}/reviews`)}
        >
          {'更多评论>>'}
        </Button>
      </div>
    </>
  );
};

interface ItemProps {
  blog: Blog;
}

const BlogItem = ({ blog }: ItemProps) => {
  return (
    <>
      <Space style={{ alignItems: 'start' }}>
        <Avatar
          src={blog.user.avatar.large}
          size={75}
          shape='square'
          className='blog-avatar'
        />
        <BlogInfo blog={blog} />
      </Space>
      <Divider style={{ margin: '12px 0' }} />
    </>
  );
};

const BlogInfo = ({ blog }: ItemProps) => {
  return (
    <Space.Compact direction='vertical'>
      <Link to={'#'}>
        <Title level={5} className='blog-title text-link'>
          {blog.title}
        </Title>
      </Link>
      <Text type='secondary' style={{ fontSize: '12px' }}>
        by
        <Link to={'#'}>
          <Text
            style={{ color: '#0084B4', fontSize: 'inherit' }}
            className='text-link'
          >{` ${blog.user.nickname} `}</Text>
        </Link>
        <Text type='secondary' style={{ fontSize: '10px ' }}>
          {blog.dateline}
          <Text
            style={{ color: '#f90', fontSize: 'inherit' }}
          >{` +(${blog.replies})`}</Text>
        </Text>
      </Text>
      <Text>{blog.summary}</Text>
    </Space.Compact>
  );
};
export default Blogs;
