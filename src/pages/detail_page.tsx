import { Card, Col, Flex, Row, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useSubjectsContext } from '../contexts/subject';
import { getSubjectAvatar } from '../services/utils';
import { SubLayout } from './layout';

const DetailPage = () => {
  const { images, name, id } = useSubjectsContext('subject');
  return (
    <SubLayout style={{ margin: '0 10px' }}>
      <Row gutter={[0, 16]}>
        <Col span={18}>
          <Outlet />
        </Col>
        <Col span={6}>
          <Card // todo 小屏幕下隐藏
            styles={{ body: { padding: '10px' } }}
            style={{ boxShadow: '0 0px 5px #eaeaea', marginTop: '10px' }}
          >
            <Flex>
              <img
                src={getSubjectAvatar(images.medium)}
                alt={name}
                style={{ width: '50px', borderRadius: '8px', height: '50px' }}
              />
              <Flex vertical style={{ marginLeft: '8px' }}>
                <Typography.Text style={{ fontSize: 12 }}>
                  {name}
                </Typography.Text>
                <Link to={`/subject/${id}`}>
                  <Typography.Text
                    style={{ fontSize: 12, color: '#0084B4' }}
                    className='text-link'
                  >
                    返回条目页面
                  </Typography.Text>
                </Link>
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
    </SubLayout>
  );
};

export default DetailPage;
