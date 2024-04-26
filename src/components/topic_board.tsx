import { Button, List, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSubjectsContext } from '../contexts/subject';
import { Topic } from '../types';
import { CSSProperties } from 'react';

const { Title, Text } = Typography;

const TopicBoard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title level={4} className='board-title'>
        讨论版
      </Title>
      <Topics />
      <div>
        <Button
          className='more'
          type='link'
          onClick={() => navigate(`./board`)}
        >
          {'更多讨论>>'}
        </Button>
      </div>
    </>
  );
};


interface TopicsProps {
  max?: number | 'all';
  style?: CSSProperties;
}

export const Topics = ({ max = 5, style = { padding: '0 10px' } }: TopicsProps) => {
  const data = useSubjectsContext('topic');
  if (!data) return null;
  if (data.length === 0) return null;
  // console.log('data: ', data);
  let num = max === 'all' ? data.length : max;
  return (
    <List
      style={style}
      dataSource={data}
      size='small'
      itemLayout='horizontal'
      renderItem={(item, index) =>
        index < num ? (
          <List.Item className={index % 2 ? 'odd' : 'even'}>
            <TopicItem topic={item} key={item.id} />
          </List.Item>
        ) : null
      }
    />
  );
};

interface Props {
  topic: Topic;
}

const TopicItem = ({ topic }: Props) => {
  const date = new Date(topic.timestamp * 1000);
  return (
    <Space.Compact
      key={topic.id}
      style={{ width: '100%', alignItems: 'center' }}
    >
      <Link to={topic.url} style={{ width: '55%', left: 0, marginRight: '5px' }} target='_blank'>
        <Text className='topic-title text-link'>{topic.title}</Text>
      </Link>
      <Text style={{ width: '20%' }}>{topic.user.nickname}</Text>
      <Text
        style={{ width: '12.5%', fontSize: '11px' }}
        type='secondary'
      >{`${topic.replies} replies`}</Text>
      <Text
        style={{ width: '12.5%', fontSize: '11px' }}
        type='secondary'
      >{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</Text>
    </Space.Compact>
  );
};

export default TopicBoard;