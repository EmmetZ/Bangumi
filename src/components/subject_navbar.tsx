import {
  ConfigProvider,
  GetProp,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React, { CSSProperties, FC, useState } from "react";

interface Props {
  platform: string;
  name: string;
}

const itemStyle: { style: CSSProperties } = {
  style: {
    height: "30px",
    lineHeight: "20px",
  },
};

const menuItems: MenuProps["items"] = [
  {
    label: "概览",
    key: "overview",
  },
  {
    label: "章节",
    key: "eps",
  },
  {
    label: "角色",
    key: "characters",
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

const SubjectNavBar: FC<Props> = ({ platform, name }) => {
  const [current, setCurrent] = useState("overview");
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
