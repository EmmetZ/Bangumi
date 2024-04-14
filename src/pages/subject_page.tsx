import { Layout } from 'antd';
import { ReactNode, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ErrorModal from '../components/error_modal';
import SubjectNavBar from '../components/subject_navbar';
import { SubjectsContext } from '../contexts/subject';
import { useSubjects } from '../hooks/useSubject';
import { DetailedSubject, Subject } from '../types';
import { SubLayout } from './layout';

const { Header, Content } = Layout;

interface ContextProviderProps {
  children: ReactNode;
  value: { subject: Subject; detailedSubject: DetailedSubject};
}

const SubjectsProvider = ({ children, value }: ContextProviderProps) => {
  const { subject, detailedSubject } = value;
  function get<K extends keyof DetailedSubject>(key: K): DetailedSubject[K] {
    return detailedSubject[key];
  }

  return (
    <SubjectsContext.Provider value={{ subject, detailedSubject, get }}>
      {children}
    </SubjectsContext.Provider>
  );
};

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
      <Content>
        <SubjectsProvider value={{ subject, detailedSubject }}>
          <Outlet />
        </SubjectsProvider>
      </Content>
    </SubLayout>
  );
};

export default SubjectPage;
