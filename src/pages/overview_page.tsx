import { Col, Divider, Image, Row } from 'antd';
import CharacterBoard from '../components/character_board';
import EpManager from '../components/ep_manager';
import InfoColumn from '../components/info_column';
import RatingCard from '../components/rating_card';
import Relation from '../components/relation_board';
import Summary from '../components/summary';
import TagList from '../components/tag_list';
import { useSubjectsContext } from '../contexts/subject';
import { SubLayout } from './layout';
import BlogSection from '../components/blogs';
import TopicBoard from '../components/topic_board';
import useLaptop from '../hooks/useLaptop';

const OverviewPage = () => {
  const isLaptop = useLaptop();
  return isLaptop ? _LOverview() : _SOverview();
};

const _LOverview = () => {
  const subject = useSubjectsContext('subject');
  return (
    <SubLayout style={{ margin: '0 10px' }}>
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
              <Summary />
              {subject.type === 2 && (
                <>
                  <EpManager />
                  <Divider style={{ margin: '10px 0' }} />
                </>
              )}
              {subject.tags.length > 0 && <TagList tags={subject.tags} />}
            </Col>
            <Col span={7}>
              <RatingCard rating={subject.rating} />
            </Col>
          </Row>
          <div style={{ padding: '5px 0' }}>
            <CharacterBoard />
            <Divider style={{ margin: '10px 0', padding: 0 }} />
            <Relation subjectId={subject.id} />
            <Divider style={{ margin: '10px 0', padding: 0 }} />
            <BlogSection />
            <Divider style={{ margin: '10px 0', padding: 0 }} />
            <TopicBoard />
          </div>
        </Col>
      </Row>
    </SubLayout>
  );
};

const _SOverview = () => {
  const subject = useSubjectsContext('subject');
  return (
    <SubLayout style={{ margin: '0 10px' }}>
      {subject.images.large && (
        <Image
          className='overview-main-cover'
          src={subject.images.large}
          draggable
          style={{
            width: '50%',
            objectFit: 'cover',
            margin: '0 auto',
            display: 'block',
          }}
          placeholder
        />
      )}

      <InfoColumn info={subject.infobox} />
      <Summary />
      {subject.type === 2 && (
        <>
          <EpManager />
          <Divider style={{ margin: '10px 0' }} />
        </>
      )}
      {subject.tags.length > 0 && <TagList tags={subject.tags} />}
      <RatingCard rating={subject.rating} />
      <div style={{ padding: '5px 0' }}>
        <CharacterBoard />
        <Divider style={{ margin: '10px 0', padding: 0 }} />
        <Relation subjectId={subject.id} />
        <Divider style={{ margin: '10px 0', padding: 0 }} />
        <BlogSection />
        <Divider style={{ margin: '10px 0', padding: 0 }} />
        <TopicBoard />
      </div>
    </SubLayout>
  );
};

export default OverviewPage;
