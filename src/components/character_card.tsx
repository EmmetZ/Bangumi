import { Avatar, Card, Divider, Flex, Tag, Typography } from 'antd';
import { Actor, Character } from '../types';
import { getAvatarUrl } from '../services/utils';

const { Text } = Typography;
interface Props {
  character: Character;
}

const getCV = (actors: Actor[]) => {
  if (!actors.length) return '';
  if (actors.length === 1) return actors[0].name;
  return actors.map((actor) => actor.name).join(' / ');
};

const CharacterCard = ({ character }: Props) => {
  const color = character.relation === '主角' ? 'volcano' : 'gold';
  return (
    <Card
      styles={{ body: { padding: 4, overflow: 'hidden' } }}
      style={{ border: 0 }}
    >
      <Flex style={{ margin: 0, padding: 0 }}>
        <span
          className='character-avatar border-shadow'
          draggable='false'
          style={{
            backgroundImage: `url(${getAvatarUrl(character.images.large)})`,
          }}
        />
        <Flex vertical style={{ marginLeft: 8 }}>
          <Text style={{ color: '#0084b4' }}>{character.name}</Text>
          <Divider style={{ margin: '3px 0' }} />
          <div>
            <Tag color={color} style={{ fontSize: '11px' }}>
              {character.relation}
            </Tag>
            {character.actors.length > 0 && (
              <Text type='secondary'>cv: {getCV(character.actors)}</Text>
            )}
          </div>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CharacterCard;
