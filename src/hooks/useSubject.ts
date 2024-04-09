import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useMemo, useState } from "react";
import ApiClient from "../services/api_client";
import { Character, Subject } from "../types";
import { ImgType } from "./types";


export const useSubject = (subjectId: string) => {
  // console.log('useSubject', subjectId)
  return _useSubject<Subject>(`/${subjectId}`);
};

export const useSubjectImage = (subjectId: number, imgType: ImgType) =>
  _useSubject<string>(`/${subjectId}/image`, { params: { type: imgType }});

export const UseSubjectRelation = (subjectId: number) =>
  _useSubject<Subject[]>(`/${subjectId}/subjects`);

const _useSubject = <T>(endpoint: string, config: AxiosRequestConfig = {}) => {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
