import {
  Badge,
  Card,
  Divider,
  Flex,
  Layout,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useSubjectsContext } from '../contexts/subject';
import { sortData } from '../services/utils';
import { EpType, Episode } from '../types';
import { SubLayout } from './layout';

const EpTypeMap: Record<EpType, string> = {
  0: '本篇',
  1: '特别篇',
  2: 'OP',
  3: 'ED',
  4: '预告/宣传/广告',
  5: 'MAD',
  6: '其他',
};

const prefixMap: Record<EpType, string> = {
  0: '',
  1: 'SP',
  2: 'OP',
  3: 'ED',
  4: '预告/宣传/广告',
  5: 'MAD',
  6: '其他',
};

const { Content } = Layout;
const { Title, Text } = Typography;

const EpisodePage = () => {
  const eps = useSubjectsContext('eps');
  const sortedEps = sortData(eps, 'type');
  // console.log(sortedEps);

  return (
    <SubLayout style={{ margin: '0 10px'}}>
      {Object.keys(sortedEps).map((key) => {
        return (
          <div key={key}>
            <Title level={5} style={{ margin: '10px 0' }}>
              {EpTypeMap[parseInt(key) as EpType]}
            </Title>
            <Divider style={{ padding: 0, margin: 0 }} />
            <Flex vertical>
              {sortedEps[key].map((ep, index) => (
                <EpListItem key={ep.id} ep={ep} index={index + 1} />
              ))}
            </Flex>
          </div>
        );
      })}
    </SubLayout>
  );
};

interface ItemProps {
  ep: Episode;
  index: number;
}

const EpListItem = ({ ep, index }: ItemProps) => {
  const isAir = ep.status !== "Air";
  return (
    <Card
      style={{
        margin: '10px',
        backgroundColor: index % 2 ? '#fff' : '#f9f9f9',
      }}
      styles={{
        body: {
          padding: '10px 20px',
        },
      }}
    >
      <Title level={5} style={{ margin: 0, color: '#0099cc' }}>
        {prefixMap[ep.type]}
        {`${ep.sort}. ${ep.name}`}
        {ep.name_cn && (
          <Text
            type='secondary'
            style={{ fontSize: 13 }}
          >{` / ${ep.name_cn}`}</Text>
        )}
      </Title>
      <Space size='small' style={{ marginTop: '2px' }}>
        <Tooltip title={isAir ? '未放送' : '已放送'}>
          <Badge status={isAir ? 'default' : 'processing'} />
        </Tooltip>
        <Text type='secondary' style={{ fontSize: '12px' }}>
          {ep.duration && `时长: ${ep.duration} / `}
          {ep.airdate && `首播: ${ep.airdate} / `}
          讨论: +{ep.comment}
        </Text>
      </Space>
    </Card>
  );
};

export default EpisodePage;
