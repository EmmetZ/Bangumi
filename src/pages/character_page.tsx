import { Space } from 'antd';
import CharacterCard from '../components/character_card';
import { useSubjectsContext } from '../contexts/subject';
import { sortData } from '../services/utils';

const sortedKeys = ['主角', '配角', '客串'];

const CharacterPage = () => {
  const data = useSubjectsContext('crt');
  if (!data) return null;
  const sortedData = sortData(data, 'role_name');
  // console.log(sortedData);
  return (
    <div style={{ margin: '0 10px'}}>
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
    </div>
  );
};

export default CharacterPage;
