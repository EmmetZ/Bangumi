import { createContext, useContext } from 'react';
import { DetailedSubject, Subject } from '../types';

// interface DSAction {
//   type: string;
//   value?: any;
// }

interface SubjectsContext {
  subject: Subject;
  detailedSubject: DetailedSubject;
  get: <K extends keyof DetailedSubject>(key: K) => DetailedSubject[K];
}

export const SubjectsContext = createContext<SubjectsContext>({} as SubjectsContext);

export const useSubjectsContext = () => {
  return useContext(SubjectsContext);
};
