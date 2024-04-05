import { Flex, Space, Tag, Typography } from 'antd';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import '../styles/tooltip.css';
import { Rating } from '../types';
import { Grid } from 'antd';
import { gray } from 'd3-color';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ColumnData {
  score: string;
  count: number;
}

interface Props {
  rating: Rating;
}

const RatingCard = ({ rating }: Props) => {
  const xl = useBreakpoint().xl;
  const { rank, total, score, count } = rating;
  let color: 'green' | 'gold' | 'orange';

  if (score >= 7.5) color = 'green';
  else if (score >= 6) color = 'gold';
  else color = 'orange';

  return (
    <Space className='rating-card' direction='vertical' size={0}>
      <Typography.Title
        level={4}
        style={{ margin: 0, height: '35px', color: '#333' }}
      >
        Rating
      </Typography.Title>
      <RatingBar detail={count} total={total} />
      <Flex vertical={!xl}>
        <div style={{ margin: '4px 0' }}>
          <Tag color={color} style={{ fontSize: 22, padding: 5 }}>
            {score.toFixed(1)}
            <Text type='secondary' style={{ marginLeft: 5 }}>
              ({total})
            </Text>
          </Tag>
        </div>
        <div style={{ display: 'flex', alignItems: 'end', margin: '4px 0' }}>
          {rank > 0 && (
            <Tag style={{ fontSize: 14, padding: 3 }} color='#f09199'>
              Rank: {rank}
            </Tag>
          )}
        </div>
      </Flex>
    </Space>
  );
};

interface BarProps {
  total: number;
  detail: { [key: number]: number };
}

const RatingBar = ({ total, detail }: BarProps) => {
  const lg = useBreakpoint().lg;
  let data = [] as ColumnData[];
  for (const key in detail) {
    data.unshift({ score: key, count: detail[key] });
  }
  return (
    <ResponsiveContainer
      width='100%'
      height={150}
      style={{
        backgroundColor: '#fbfbfb',
        margin: '0 auto',
        marginTop: 5,
      }}
    >
      <BarChart data={data}>
        <XAxis dataKey='score' interval={lg ? 0 : 1} padding='gap' />
        <Tooltip content={<CustomTooltip total={total} />} />
        {/* <Tooltip /> */}
        <Bar dataKey='count' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ payload, active, total }: any) => {
  if (active && payload && payload.length) {
    const { value } = payload[0];
    return (
      <div className='custom-tooltip-wrapper'>
        <div className='custom-tooltip' style={{ backgroundColor: 'white' }}>
          <p className='tooltip-label'>{`${((value / total) * 100).toFixed(
            2
          )}% (${value}人)`}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default RatingCard;
