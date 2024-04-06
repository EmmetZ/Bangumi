import { Col, Divider, Image, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import EpManager from '../components/ep_manager';
import RatingCard from '../components/rating_card';
import TagList from '../components/tag_list';
import { transSummary } from '../services/utils';
import { useSubjectContext } from './subject_page';
import InfoColumn from '../components/info_column';
import CharacterBoard from '../components/character_board';
import Relation from '../components/relation_board';

const OverviewPage = () => {
  const subject = useSubjectContext();
  return (
    <Layout style={{ marginTop: '15px' }}>
      <Content
        style={{
          maxWidth: '1024px',
          minWidth: '640px',
          margin: '0 auto',
        }}
      >
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
                <Paragraph>{transSummary(subject.summary)}</Paragraph>
                {/* <EpManager /> */}
                { subject.tags.length > 0 && <TagList tags={subject.tags} /> }
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
      </Content>
    </Layout>
  );
};

export default OverviewPage;
