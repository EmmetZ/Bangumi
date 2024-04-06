import { Layout } from 'antd';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import SubjectNavBar from '../components/subject_navbar';
import { useSubject } from '../hooks/useSubject';
import { Subject } from '../types';
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;
const SubjectPage = () => {
  const { id } = useParams();
  const { data: subject, isLoading, error } = useSubject(id!);

  if (isLoading) return null;
  if (error || !subject) throw Error(error);
  // console.log(subject);
  return (
    <Layout
      style={{
        // maxWidth: "1024px",
        width: '80%',
        left: '10%',
        margin: '0 auto',
      }}
    >
      <Header style={{ height: '100%' }}>
        <SubjectNavBar
          name={subject.name}
          platform={subject.platform}
          type={subject.type}
        />
      </Header>
      <Content>
        <Outlet context={subject} />
      </Content>
    </Layout>
  );
};

export default SubjectPage;

export const useSubjectContext = () => useOutletContext<Subject>();
