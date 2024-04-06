import { Flex, Space, Typography } from 'antd';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { UseSubjectRelation } from '../hooks/useSubject';
import { Subject } from '../types';

const { Text, Title } = Typography;

interface Props {
  subjectId: number;
}

interface ItemProps {
  hasDivider: boolean;
  hasRelation: boolean;
  item: Subject;
}

interface SortedData {
  [key: string]: Subject[];
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
  if (error || !data) throw Error(error);
  // console.log(data);
  let sortedData: SortedData = {};
  data.forEach((item) => {
    if (!sortedData[item.relation]) {
      sortedData[item.relation] = [];
    }
    sortedData[item.relation].push(item);
  });
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
        <span
          className='relation-cover border-shadow'
          draggable='false'
          style={{
            backgroundImage: `url(${
              item.images.large || 'https://bgm.tv/img/no_icon_subject.png'
            })`,
            display: 'inline-block',
          }}
          // onClick={() => navigate(`/subject/${item.id}`)}
        />
        <Text className='relation-link'>{cropText(item.name)}</Text>
      </Link>
    </Space.Compact>
  );
};

export default Relation;
