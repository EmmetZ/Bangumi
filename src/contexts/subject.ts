import { createContext, useContext } from 'react';
import { DetailedSubject, Subject } from '../types';

interface SubjectsContext {
  subject: Subject;
  detailedSubject: DetailedSubject;
}

export const SubjectsContext = createContext<SubjectsContext>(
  {} as SubjectsContext
);

type Key = 'subject' | keyof DetailedSubject;

export function useSubjectsContext<K extends Key>(
  key: K
): K extends 'subject' ? Subject : DetailedSubject[Exclude<K, 'subject'>] {
  const { subject, detailedSubject } = useContext(SubjectsContext);

  if (key === 'subject') {
    return subject as any;
  }

  return detailedSubject[key as Exclude<K, 'subject'>] as any;
}