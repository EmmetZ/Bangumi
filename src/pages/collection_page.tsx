import { Divider, FloatButton, Grid, Layout } from "antd";
import React, { useReducer, useState } from "react";
import CollectionBar from "../components/collection_bar";
import SubjectBar from "../components/subject_bar";
import SubjectGrid from "../components/subject_grid";
import UserProfile from "../components/user_profile";
import CollectionContext, { collectionReducer } from "../contexts/collection";
import { PrivateLayout } from "./layout";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const CollectionPage: React.FC = () => {
  const [types, dispatch] = useReducer(collectionReducer, {
    subject_type: 2,
    type: 3,
  });
  const [collapsed, setCollapsed] = useState(true);
  const onCollapsed = () => setCollapsed(!collapsed);
  const screens = useBreakpoint();
  const bp = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .pop();

  if (!bp) return null;
  // 响应式设计，小屏减小margin
  return (
    <PrivateLayout>
      <Layout>
        <Header style={{ height: "100%" }}>
          <UserProfile />
          <Divider />
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Layout style={{ padding: 0 }} >
            <CollectionContext.Provider value={{ types, dispatch }}>
              <SubjectBar collapsed={collapsed} onCollapsed={onCollapsed} />
              <Content style={{ margin: "0 24px", minHeight: "640px" }}>
                <CollectionBar bp={bp[0]} onCollapsed={onCollapsed} />
                <SubjectGrid bp={bp[0]} />
              </Content>
            </CollectionContext.Provider>
          </Layout>
          <FloatButton.BackTop />
        </Content>
      </Layout>
    </PrivateLayout>
  );
};

export default CollectionPage;
