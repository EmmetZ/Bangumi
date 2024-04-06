import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import ApiClient from "../services/api_client";
import { Episode } from "./types";

const useEpisodes = (subjectId: number, config: AxiosRequestConfig = {}) => {
  const [data, setData] = useState<Episode[]>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const client = new ApiClient();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    client
      .getEpisodes(subjectId, { ...config, signal: controller.signal })
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

export default useEpisodes;