import { Col, Row, Typography } from 'antd';
import Button from 'antd/es/button';
import { useCharacterContext } from '../contexts/character';
import { getSubjectCharacter, useHelper } from '../hooks/get_data';
import CharacterCard from './character_card';
import ErrorModal from './error_modal';
import { useNavigate } from 'react-router-dom';

interface Props {
  subjectId: number;
}

const CharacterBoard = ({ subjectId }: Props) => {
  const { characters: data, setCharacter } = useCharacterContext();
  const {
    states: { error, isLoading },
    dispatches,
  } = useHelper();
  const navigate = useNavigate();
  getSubjectCharacter(!data, subjectId, {
    ...dispatches,
    setData: setCharacter,
  });
  if (isLoading) return null;
  if (error || !data) return <ErrorModal error={error} />;
  if (data.length === 0) return null;
  return (
    <>
      <Typography.Title level={3} className='board-title'>
        角色介绍
      </Typography.Title>
      <Row>
        {data
          .filter((item) => {
            return item.relation !== '客串';
          })
          .map(
            (character, index) =>
              index < 9 && (
                <Col
                  span={8}
                  key={character.id}
                  style={{ margin: 0, padding: 6 }}
                >
                  <CharacterCard character={character} />
                </Col>
              )
          )}
      </Row>
      <div>
        <Button
          className='more-character'
          type='link'
          onClick={() => navigate(`/subject/${subjectId}/characters`)}
        >
          {'查看更多>>'}
        </Button>
      </div>
    </>
  );
};

export default CharacterBoard;
