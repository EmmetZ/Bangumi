import { Button, List, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useSubjectsContext } from '../contexts/subject';
import { Topic } from '../types';

const { Title, Text } = Typography;

const TopicBoard = () => {
  const data = useSubjectsContext('topic');
  if (!data) return null;
  if (data.length === 0) return null;
  // console.log('data: ', data);
  return (
    <>
      <Title level={4} className='board-title'>
        讨论版
      </Title>
      <List
        style={{ padding: '0 10px' }}
        dataSource={data}
        itemLayout='horizontal'
        renderItem={(item, index) =>
          index < 5 ? (
            <List.Item>
              <TopicItem topic={item} key={item.id} />
            </List.Item>
          ) : null
        }
      />
      <div>
        <Button
          className='more'
          type='link'
          // onClick={() => navigate(`/subject/${subjectId}/board`)}
        >
          {'更多讨论>>'}
        </Button>
      </div>
    </>
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
      <Link to={topic.url} style={{ width: '55%', left: 0 }} target="_blank">
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
