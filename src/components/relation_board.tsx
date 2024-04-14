import { Flex, Space, Typography } from 'antd';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { UseSubjectRelation } from '../hooks/useSubject';
import { sortData } from '../services/utils';
import { Subject } from '../types';
import ErrorModal from './error_modal';
import CustomImg from './custom_img';
import { ICON_PLACEHOLDER } from '../constant';

const { Text, Title } = Typography;

interface Props {
  subjectId: number;
}

interface ItemProps {
  hasDivider: boolean;
  hasRelation: boolean;
  item: Subject;
}

const cropText = (text: string, maxLen = 15) => {
  if (text.length > maxLen) {
    return text.slice(0, maxLen) + '...';
  }
  return text;
};

const Relation = ({ subjectId }: Props) => {
  const { data, isLoading, error } = UseSubjectRelation(subjectId);
  if (isLoading) return null;
  if (error || !data) return <ErrorModal error={error} />;
  // console.log(data);
  const sortedData = sortData(data, 'relation');
  return (
    <>
      <Title level={3} className='board-title'>
        关联条目
      </Title>
      <Flex wrap='wrap' style={{ padding: 4 }}>
        {Object.keys(sortedData).map((key, i) => {
          return (
            // <Flex wrap='wrap'>
            sortedData[key].map((item, index) => {
              return (
                <Item
                  hasRelation={index === 0}
                  item={item}
                  hasDivider={index === 0 && i !== 0}
                  key={item.id}
                />
              );
            })
          );
        })}
      </Flex>
    </>
  );
};

const Item = ({ hasRelation, item, hasDivider }: ItemProps) => {
  const textStyle: CSSProperties = {
    height: 15,
    fontSize: 11,
    display: 'block',
    marginBottom: 2,
  };
  return (
    <Space.Compact
      direction='vertical'
      style={{
        width: '85px',
        borderLeft: hasDivider ? '1px solid #eee' : undefined,
        padding: 4,
      }}
    >
      {hasRelation ? (
        <Text type='secondary' style={textStyle}>
          {item.relation}
        </Text>
      ) : (
        <Text style={textStyle} />
      )}
      <Link to={`/subject/${item.id}`}>
        <CustomImg
          imgUrl={`${
            item.images.large || ICON_PLACEHOLDER
          }`}
          size={75}
          borderRadius={10}
        />
        <Text className='relation-link'>{cropText(item.name)}</Text>
      </Link>
    </Space.Compact>
  );
};

export default Relation;
