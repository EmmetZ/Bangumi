import { Col, Row, Typography } from 'antd';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';
import { useSubjectsContext } from '../contexts/subject';
import useLaptop from '../hooks/useLaptop';
import CharacterCard from './character_card';

const CharacterBoard = () => {
  const data = useSubjectsContext('crt');
  const navigate = useNavigate();
  const isLaptop = useLaptop();
  // console.log(data);
  const num = isLaptop ? 9 : 8;
  const span = isLaptop ? 8 : 12;
  if (!data) return null;
  if (data.length === 0) return null;
  return (
    <>
      <Typography.Title level={4} className='board-title'>
        角色介绍
      </Typography.Title>
      <Row>
        {data
          .filter((item) => {
            return item.role_name !== '客串';
          })
          .map(
            (character, index) =>
              index < num && (
                <Col
                  span={span}
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
          className='more'
          type='link'
          onClick={() => navigate(`./characters`)}
        >
          {'查看更多>>'}
        </Button>
      </div>
    </>
  );
};

export default CharacterBoard;
