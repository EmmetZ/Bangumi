import { Flex, Tag, Typography } from "antd";
import { SubjectTag } from "../types";
import { Link } from "react-router-dom";

const { Text } = Typography;

interface Props {
  tags: SubjectTag[];
}

const TagList = ({ tags }: Props) => {
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <Typography.Title level={4} style={{ margin: "0 0 5px 0" }}>
        Tags
      </Typography.Title>
      <div>
        {tags.map(({ name, count }) => (
          <Tag
            key={name}
            style={{ margin: "2px", borderRadius: "5px" }}
            className="tag"
          >
            {/* <Link to="#"> */}
            <Text
              className="tagname"
              style={{ fontSize: "12px" }}
            >
              {name}
            </Text>
            <Text
              className="tagcount"
              type="secondary"
              style={{ fontSize: "10px" }}
            >
              ({count})
            </Text>
            {/* </Link> */}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default TagList;
