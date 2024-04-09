import { CanceledError } from 'axios';
import { Dispatch, useEffect, useState } from 'react';
import ApiClient from '../services/api_client';
import { Character, Episode } from '../types';

type Dispatches<T> = {
  setData: Dispatch<T>;
  setError: Dispatch<string>;
  setLoading: Dispatch<boolean>;
};

const client = new ApiClient();

export const useHelper = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  return {
    states: { isLoading, error },
    dispatches: {
      setError,
      setLoading,
    },
  };
};

export const getSubjectCharacter = (
  flag: boolean,
  subjectId: number,
  dispatches: Dispatches<Character[]>
) => {
  const { setData, setError, setLoading } = dispatches;
  useEffect(() => {
    if (!flag) return;
    const controller = new AbortController();
    setLoading(true);
    client
      .getSubject<Character[]>(`/${subjectId}/characters`, {
        signal: controller.signal,
      })
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
  }, [subjectId]);
};

export const getSubjectEp = (
  flag: boolean,
  subjectId: number,
  dispatches: Dispatches<Episode[]>
) => {
  const { setData, setError, setLoading } = dispatches;
  useEffect(() => {
    if (!flag) return;
    const controller = new AbortController();
    setLoading(true);
    client
      .getEpisodes(subjectId, {
        signal: controller.signal,
      })
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
  }, [subjectId]);
};
