import { AxiosRequestConfig, CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import ApiClient from '../services/api_client';
import { DetailedSubject, Subject } from '../types';
import { ImgType, Person } from './types';

export const useSubject = (subjectId: string) => {
  // console.log('useSubject', subjectId)
  return _useSubject<Subject>(`/${subjectId}`);
};

export const useSubjects = (subjectId: string) => {
  const {
    data: subject,
    isLoading: il1,
    error: err1,
  } = _useSubject<Subject>(`/${subjectId}`);
  const {
    data: detailedSubject,
    isLoading: il2,
    error: err2,
  } = useDetailedSubject(subjectId);

  const isLoading = il1 || il2;
  const error = err1 || err2;
  return { subject, detailedSubject, isLoading, error };
};

export const useSubjectImage = (subjectId: number, imgType: ImgType) =>
  _useSubject<string>(`/${subjectId}/image`, { params: { type: imgType } });

export const useSubjectRelation = (subjectId: number) =>
  _useSubject<Subject[]>(`/${subjectId}/subjects`);

export const useSubjectPerson = (subjectId: number) =>
  _useSubject<Person[]>(`/${subjectId}/persons`);

const _useSubject = <T>(endpoint: string, config: AxiosRequestConfig = {}) => {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const client = new ApiClient();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    client
      .getSubject<T>(endpoint, { ...config, signal: controller.signal })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint]);
  return { data, isLoading, error };
};

const useDetailedSubject = (
  subjectId: string,
  config: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState<DetailedSubject>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const client = new ApiClient();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    client
      .getDetailedSubject(subjectId, { ...config, signal: controller.signal })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);
  return { data, isLoading, error };
};