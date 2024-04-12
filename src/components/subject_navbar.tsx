import {
  Menu,
  MenuProps,
  Space,
  Typography
} from "antd";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Props {
  platform: string;
  name: string;
  type: number;
}

const itemStyle: { style: CSSProperties } = {
  style: {
    height: "30px",
    lineHeight: "20px",
  },
};

const SubjectNavBar: FC<Props> = ({ platform, name, type }) => {
  const loc = useLocation();
  const { id } = useParams();
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loc.pathname.endsWith("ep")) 
      setCurrent("ep");
    else if (loc.pathname.endsWith("characters")) 
      setCurrent("characters");
    else setCurrent("overview");
  }, [loc])

  let menuItems: MenuProps["items"] = [
    {
      label: "概览",
      key: "overview",
      onClick: () => navigate(`/subject/${id}`)
    },
    {
      label: type === 3 ? "曲目" : "章节",
      key: "ep",
      onClick: () => navigate(`/subject/${id}/ep`)
    },
    {
      label: "角色",
      key: "characters",
      onClick: () => navigate(`/subject/${id}/characters`)
    },
    {
      label: "制作人员",
      key: "producers",
    },
    {
      label: "吐槽",
      key: "complains", // ?
    },
    {
      label: "评论",
      key: "comments",
    },
    {
      label: "讨论版",
      key: "chatboard",
    },
    {
      label: "透视",
      key: "userperspective",
    },
  ].map((item) => ({ ...item, ...itemStyle }));
  if (type === 1) menuItems = menuItems.filter((item) => item?.key !== "ep");
  return (
    <Space.Compact direction="vertical">
      <Typography.Title level={3} style={{ margin: "5px" }}>
        {name}
        <Typography.Text style={{ color: "#888", marginLeft: "10px" }}>
          {platform}
        </Typography.Text>
      </Typography.Title>
      <Menu
        items={menuItems}
        mode="horizontal"
        selectedKeys={[current]}
        onClick={(e) => setCurrent(e.key)}
        style={{ margin: "5px" }}
      />
    </Space.Compact>
  );
};

export default SubjectNavBar;
