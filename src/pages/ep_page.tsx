import React from 'react';
import { useParams } from 'react-router-dom';
import useEpisodes from '../hooks/useEpisode';
import { Badge, Card, Divider, Layout, Space, Typography } from 'antd';
import { Episode } from '../types';

const { Content } = Layout;
const { Title, Text } = Typography;
const EpisodePage = () => {
  const { id } = useParams();
  console.log(id);
  const { data: eps, isLoading, error } = useEpisodes(parseInt(id!));
  if (isLoading) return null;
  if (error || !eps) throw Error(error);
  console.log(eps);

  return (
    <Layout style={{ marginTop: '15px' }}>
      <Content
        style={{
          maxWidth: '1024px',
          // minWidth: '960px',
          // margin: '0 auto',
        }}
      >
        {eps.map((ep) => (
          <EpListItem key={ep.id} ep={ep} />
        ))}
      </Content>
    </Layout>
  );
};

interface ItemProps {
  ep: Episode;
}

const EpListItem = ({ ep }: ItemProps) => {
  const date = new Date(ep.airdate);
  const now = new Date();
  const isFuture = date > now;
  return (
    <Card
      style={{
        margin: '10px',
        backgroundColor: ep.ep % 2 ? '#fff' : '#f9f9f9',
        left: '10%',
      }}
      styles={{
        body: {
          padding: '10px 20px',
        },
      }}
    >
      <Title level={5} style={{ margin: 0, color: '#0099cc' }}>
        {`${ep.ep}. ${ep.name}`}
        {ep.name_cn && (
          <Text
            type='secondary'
            style={{ fontSize: 13 }}
          >{` / ${ep.name_cn}`}</Text>
        )}
      </Title>
      <Space size='small' style={{ marginTop: '2px' }}>
        <Badge status={isFuture ? 'default' : 'processing'} />
        <Text type='secondary' style={{ fontSize: '12px' }}>
          时长: {ep.duration} / 首播: {ep.airdate} / 讨论: {ep.comment}
        </Text>
      </Space>
    </Card>
  );
};

export default EpisodePage;
