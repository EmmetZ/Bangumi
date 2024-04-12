import { Col, Divider, Image, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import EpManager from '../components/ep_manager';
import RatingCard from '../components/rating_card';
import TagList from '../components/tag_list';
import InfoColumn from '../components/info_column';
import CharacterBoard from '../components/character_board';
import Relation from '../components/relation_board';
import { useSubjectContext } from '../contexts/subject';
import { SubLayout } from './layout';
import Summary from '../components/summary';

const OverviewPage = () => {
  const subject = useSubjectContext();
  return (
    <SubLayout>
      <Row gutter={[16, 0]}>
        <Col span={5}>
          {subject.images.large && (
            <Image
              className='overview-main-cover'
              src={subject.images.large}
              draggable
              style={{ width: '100%', objectFit: 'cover' }}
              placeholder
            />
          )}
          <InfoColumn info={subject.infobox} />
        </Col>
        <Col span={19}>
          <Row gutter={[16, 0]}>
            <Col span={17}>
              <Summary text={subject.summary} />
              {subject.type === 2 && (
                <>
                  <EpManager subjectId={subject.id} />
                  <Divider style={{ margin: '10px 0' }} />
                </>
              )}
              {subject.tags.length > 0 && <TagList tags={subject.tags} />}
            </Col>
            <Col span={7}>
              <RatingCard rating={subject.rating} />
            </Col>
          </Row>
          <div style={{ padding: '5px' }}>
            <CharacterBoard subjectId={subject.id} />
            <Divider style={{ margin: '5px 0', padding: 0 }} />
            <Relation subjectId={subject.id} />
          </div>
        </Col>
      </Row>
    </SubLayout>
  );
};

export default OverviewPage;
