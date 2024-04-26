import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ErrorModal from '../components/error_modal';
import SubjectNavBar from '../components/subject_navbar';
import { SubjectsContext } from '../contexts/subject';
import { useSubjects } from '../hooks/useSubject';
import { SubLayout } from './layout';

const { Header, Content } = Layout;

const SubjectPage = () => {
  const { id } = useParams();
  const { subject, detailedSubject, isLoading, error } = useSubjects(id!);
  useEffect(() => window.scrollTo({ top: 0 }));

  if (isLoading) return null;
  if (error || !subject || !detailedSubject)
    return <ErrorModal error={error} />;
  // console.log(subject);
  return (
    <SubLayout>
      <Header
        style={{
          height: '100%',
          padding: '0 5px',
          maxWidth: '960px',
          minWidth: '75%',
          margin: '0 auto',
        }}
      >
        <SubjectNavBar
          name={subject.name}
          platform={subject.platform}
          type={subject.type}
        />
      </Header>
      <Content style={{ marginTop: '5px'}}>
        <SubjectsContext.Provider value={{ subject, detailedSubject }}>
          <Outlet />
        </SubjectsContext.Provider>
      </Content>
    </SubLayout>
  );
};

export default SubjectPage;
