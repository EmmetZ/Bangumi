import { Layout } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ErrorModal from '../components/error_modal';
import SubjectNavBar from '../components/subject_navbar';
import SubjectContext from '../contexts/subject';
import { useSubject } from '../hooks/useSubject';
import { Character, Episode, Subject } from '../types';
import EpisodeContext, { TEpisodeContext } from '../contexts/episode';
import CharacterContext, { TCharacterContext } from '../contexts/character';
import { SubLayout } from './layout';

const { Header, Content } = Layout;

interface ContextProviderProps {
  value: { subject: Subject } & TCharacterContext & TEpisodeContext;
  children: ReactNode;
}

const ContextProvider = ({ value, children }: ContextProviderProps) => {
  const { subject, characters, episodes, setCharacter, setEpisode } = value;
  return (
    <SubjectContext.Provider value={subject}>
      <CharacterContext.Provider value={{ characters, setCharacter }}>
        <EpisodeContext.Provider value={{ episodes, setEpisode }}>
          {children}
        </EpisodeContext.Provider>
      </CharacterContext.Provider>
    </SubjectContext.Provider>
  );
};

const SubjectPage = () => {
  const { id } = useParams();
  const { data: subject, isLoading, error } = useSubject(id!);
  const [characters, setCharacter] = useState<Character[] | undefined>(
    undefined
  );
  const [episodes, setEpisode] = useState<Episode[] | undefined>(undefined);
  useEffect(() => window.scrollTo({ top: 0 }));

  if (isLoading) return null;
  if (error || !subject) return <ErrorModal error={error} />;
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
        <ContextProvider
          value={{ subject, characters, episodes, setCharacter, setEpisode }}
        >
          <Outlet />
        </ContextProvider>
      </Content>
    </SubLayout>
  );
};

export default SubjectPage;
