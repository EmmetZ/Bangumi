import { Col, Empty, Pagination, Row, Spin } from "antd";
import { useContext, useState } from "react";
import useCollection from "../hooks/useCollection";
import SubjectCard from "./subject_card";
import CollectionContext from "../contexts/collection";
import UserContext from "../contexts/user";

const colNumMap: Record<PropertyKey, number> = {
  xxl: 6,
  xl: 6,
  lg: 4,
  md: 3,
  sm: 2,
  xs: 2,
};
const rowNum = 6;

const SubjectGrid = ({ bp }: { bp: string }) => {
  const { types } = useContext(CollectionContext);
  const { user } = useContext(UserContext);

  const colNum = colNumMap[bp];
  const pageSize = rowNum * colNum;
  const [limit, setLimit] = useState(pageSize);
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useCollection(user!.id, {
    ...types,
    limit,
    offset,
  });

  if (isLoading) return <Spin style={{ margin: "20px" }} />;
  if (error || !data) throw error;

  const { data: subjects, total } = data;
  if (total === 0)
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="还没有收藏哦 ..."
        style={{
          padding: "100px",
        }}
      />
    );

  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: "24px 10px" }}>
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
          setLimit(pageSize);
          setOffset((page - 1) * pageSize);
          window.scrollTo({ top: 0 });
        }}
        showQuickJumper
        showSizeChanger={false}
        hideOnSinglePage
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      />
    </>
  );
};

export default SubjectGrid;
