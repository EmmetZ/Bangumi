import { Dispatches } from './types';
import { CanceledError } from 'axios';
import { useEffect } from 'react';
import { Character } from '../types';
import ApiClient from '../services/api_client';

const client = new ApiClient();

const useCharacter = (
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

export default useCharacter;
