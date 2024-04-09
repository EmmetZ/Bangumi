import {
  Button,
  Card,
  Divider,
  Popover,
  Space,
  Typography,
  message,
} from 'antd';
import { BsChatFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEpisodeContext } from '../contexts/episode';
import { getSubjectEp, useHelper } from '../hooks/get_data';
import { sortData } from '../services/utils';
import '../styles/ep_manager.css';
import { Episode } from '../types';
import ErrorModal from './error_modal';

const { Compact } = Space;
const { Title, Text } = Typography;

interface Props {
  subjectId: number;
}

const EpManager = ({ subjectId }: Props) => {
  const { episodes: data, setEpisode } = useEpisodeContext();
  const {
    states: { error, isLoading },
    dispatches,
  } = useHelper();
  const navigate = useNavigate();
  getSubjectEp(!data, subjectId, {
    ...dispatches,
    setData: setEpisode,
  });
  if (isLoading) return null;
  if (error || !data) return <ErrorModal error={error} />;
  const sortedEp = sortData(data, 'type', [0, 1]);
  // console.log(sortedEp);
  return (
    <>
      <Title level={4} style={{ margin: '10px 0 5px 0', padding: 0 }}>
        进度管理
      </Title>
      <div className='ep-manager-container'>
        {Object.keys(sortedEp).map((key) =>
          sortedEp[key].map((ep) => {
            return (
              <Popover
                content={<PopoverContent ep={ep} />}
                overlayInnerStyle={{
                  padding: '0px',
                }}
                placement='topLeft'
              >
                <Card
                  className='ep-item-card'
                  styles={{
                    body: {
                      padding: '2px',
                      display: 'block',
                      lineHeight: '100%',
                    },
                  }}
                >
                  <span style={{ fontSize: 12, userSelect: 'none' }}>
                    {ep.sort < 10 ? `0${ep.sort}` : ep.sort}
                  </span>
                </Card>
              </Popover>
            );
          })
        )}
      </div>
    </>
  );
};

interface PopoverContentProps {
  ep: Episode;
}

const PopoverContent = ({ ep }: PopoverContentProps) => {
  return (
    <Compact
      direction='vertical'
      style={{ overflow: 'hidden', borderRadius: '5px' }}
    >
      <Title className='ep-popover-title' level={5}>
        ep.{ep.sort} {ep.name}
      </Title>
      <Compact className='ep-popover-button-container'>
        <PopoverButton text='看过' />
        <PopoverButton text='看到' />
        <PopoverButton text='想看' />
        <PopoverButton text='抛弃' />
      </Compact>
      <Compact direction='vertical' style={{ padding: '5px 10px 10px 10px' }}>
        {ep.name_cn && (
          <Text className='ep-popover-text'>{`中文标题: ${ep.name_cn}`}</Text>
        )}
        {ep.airdate && (
          <Text className='ep-popover-text'>{`首播: ${ep.airdate}`}</Text>
        )}
        {ep.duration && (
          <Text className='ep-popover-text'>{`时长: ${ep.duration}`}</Text>
        )}
        <Divider style={{ padding: 0, margin: '5px' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BsChatFill size={14} style={{ marginRight: '4px' }} color='#ccc' />
          <Text className='ep-popover-text'>讨论: +{ep.comment}</Text>
        </div>
      </Compact>
    </Compact>
  );
};

const PopoverButton = ({ text }: { text: string }) => {
  return (
    <Button
      type='text'
      className='ep-popover-button ep-popover-text'
      onClick={() => message.info('实验性按钮，点了也没用~')}
    >
      {text}
    </Button>
  );
};

export default EpManager;
