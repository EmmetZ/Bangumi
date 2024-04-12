import { useCharacterContext } from '../contexts/character';
import { sortData } from '../services/utils';
import useCharacter from '../hooks/useCharacter';
import useHelper from '../hooks/useHelper';
import ErrorModal from '../components/error_modal';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Space } from 'antd';
import CharacterCard from '../components/character_card';
import { SubLayout } from './layout';

const sortedKeys = ['主角', '配角', '客串'];

const CharacterPage = () => {
  const { id } = useParams();
  const { characters: data, setCharacter } = useCharacterContext();
  const {
    states: { error, isLoading },
    dispatches,
  } = useHelper();
  // const navigate = useNavigate();
  useCharacter(!data, parseInt(id!), {
    ...dispatches,
    setData: setCharacter,
  });
  if (isLoading) return null;
  if (error || !data) return <ErrorModal error={error} />;
  const sortedData = sortData(data, 'relation');
  // console.log(sortedData);
  return (
    <SubLayout style={{ margin: '0 10px'}}>
      <Space direction='vertical' style={{ width: '100%' }}>
        {sortedKeys.map((key) => {
          if (!sortedData[key]) return null;
          return sortedData[key].map((character) => {
            return (
              <CharacterCard
                key={character.id}
                character={character}
                size='default'
              />
            );
          });
        })}
      </Space>
    </SubLayout>
  );
};

export default CharacterPage;
