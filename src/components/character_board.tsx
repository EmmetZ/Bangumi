import { Col, Row, Typography } from 'antd';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';
import { DSCharacter } from '../types';
import CharacterCard from './character_card';
import { useSubjectsContext } from '../contexts/subject';

const CharacterBoard = () => {
  const { get } = useSubjectsContext();
  const data = get('crt');
  const subjectId = get('id');
  const navigate = useNavigate();
  console.log(data);
  if (!data) return null;
  if (data.length === 0) return null;
  return (
    <>
      <Typography.Title level={3} className='board-title'>
        角色介绍
      </Typography.Title>
      <Row>
        {data
          .filter((item) => {
            return item.role_name !== '客串';
          })
          .map(
            (character, index) =>
              index < 9 && (
                <Col
                  span={8}
                  key={character.id}
                  style={{ margin: 0, padding: '2px 6px' }}
                >
                  <CharacterCard character={character} size='small' />
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
