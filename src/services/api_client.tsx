import axios, { AxiosRequestConfig } from 'axios';
import { resolve } from 'path';
import { rejects } from 'assert';
import {
  UserCollectionQuery,
  FetchResponse,
  Collection,
} from '../hooks/types';
import { Episode, User } from '../types';

const MAX_RETRY_TIMES = 3;
const RETRY_DELAY = 1000;

const apiClient = axios.create({
  baseURL: 'https://api.bgm.tv',
  timeout: 5 * 1000,
});

function retryableRequest<T>(
  endpoint: string,
  config: AxiosRequestConfig,
  retry = MAX_RETRY_TIMES
) {
  return new Promise((resolve, reject) => {
    apiClient
      .get<T>(endpoint, config)
      .then((response) => {
        // 请求成功，直接将 Promise 状态变为 fulfilled
        resolve(response);
      })
      .catch((error) => {
        // 请求失败
        if (retry === 0) {
          // 剩余重试次数为 0，表示本次请求失败，将 Promise 状态从 pending 更新为 rejected
          reject(error);
        } else {
          // 还能继续重试，RETRY_DELAY 秒之后，递归调用 retryableRequest 方法，重新发送请求
          setTimeout(() => {
            // 递归逻辑，通过递归来实现重试，每次递归重试次数 -1；根据下层 retryableRequest 方法的 Promise 结果更新当前 Promise 的状态
            retryableRequest(endpoint, config, retry - 1)
              .then((response) => {
                // 请求成功，将 Promise 状态从 pending 更新为 fulfilled
                resolve(response);
              })
              .catch((error) => {
                // 请求失败，表示本次请求失败，将 Promise 状态从 pending 更新为 rejected
                reject(error);
              });
          }, RETRY_DELAY);
        }
      });
  });
}

class ApiClient {
  getCollections(userId: number, query: UserCollectionQuery) {
    return apiClient
      .get<FetchResponse<Collection>>(`/v0/users/${userId}/collections`, {
        params: { ...query },
      })
      .then((res) => res.data);
  }

  getUser(userId: number) {
    return apiClient.get<User>(`/v0/users/${userId}`).then((res) => res.data);
  }

  // 改为可重复请求
  getSubject<T>(endpoint: string, config: AxiosRequestConfig) {
    return apiClient
      .get<T>('/v0/subjects' + endpoint, { ...config })
      .then((res) => res.data);
  }

  getEpisodes(subjectId: number, config: AxiosRequestConfig) {
    return apiClient
      .get<FetchResponse<Episode>>('v0/episodes', {
        params: {
          subject_id: subjectId,
          ...config,
        },
      })
      .then((res) => res.data.data);
  }
}

export default ApiClient;
