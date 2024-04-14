import { Card, Divider, Flex, Tag, Typography } from 'antd';
import Compact from 'antd/es/space/Compact';
import { getAvatarUrl } from '../services/utils';
import { Actor, DSCharacter } from '../types';
import CustomImg from './custom_img';
import '../styles/character_card.css';
import { BsChatFill } from 'react-icons/bs';
import { ICON_PLACEHOLDER, WHITE_ICON } from '../constant';

const { Text } = Typography;

interface Props {
  character: DSCharacter;
  size: 'small' | 'default';
}

interface CardProps {
  character: DSCharacter;
  color: string;
}

const getCV = (actors: Actor[]) => {
  if (!actors.length) return '';
  if (actors.length === 1) return actors[0].name;
  return actors.map((actor) => actor.name).join(' / ');
};

const CharacterCard = ({ character, size }: Props) => {
  let color = 'default';
  switch (character.role_name) {
    case '主角':
      color = 'volcano';
      break;
    case '配角':
      color = 'gold';
      break;
  }
  return (
    <div className='character-card-container'>
      {size === 'small' ? (
        <SCharacterCard character={character} color={color} />
      ) : (
        <LCharacterCard character={character} color={color} />
      )}
    </div>
  );
};

const SCharacterCard = ({ character, color }: CardProps) => {
  // console.log(character);
  const actors = character.actors;
  return (
    <Card styles={{ body: { padding: 4 } }} style={{ border: 0 }}>
      <Text className='comment'>+({character.comment})</Text>
      <Flex style={{ margin: 0, padding: 0 }}>
        <CustomImg
          imgUrl={
            character.images ? getAvatarUrl(character.images.large) : WHITE_ICON
          }
          size={48}
          borderRadius={8}
        />
        <Flex vertical style={{ marginLeft: 8 }}>
          <div style={{ padding: 0, margin: 0 }}>
            <Text className='name default'>{character.name}</Text>
          </div>
          <Divider style={{ margin: '3px 0' }} />
          <div>
            <Tag color={color} className='role-tag'>
              {character.role_name}
            </Tag>
            <Text className='name-cn small'>{character.name_cn}</Text>
          </div>
          {actors && actors.length > 0 && (
            <Text className='actor-name small'>
              <span className='role'>cv: </span>
              {getCV(actors)}
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

const LCharacterCard = ({ character, color }: CardProps) => {
  const actors = character.actors;
  return (
    <Card styles={{ body: { padding: 4 } }} style={{ border: 0 }}>
      <Text className='comment'>
        <BsChatFill size={14} style={{ marginRight: '4px' }} color='#ccc' />
        +({character.comment})
      </Text>
      <Flex style={{ margin: 0, padding: 0 }}>
        <CustomImg
          imgUrl={
            character.images ? getAvatarUrl(character.images.large) : WHITE_ICON
          }
          size={77}
          borderRadius={10}
        />
        <Flex vertical style={{ marginLeft: 8 }}>
          <div style={{ padding: 0, margin: 0 }}>
            <Text className='name large'>{character.name}</Text>
            <Text className='name-cn small'>{` / ${character.name_cn}`}</Text>
          </div>
          <Divider style={{ margin: '3px 0' }} />
          <div>
            <Tag color={color} className='role-tag'>
              {character.role_name}
            </Tag>
            <Text className='small info'>{`性别: ${character.info.gender}`}</Text>
            {character.info.birth && (
              <Text className='small info'>{` / 生日: ${character.info.birth}`}</Text>
            )}
            {!character.info.birth && character.info.年龄 && (
              <Text className='small info'>{` / 年龄: ${character.info.年龄}`}</Text>
            )}
          </div>
          {actors && actors.length > 0 && <ActorBadge actors={actors} />}
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
        <Compact style={{ margin: '0 2px' }} key={actor.id}>
          <CustomImg
            imgUrl={getAvatarUrl(actor.images.large)}
            size={34}
            borderRadius={5}
          />
          <Text className='actor-name-badge'>{actor.name}</Text>
        </Compact>
      ))}
    </Flex>
  );
};

export default CharacterCard;
