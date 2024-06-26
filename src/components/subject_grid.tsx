import { Col, Empty, Grid, Pagination, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useCollectionContext } from '../contexts/collection';
import { useUserContext } from '../contexts/user';
import useCollection from '../hooks/useCollection';
import ErrorModal from './error_modal';
import SubjectCard from './subject_card';

const { useBreakpoint } = Grid

const colNumMap: Record<PropertyKey, number> = {
  xxl: 6,
  xl: 6,
  lg: 4,
  md: 3,
  sm: 2,
  xs: 2,
};
const rowNum = 6;

const SubjectGrid = () => {
  const { types } = useCollectionContext();
  const { user } = useUserContext();

  const screens = useBreakpoint();
  const bp = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .pop();

  const colNum = colNumMap[bp?.[0] || 'lg'];
  const [pageSize, setPageSize] = useState(rowNum * colNum);
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useCollection(user!.id, {
    ...types,
    limit: pageSize,
    offset,
  });

  useEffect(() => {
    if (colNum * rowNum !== pageSize) 
      setPageSize(colNum * rowNum)
  }, [pageSize, bp])

  if (isLoading) return <Spin style={{ margin: '20px' }} />;
  if (error || !data)
    return (
      <ErrorModal error={error?.message || 'fetch collection data failed'} />
    );

  const { data: subjects, total } = data;
  if (total === 0)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description='还没有收藏哦 ...'
        style={{
          padding: '100px',
        }}
      />
    );

  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: '24px 10px' }}>
        {subjects.map(({ subject: { id, images, name, name_cn, date } }) => (
          <Col key={id} span={24 / colNum}>
            <SubjectCard
              id={id}
              imgUrl={images.common}
              name={name_cn ? name_cn : name}
              date={date}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        total={total}
        defaultPageSize={pageSize}
        defaultCurrent={1}
        current={offset / pageSize + 1}
        onChange={(page) => {
          setOffset((page - 1) * pageSize);
          window.scrollTo({ top: 0 });
        }}
        showQuickJumper
        showSizeChanger={false}
        hideOnSinglePage
        style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      />
    </>
  );
};

export default SubjectGrid;
