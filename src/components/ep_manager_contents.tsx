import { Button, Divider, Popover, Space, Typography, message } from 'antd';
import { BsChatFill } from 'react-icons/bs';
import { Episode } from '../types';

const { Compact } = Space;
const { Title, Text } = Typography;

interface ContentProps {
  ep: Episode;
}

interface CardProps {
  text: string;
  status?: 'Air' | 'NA';
  className?: 'card' | 'divider';
}

const EMListItem = ({ ep }: ContentProps) => {
  return (
    <Popover
      content={<PopoverContent ep={ep} />}
      overlayInnerStyle={{
        padding: '0px',
      }}
      placement='topLeft'
    >
      <>
        <EpCard
          text={ep.sort < 10 ? `0${ep.sort}` : `${ep.sort}`}
          status={ep.status}
        />
      </>
    </Popover>
  );
};

export const EMListDivider = ({ text }: { text: string }) => {
  return <EpCard text={text} className='divider' />;
};

const EpCard = ({ text, className = 'card', status }: CardProps) => {
  return (
    <div
      className={
        'ep-item' +
        ' ' +
        className +
        ' ' +
        (status === 'Air' ? 'air' : 'default')
      }
    >
      <span style={{ fontSize: '12px', userSelect: 'none' }}>{text}</span>
    </div>
  );
};

interface ContentProps {
  ep: Episode;
}

export const PopoverContent = ({ ep }: ContentProps) => {
  return (
    <Compact
      direction='vertical'
      style={{ overflow: 'hidden', borderRadius: '5px' }}
    >
      <Title className='ep-popover-title' level={5}>
        {ep.type === 0 ? 'ep' : 'sp'}.{ep.sort} {ep.name}
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

export default EMListItem;
