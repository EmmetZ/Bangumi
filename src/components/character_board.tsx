import { Col, Row, Typography } from 'antd';
import Button from 'antd/es/button';
import { useSubjectCharater } from '../hooks/useSubject';
import CharacterCard from './character_card';
import ErrorModal from './error_modal';

interface Props {
  subjectId: number;
}

const CharacterBoard = ({ subjectId }: Props) => {
  const { data, isLoading, error } = useSubjectCharater(subjectId);
  if (isLoading) return null;
  if (error || !data) return <ErrorModal error={error} />
  // console.log(data);
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
        <Button className='more-character' type='link'>
          {'查看更多>>'}
        </Button>
      </div>
    </>
  );
};

export default CharacterBoard;
