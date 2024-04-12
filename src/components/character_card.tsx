import { Card, Divider, Flex, Tag, Typography } from 'antd';
import Compact from 'antd/es/space/Compact';
import { getAvatarUrl } from '../services/utils';
import { Actor, Character } from '../types';
import CustomImg from './custom_img';

const { Text } = Typography;

interface Props {
  character: Character;
  size: 'small' | 'default';
}

const getCV = (actors: Actor[]) => {
  if (!actors.length) return '';
  if (actors.length === 1) return actors[0].name;
  return actors.map((actor) => actor.name).join(' / ');
};

const CharacterCard = ({ character, size }: Props) => {
  const isSmall = size === 'small';
  let color = 'default';
  switch (character.relation) {
    case '主角':
      color = 'volcano';
      break;
    case '配角':
      color = 'gold';
      break;
  }
  return (
    <Card
      styles={{ body: { padding: 4, overflow: 'hidden' } }}
      style={size === 'small' ? { border: 0 } : {}}
    >
      <Flex style={{ margin: 0, padding: 0 }}>
        <CustomImg
          imgUrl={getAvatarUrl(character.images.large)}
          size={isSmall ? 48 : 77}
          borderRadius={size === 'small' ? 8 : 10}
        />
        <Flex vertical style={{ marginLeft: 8 }}>
          <Text
            style={{ color: '#0084b4', fontSize: isSmall ? '14px' : '18px' }}
          >
            {character.name}
          </Text>
          <Divider style={{ margin: '3px 0' }} />
          <div>
            <Tag color={color} style={{ fontSize: '11px' }}>
              {character.relation}
            </Tag>
            {character.actors.length > 0 &&
              (size === 'small' ? (
                <Text type='secondary'>cv: {getCV(character.actors)}</Text>
              ) : (
                <ActorBadge actors={character.actors} />
              ))}
          </div>
        </Flex>
      </Flex>
    </Card>
  );
};

interface ActorBadgeProps {
  actors: Actor[];
}

const ActorBadge = ({ actors }: ActorBadgeProps) => {
  return (
    <Flex style={{ margin: '8px 0 0 5px' }}>
      {actors.map((actor) => (
        <Compact
          style={{ margin: '0 2px', alignItems: 'start' }}
          key={actor.id}
        >
          <CustomImg
            imgUrl={getAvatarUrl(actor.images.large)}
            size={34}
            borderRadius={5}
          />
          <Text style={{ margin: '0 6px', color: '#555' }}>{actor.name}</Text>
        </Compact>
      ))}
    </Flex>
  );
};

export default CharacterCard;
